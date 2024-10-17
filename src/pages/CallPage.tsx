import ChatContainer from "@/components/call/chat/Container";
import VideoContainer from "@/components/call/video/container";

export default function CallPage() {
  return (
    <div className="grid h-full w-full ">
      <div className="flex flex-col">
        <main className="grid flex-1 gap-4 overflow-auto p-4  sm:grid-cols-[2fr_5fr] ">
          <ChatContainer/>
          <VideoContainer/>
        </main>
      </div>
    </div>
  );
}
