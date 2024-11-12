import { Card } from "@/components/ui/card";
import { useSocket } from "@/hooks/socket";
import { useWebRTC } from "@/hooks/webRTC";
import Peer from "@/lib/peer";
import { RootState } from "@/redux/store";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import ReactPlayer from "react-player/lazy";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Control from "./components/control";

export default function Container() {
  const { id } = useParams();
  const chatData = useSelector((state: RootState) => state.chats.chats);
  const userdata = useSelector((state: RootState) => state.auth.userData);
  const {
    myStream,
    videoON,
    getMySream,
    setShow,
    messages,
    remoteStream,
    incomingCall,
    setIncomingCall,
  } = useWebRTC();
  const { socket } = useSocket();
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      if (parentRef.current) {
        const parentHeight = (parentRef.current as HTMLElement).clientHeight;
        const parentWidth = (parentRef.current as HTMLElement).clientWidth;
        setBounds({
          left: 10,
          top: 10,
          right: parentWidth - 210, // Width of the video component
          bottom: parentHeight - 210, // Offset by 120px from the bottom, subtracting height of the video component
        });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [parentRef]);

  useEffect(() => {
    const handleCall = async () => {
      const reciverId = chatData.find((data) => data._id === id)?.members;
      console.log("reciverId", reciverId);
    

      if (socket) {
        const offer = await Peer.getOffer();
        socket.emit("CALL", {
          to: reciverId,
          from: {
            name: userdata?.fullName,
            _id: userdata?._id,
            avatar: userdata?.avatar.url,
          },
          offer,
        });
      }
      getMySream();
      setShow(false);
      setIncomingCall(true);
    };
    
    // if (videoON) {
    //   getMySream();
    // }

    if(!incomingCall){
      handleCall();
    }

    
  }, []);

  

  return (
    <Card
      ref={parentRef}
      className="   relative  sm:flex  min-h-[50vh] flex-col rounded-xl bg-muted/50  "
    >
      <div className=" rounded-xl flex h-full w-full items-center justify-center ">
        {remoteStream ? (
          <ReactPlayer
            playing={true}
            muted
            width="100%"
            height={"100%"}
            url={remoteStream}
          />
        ) : (
          <h1>{messages}</h1>
        )}
      </div>
      {videoON && (
        <Draggable bounds={bounds} defaultPosition={{ x: 10, y: 10 }}>
          <Card className="  rounded-xl shadow-xl absolute aspect-video   w-[200px] ">
            <ReactPlayer
              playing={true}
              muted
              width="100%"
              height={"100%"}
              url={myStream as MediaStream}
            />
          </Card>
        </Draggable>
      )}

      <Control />
    </Card>
  );
}
