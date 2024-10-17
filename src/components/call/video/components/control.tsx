import { CallEndBtn, MicBtn, VideoBtn } from "./btn";

export default function Control() {
  return (
    <div className=" cursor-pointer absolute bottom-0 rounded-xl    rounded-t-none  flex h-[100px] w-full items-center justify-center gap-4 backdrop-blur-sm bg-muted/50 transition-all duration-300 hover:backdrop-blur-lg  ">
    
        <MicBtn />
        <VideoBtn />
        <CallEndBtn />
    
    </div>
  )
}
