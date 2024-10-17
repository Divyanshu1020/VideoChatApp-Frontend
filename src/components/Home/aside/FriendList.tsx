import { Skeleton as Skl } from "@/components/ui/skeleton";
import { useLazyGetChatsQuery } from "@/redux/api/api";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { setChats } from "@/redux/reducers/chats";
import { RootState } from "@/redux/store";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "./data-table";
import { MyEvent, useSocket } from "@/hooks/socket";



export type Chat = {
  _id: string;
  chatName: string;
  noOfMessages: number;
  avatar: string[];
  isGroupChat: boolean ;
  members: string[];
  groupDP: {
    url: string;
    publicId: string;
  }
};


export default function FriendList() {
  const { socket } = useSocket();
  const [getChats, { isLoading }] = useLazyGetChatsQuery();
  const [data, setData] = useState<Chat[] | null>(null);
  const dispatch = useDispatch();
  const formobile = useSelector((state: RootState) => state.auth.forMobile);

  const chatDataFromRedux = useSelector(
    (state: RootState) => state.chats.chats
  );

  const getChat = useCallback(async () => {
    if (chatDataFromRedux.length === 0) {
      try {
        const res = await getChats("");
        setData(res.data.data);
        dispatch(setChats({ chats: res.data.data || [] }));
      } catch (error) {
        console.log(`error`, error);
      }
    } else {
      setData(chatDataFromRedux);
    }
  }, [chatDataFromRedux, dispatch, getChats]);


  useEffect(() => {
    // async function getChat() {
    //   if (chatDataFromRedux.length === 0) {
    //     try {
    //       const res = await getChats("");
    //       setData(res.data.data);
    //       dispatch(setChats({ chats: res.data.data || [] }));
    //     } catch (error) {
    //       console.log(`error`, error);
    //     }
    //   } else {
    //     setData(chatDataFromRedux);
    //   }
    // }

    getChat();
  }, [getChat]);

  
  useEffect(() => {
    if (socket) {
      socket.on<MyEvent>("REFETCH", () => {
        getChat();
      })
    }
   }, [socket]);


  const test = [
    {
      _id: "66d601eebe8a15653acb5239",
      chatName: "RAM",
      isGroupChat: true,
      members: ["66d5facd181a042918f16e5b", "66d5facd181a042918f16e60"],
      avatar: [
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/733.jpg",
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/602.jpg",
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/860.jpg",
      ],
    },
    {
      _id: "66ddeca0ebc860cac4c484f1",
      chatName: "PhD",
      isGroupChat: true,
      members: [
        "66d5facd181a042918f16e5b",
        "66d5facd181a042918f16e61",
        "66d5facd181a042918f16e61",
      ],
      avatar: [
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/733.jpg",
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/602.jpg",
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/375.jpg",
      ],
    },
    {
      _id: "66ec7e7aeefce62419a64d3d",
      chatName: "Elsie Aufderhar",
      isGroupChat: false,
      members: ["66d5facd181a042918f16e5a"],
      avatar: ["https://avatars.githubusercontent.com/u/48565828"],
    },
  ];
  return (
    <Card
      className={`${
        !formobile ? "" : "hidden"
      } relative flex-col items-start gap-8 sm:flex overflow-auto`}
      x-chunk="dashboard-03-chunk-0"
    >
      <div className="container px-2 py-2">
        {isLoading && <Skeleton />}

        {data && <DataTable  data={data} />}

        {/* <DataTable columns={columns} data={test } /> */}

        {/* <DataTable columns={columns} data={data || [] } /> */}
      </div>
    </Card>
  );
}

export function Skeleton() {
  return (
    <Table>
      <TableBody className=" grid   gap-3 py-1 [&_tr:last-child]:border-1">
        {Array.from({ length: 7 }).map((_, index) => (
          <TableRow key={index} className=" rounded-md block ">
            <TableCell className=" flex flex-row">
              <div key={index} className="flex w-full items-center gap-4">
                <div className="flex items-center">
                  <Skl className=" h-9 w-9 rounded-full" />
                </div>
                <div className="grid gap-1">
                  <p className="text-sm  font-medium leading-none">
                    <Skl className="h-4 w-[150px]" />
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <Skl className="h-4 w-[50px]" />
                  </p>
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
