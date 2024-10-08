import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { setForMobile } from "@/redux/reducers/auth";
import { RootState } from "@/redux/store";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ArrowLeftIcon, Info, PhoneCall, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Top({bio}: {bio: string}) {
  const { id } = useParams();
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const chats = useSelector((state: RootState) => state.chats.chats);
  const dispatch = useDispatch();;

  useEffect(() => {
    const chat = chats.find((chat) => chat._id === id);
    if (chat) {
      if(!chat.isGroupChat){
        setAvatar(chat.avatar[0]);
      }else{
        setAvatar(chat.groupDP.url);
      }
      setName(chat.chatName);
    }
  }, [chats, id, setAvatar]);

  return (
    <div className="   flex flex-row items-center justify-between rounded-t-md py-4 px-2 border bg-background w-full  top-0 left-0">
      <div className="flex flex-row items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className=" sm:hidden"
          onClick={() => {
            dispatch(setForMobile(false));
            window.history.back();
          }}
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Button>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Avatar className=" border hover:border-popover-foreground rounded-full flex flex-col items-center justify-center h-full">
            <AvatarImage className="rounded-full h-full w-full" src={avatar} />
            <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </Button>
        <div className=" flex flex-col ">
          <span className="font-bold 2xl">{name}</span>
          <p className="text-sm text-slate-500 ">
            {bio}
          </p>
        </div>
      </div>
      <div className=" flex flex-row gap-5">
        <PhoneCall />
        <Video />
        <Info />
      </div>
    </div>
  );
}

export function TopSkl() {
  return (
    <div className="   flex flex-row items-center justify-between rounded-t-md py-4 px-2 border bg-background w-full  top-0 left-0">
      <div className="flex flex-row items-center gap-4">
        <Skeleton className=" w-10 h-10 rounded-full" />
        <div className=" flex flex-col ">
          <span className="font-bold 2xl">
            <Skeleton className="h-4 w-[150px]" />
          </span>
          <p className="text-sm text-slate-500 ">
            <Skeleton className="h-4 w-[150px]" />
          </p>
        </div>
      </div>
      <div className=" flex flex-row gap-5">
        <PhoneCall className=" text-slate-800" />
        <Video className=" text-slate-800" />
        <Info className=" text-slate-800" />
      </div>
    </div>
  );
}
