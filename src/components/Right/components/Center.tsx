import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useSocket } from "@/hooks/socket";
import { useLazyGetOldMessagesQuery } from "@/redux/api/api";
import { RootState } from "@/redux/store";
import {
  ChatDetails,
  ChatDetailsMembers,
  Message,
  NewMessage,
} from "@/types/Request";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FriendMessageCard, UserMessageCard } from "./MessageCard";
import { plusNoOfNewMessage } from "@/redux/reducers/chats";
import { toast } from "@/hooks/use-toast";

export default function Center({ chatDetails }: { chatDetails: ChatDetails }) {
  const { socket } = useSocket();
  const dispatch = useDispatch();
  
  const userId = useSelector((state: RootState) => state.auth.userData?._id);
  const [messages, setMessages] = useState<Message[]>([]);
  const [avatars] = useState<ChatDetailsMembers[]>(chatDetails?.members);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [getOldMessage] = useLazyGetOldMessagesQuery();

  useEffect(() => {
    async function getOldData() {
      setIsLoadingMore(true);
      const response = await getOldMessage({ chatId: chatDetails._id, page });
      setTotalPage(response?.data?.totalPages || 1);
      if (response?.data?.data) {
        setMessages((prevMessages) => [...response.data.data, ...prevMessages]);
      }
      setIsLoadingMore(false);
      if (page === 1) {
        setTimeout(
          () => bottomRef.current?.scrollIntoView({ behavior: "auto" }),
          0
        );
      }
    }

    getOldData();
  }, [chatDetails._id, getOldMessage, page]);

  useEffect(() => {
    socket?.on("NEW_MESSAGE", (data: NewMessage) => {
      if(data.chatId !== chatDetails._id) {
        dispatch(plusNoOfNewMessage(data.chatId))
        toast({
          title: data.message.sender.fullName,
          description: data.message.content,
          variant: "default",
        })
        return
      }
      setMessages((prev) => [...prev, data.message]);
      setTimeout(() => bottomRef.current?.scrollIntoView(), 0);
    });

    return () => {
      socket?.off("NEW_MESSAGE");
    };
  }, [socket]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastChatElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoadingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < totalPage) {
          setPage((prevPage) => prevPage + 1);
          console.log("visible");
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoadingMore, page, totalPage]
  );

  const renderMessage = (item: Message, index: number) => {
    const isUserMessage = item?.sender?._id === userId;
    const avatar = avatars?.find(
      (mem) => mem?._id === (isUserMessage ? userId : item?.sender?._id)
    );

    const MessageCard = isUserMessage ? UserMessageCard : FriendMessageCard;
    const props = {
      key: item._id,
      data: item,
      avatar: avatar?.avatar.url,
    };

    if (index === 0) {
      return <MessageCard ref={lastChatElementRef} {...props} />;
    }
    return <MessageCard {...props} />;
  };

  return (
    <div className="border-l border-r flex-1 bg-transparent">
      <ScrollArea
        // onScroll={handleScroll}

        className="h-[calc(100vh-18rem)] px-6"
        // onScrollCapture={handleScroll}
        ref={scrollAreaRef}
      >
        {isLoadingMore && <div>Loading more messages...</div>}
        <div className="flex flex-col mt-4 gap-4">
          {messages.map(renderMessage)}
        </div>
        <div ref={bottomRef} />
      </ScrollArea>
    </div>
  );
}

export function CenterSkl() {
  return (
    <div className=" border-l border-r  flex-1 bg-transparent">
      <ScrollArea className="h-[calc(100vh-18rem)]  px-6 ">
        <div className=" flex flex-col mt-5 gap-4">
          <p className="">
            <Skeleton className="h-16 w-[600px]" />
          </p>
          <p className=" self-end">
            <Skeleton className="h-16 w-[600px]" />
          </p>
          <p className=" self-end">
            <Skeleton className="h-16 w-[600px]" />
          </p>
          <p className="">
            <Skeleton className="h-16 w-[600px]" />
          </p>
          <p className="">
            <Skeleton className="h-16 w-[600px]" />
          </p>
          <p className="">
            <Skeleton className="h-16 w-[600px]" />
          </p>
        </div>
      </ScrollArea>
    </div>
  );
}
