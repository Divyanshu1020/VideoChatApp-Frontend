import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fileFormat } from "@/lib/helper";
import { Message } from "@/types/Request";
import { EllipsisVerticalIcon } from "lucide-react";
import moment from "moment";
import { forwardRef } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

function renderMediaContent(data: Message) {
  return (
    <div>
      <p className="text-base mb-4">{data?.content}</p>
      {data.media.map((media, index) => {
        const fileType = fileFormat(media.url);

        switch (fileType) {
          case "image":
            return (
              <Link to={media.url} key={index} target="_blank">
                <img
                  key={index}
                  src={media.url}
                  alt={media.publicId}
                  className="w-full h-auto object-cover"
                />
              </Link>
            );
          case "video":
            return (
              <Link to={media.url} key={index} target="_blank">
                <video
                  key={index}
                  src={media.url}
                  controls
                  className="w-full h-auto object-cover"
                />
              </Link>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export const FriendMessageCard = forwardRef<
  HTMLDivElement,
  { data: Message; avatar: string | undefined }
>(({ data, avatar }, ref) => (
  <motion.div
    initial={{ x: "-90%", opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{
      type: "spring",
      stiffness: 100,
      damping: 14,
      mass: 1,
    }}
    ref={ref}
  >
    <Card className="flex flex-col w-full max-w-[55%]">
      <CardHeader className="p-4">
        <CardTitle className="flex flex-row justify-between items-center">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={avatar} alt={`Avatar`} />
              <AvatarFallback className="text-sm">
                <p>{data?.sender?.fullName?.charAt(0)}</p>
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {data?.sender?.fullName}
              </span>
              <span className="text-xs text-muted-foreground">
                {moment(data?.createdAt).fromNow()}
              </span>
            </div>
          </div>
          <EllipsisVerticalIcon className="cursor-pointer" />
        </CardTitle>
      </CardHeader>
      <div className="border-t border-slate-300"></div>
      <CardContent className="px-4 py-3">
        {data.media.length > 0 ? (
          renderMediaContent(data)
        ) : (
          <p className="text-base">{data?.content}</p>
        )}
      </CardContent>
    </Card>
  </motion.div>
));

export const UserMessageCard = forwardRef<
  HTMLDivElement,
  { data: Message; avatar: string | undefined }
>(({ data, avatar }, ref) => (
  <motion.div
    initial={{ x: "40%", opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{
      type: "spring",
      stiffness: 100,
      damping: 14,
      mass: 1,
    }}
    ref={ref}
    className="self-end  flex flex-col w-full max-w-[55%]"
  >
    <Card className="bg-primary">
      <CardHeader className="p-4">
        <CardTitle className="flex flex-row justify-between items-center">
          <EllipsisVerticalIcon className="cursor-pointer" />
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {data?.sender?.fullName}
              </span>
              <span className="text-xs text-muted-foreground">
                {moment(data?.createdAt).fromNow()}
              </span>
            </div>
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={avatar} alt={`Avatar`} />
              <AvatarFallback>
                {data?.sender?.fullName?.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardTitle>
      </CardHeader>
      <div className="border-t border-slate-300"></div>
      <CardContent className="px-4 py-3 text-end">
        {data.media.length > 0 ? (
          renderMediaContent(data)
        ) : (
          <p className="text-base">{data?.content}</p>
        )}
      </CardContent>
    </Card>
  </motion.div>
));
