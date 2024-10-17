import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSocket } from "./socket";
import peer from "@/lib/peer";
import { useNavigate } from "react-router-dom";
interface WebRTCcontextType {
    myStream: MediaStream | null
    setMyStream: React.Dispatch<React.SetStateAction<MediaStream | null>>
    remoteStream: MediaStream | null
    setRemoteStream: React.Dispatch<React.SetStateAction<MediaStream | null>>
    videoON: boolean
    audioON: boolean
    setVideoON: React.Dispatch<React.SetStateAction<boolean>>
    setAudioON: React.Dispatch<React.SetStateAction<boolean>>
    setIncomingCall: React.Dispatch<React.SetStateAction<boolean>>
    incomingCall: boolean
    stopStream: () => void
    getMySream: () => void
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    setIncomingCallUser: React.Dispatch<React.SetStateAction<IncomingCallUser | null>>
    incomingCallUser: IncomingCallUser | null 
    setMessages: React.Dispatch<React.SetStateAction<string>>
    messages: string
    callDecline: () => void
    callAccept: () => void
    offer: RTCSessionDescriptionInit | undefined
    setOffer: React.Dispatch<React.SetStateAction<RTCSessionDescriptionInit | undefined>>
}
interface IncomingCallUser {
  _id: string;
  name: string;
  avatar: string;
}

const WebRTCcontext = createContext<WebRTCcontextType | null>(null);
const useWebRTC = () => {
  const context = useContext(WebRTCcontext);

  if (context === null) {
    throw new Error("useWebRTC must be used within a WebRTCProvider");
  }

  return context;
};

const WebRTCprovider = ({ children }: { children: React.ReactNode }) => {
  const {socket} = useSocket();
  const navigate = useNavigate();
  const [offer, setOffer] = useState< RTCSessionDescriptionInit | undefined>(undefined);
  const [messages, setMessages] = useState("Calling...");
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  console.log("setmyStream", myStream);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [videoON, setVideoON] = useState(true);
  const [audioON, setAudioON] = useState(true);
  const [incomingCall, setIncomingCall] = useState(false);
  const [show, setShow] = useState(false);
  const [incomingCallUser, setIncomingCallUser] = useState<IncomingCallUser | null>(null);

  const stopStream = useCallback(() => {
    console.log("StopStream");
    if (myStream instanceof MediaStream) {
      myStream.getTracks().forEach(track => {
        track.stop();
      });
      setMyStream(null);
      setVideoON(false);
      // setAudioON(false);
    }
  }, [myStream]);

  const callDecline = useCallback(() => {
    setIncomingCall(false);
    console.log("callDecline", incomingCallUser?._id);
    socket?.emit("DECLINE", incomingCallUser?._id);
  },[incomingCallUser?._id, socket])

  const callAccept = useCallback(async() => {
    setShow(false);
    navigate(`/call/${incomingCallUser?.name}/${incomingCallUser?._id}`);
    console.log("callAccept", incomingCallUser?._id);
    const ans = await peer.getAnsweer(offer);
    socket?.emit("ACCEPT", {to: incomingCallUser?._id, ans});


  },[incomingCallUser?._id, offer, socket])





  useEffect(() => {
    if(socket) {
      socket.on('INCOMING', async(data) => {
        console.log("INCOMING", data);
        setIncomingCallUser(data.from)
        setOffer(data.offer)
        setIncomingCall(true);
        setShow(true);
      })

      socket.on('DECLINE', () => {
        console.log("DECLINE");
        setMessages('Call Declined')
        setShow(true);
        setIncomingCall(false);
      })

      socket.on('ACCEPT', async({ans}) => {
        console.log("SOCKETACCEPT", {ans});
        setMessages('Call Accepted')
        peer.setLocalDescription(ans)
        setShow(false);
        setIncomingCall(false);

        console.log("myStream", myStream);

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        })

        console.log("stream", stream);

        for(const track of stream.getTracks()) {
          peer.peer?.addTrack(track, stream)
        }


      })


      socket.on('NEGO_NEEDED', async(data) => {
        console.log("NEGO", data);
        const ans = await peer.getAnsweer(data.offer);
        socket?.emit("NEGO_DONE", {to: data.from, ans});
      })

      socket.on("NEGO_FINAL", async ({ans}) => {
        await peer.setLocalDescription(ans)
      })


    }

    return () => {
      socket?.off('INCOMING');
      socket?.off('DECLINE');
      socket?.off('ACCEPT');
      socket?.off('NEGO_NEEDED');
      socket?.off('NEGO_FINAL');

    }
  },[socket])

  useEffect(()=>{
    peer.peer?.addEventListener('track', (event) => {
      const remoteStream = event.streams[0];
      console.log("remoteStream", remoteStream);
      setRemoteStream(remoteStream);
    })

    return () => {
      peer.peer?.removeEventListener('track', (event) => {
        const remoteStream = event.streams[0];
        setRemoteStream(remoteStream);
      })
    }
  },[])

  useEffect(() => {
    peer.peer?.addEventListener("negotiationneeded", async () => {
      console.log("negotiationneeded");
      const offer = await peer.getOffer();
      console.log("negotiationneeded offer", offer);
      socket?.emit("NEGO_NEEDED", ({offer, to: incomingCallUser?._id}))
    })

    return () => {
      peer.peer?.removeEventListener("negotiationneeded", async () => {
        const offer = await peer.getOffer();
        socket?.emit("NEGO_NEEDED", ({offer, to: incomingCallUser?._id}))
      })
    }
  },[socket])

  const getMySream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      })
      setMyStream(stream)
      setVideoON(true);

      
        // for(const track of stream.getTracks()) {
        //   peer.peer?.addTrack(track, stream)
        // }
      
    } catch (err) {
      console.error("Error accessing media devices.", err);
    }
  }

  const value = {
    myStream,
    setMyStream,
    videoON,
    setVideoON,
    audioON,
    setAudioON,
    stopStream,
    getMySream,
    incomingCall,
    setIncomingCall,
    show,
    setShow,
    incomingCallUser, 
    setIncomingCallUser,
    callDecline,
    messages, 
    setMessages,
    callAccept,
    offer,
    setOffer,
    remoteStream,
    setRemoteStream
  };

  return (
    <WebRTCcontext.Provider value={value}>{children}</WebRTCcontext.Provider>
  );
};

export { useWebRTC, WebRTCprovider };
