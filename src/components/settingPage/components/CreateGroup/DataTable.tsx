"use client";

import { Input } from "@/components/ui/input";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { addFriend, removeFriend } from "@/redux/reducers/Friends";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Friend } from "./FriendList";

export function DataTable({ data }: { data: Friend[] }) {
  const [chats, setChats] = useState(data);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput.trim().length > 0) {
        const newData = data.filter((chat) => {
          return chat.name.toLowerCase().includes(searchInput.toLowerCase());
        });
        setChats(newData);
      } else {
        setChats(data);
      }
    }, 200);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  return (
    <div className=" ">
      <div className="flex items-center pb-4">
        <Input
          type="search"
          placeholder="Search by name or username..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          className="text-xl h-13"
        />
      </div>
      <ScrollArea className="h-[300px]  w-full rounded-md ">
        <Table>
          <TableBody className=" grid   gap-3 py-1 [&_tr:last-child]:border-1">
            {chats.map((friend) => (
              <FriendCell key={friend._id} friend={friend} />
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}

function FriendCell({ friend }: { friend: Friend }) {
  const dispatch = useDispatch();
  const addedFriendIds = useSelector(
    (state: RootState) => state.friends.addedFriendIds
  );
  const isAdded = addedFriendIds.includes(friend._id);

  const handleAddRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (isAdded) {
      dispatch(removeFriend(friend._id));
    } else {
      dispatch(addFriend(friend._id));
    }
  };

  return (
    <TableRow key={friend._id} className=" rounded-md block ">
      <TableCell className=" flex p-0 flex-row">
        <div className="flex w-full items-center gap-4 cursor-default p-4">
          <div className="flex items-center h-full rounded-full">
            <Avatar className="h-9 w-9 border-2 rounded-full border-white">
              <AvatarImage
                src={friend.avatar}
                className="rounded-full"
                alt={`Avatar`}
              />
              <AvatarFallback>{friend.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="grid gap-1 text-nowrap">
            <p className="text-sm font-medium leading-none">{friend.name}</p>
            <p className="text-sm text-muted-foreground">@{friend.userName}</p>
          </div>
          <Button
            variant={isAdded ? "destructive" : "outline"}
            className="ml-auto max-w-32 px-4 w-full"
            size="icon"
            onClick={handleAddRemove}
            type="button"
          >
            {isAdded ? "Remove" : "Add"}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
