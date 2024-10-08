import FriendList from "@/components/aside/FriendList";
import AppLayout from "@/components/layout/AppLayout";
import { useSocket } from "@/hooks/socket";
import { toast } from "@/hooks/use-toast";
import { plusNoOfNewMessage } from "@/redux/reducers/chats";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"

export default function HomePage({
  children}: {children: React.ReactNode}) {
  return (
    <AppLayout>
      <Page children={children} />
    </AppLayout>
  );
}

function Page({children}: {children: React.ReactNode}) {
  const { socket } = useSocket();
  const dispatch = useDispatch();
  // const userId = useSelector((state: RootState) => state.auth.userData?._id);
  const isChatISOpen = useSelector((state: RootState) => state.chats.isChatISOpen);
  useEffect(() => {
    if (socket && isChatISOpen) {
    
      socket.on("NEW_MESSAGE", (data) => {
        dispatch(plusNoOfNewMessage(data.chatId))
        toast({
          title: data.message.sender.fullName,
          description: data.message.content,
          variant: "default",
        })
    })}

    return () => {
      if (socket) {
        socket.off("NEW_MESSAGE");
      }
    }
  }, [dispatch, socket]);
  
  return (
    <div className="grid h-full w-full ">
      <div className="flex flex-col">
        <main className="grid flex-1 gap-4 overflow-auto p-4  sm:grid-cols-[2fr_5fr] ">
          
          <FriendList />
          {children}
          {/* <Right/> */}

        </main>
      </div>
    </div>
  );
}
