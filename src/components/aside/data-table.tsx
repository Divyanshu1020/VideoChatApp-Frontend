"use client";

import { Input } from "@/components/ui/input";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Chat } from "./FriendList";

import { motion } from "framer-motion";

export function DataTable({ data }: { data: Chat[] }) {
  const [chats, setChats] = useState(data);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput.trim().length > 0) {
        const newData = data.filter((chat) => {
          return chat.chatName
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        });
        setChats(newData);
      } else {
        setChats(data);
      }
    }, 200);
    return () => clearTimeout(timeout);
  }, [searchInput, data]);

  return (
    <div className="">
      <div className="flex items-center pb-4">
        <Input
          type="search"
          placeholder="Search by name or username..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          className="text-xl h-13"
        />
      </div>
      <ScrollArea className="h-[calc(100vh-11rem)]  w-full rounded-md ">
        <Table>
          <TableBody className=" grid   gap-3 py-1 [&_tr:last-child]:border-1">
            {chats.map((Chat) => (
              <motion.div
              initial={{ opacity: 0 , }}
              whileInView={{  opacity: 1,  }}
              
              >
              <TableRow  className=" rounded-md block ">
                  <TableCell className=" flex p-0 flex-row">
                    <Link
                      to={`/chat/${Chat.chatName}/${Chat._id}`}
                      className="flex w-full items-center gap-4 cursor-pointer p-4"
                    >
                      <div className="flex items-center h-full">
                        {Chat.avatar.map((avatar, index) => (
                          <div
                            key={index}
                            className="relative"
                            style={{
                              marginLeft: index > 0 ? "-0.75rem" : "0",
                              zIndex: Chat.avatar.length - index,
                            }}
                          >
                            <Avatar className="h-9 w-9 border-2 border-white">
                              <AvatarImage
                                src={avatar}
                                alt={`Avatar ${index + 1}`}
                              />
                              <AvatarFallback>
                                {Chat.chatName[index]?.charAt(0) || "?"}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        ))}
                      </div>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          {Chat.chatName}
                        </p>
                        {Chat.noOfMessages > 0 && (
                          <p className="text-sm text-muted-foreground">
                            {Chat.noOfMessages} New Messages
                          </p>
                        )}
                      </div>
                    </Link>
                  </TableCell>
              </TableRow>
              </motion.div>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
