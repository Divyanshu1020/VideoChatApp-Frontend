import { useWebRTC } from "@/hooks/webRTC"
import { Mic, PhoneIcon, VideoIcon } from "lucide-react"


export function MicBtn() {
  return (
    <div  className="hover:transform hover:scale-110 rounded-full flex h-16 w-16 items-center justify-center bg-muted ">
        <Mic className="text-green-600"/>
    </div>
  )
}

export function VideoBtn() {
  const { videoON, stopStream, getMySream } = useWebRTC();

  const handleClick = () => {
    if (videoON) {
      stopStream();
    } else {
      getMySream();
    }
  };

  return (
    <div onClick={handleClick} className="hover:transform hover:scale-110 rounded-full flex h-16 w-16 items-center justify-center bg-muted ">
      <VideoIcon className={`${videoON ? 'text-green-600' : 'text-red-600'}`} />
    </div>
  );
}

export function CallEndBtn() {
    return (
      <div className="hover:transform hover:scale-110 rounded-full flex h-16 w-16 items-center justify-center bg-muted ">
          <PhoneIcon className="text-red-600"/>
      </div>
    )
}


