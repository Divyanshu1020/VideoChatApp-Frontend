import { Card } from "@/components/ui/card";

import { DataTable } from "./DataTable";

import { Skeleton } from "@/components/aside/FriendList";
import { useGetMyFriendsMutation } from "@/redux/api/api";
import { useEffect, useState } from "react";

export interface Friend {
  _id: string;
  name: string;
  userName: string;
  avatar: string;
  status: boolean;
}
// interface FriendCellProps {
//   friend: Friend;
// }

// const columns: ColumnDef<Friend>[] = [
//   {
//     accessorFn: (row) => `${row.name} ${row.userName}`,
//     id: 'nameOrUserName',
//     cell: ({ row }) => <FriendCell friend={row.original} />,
//   },
// ];

export default function FriendList() {
  const [getMyFriends, { isLoading }] = useGetMyFriendsMutation();
  const [data, setData] = useState<Friend[] | null>(null);

  useEffect(() => {
    async function getFriend() {
      try {
        const res = await getMyFriends("");
        setData(res.data.data);
      } catch (error) {
        console.log(`error`, error);
      }
    }

    getFriend();
  }, [getMyFriends]);
  const test = [
    {
      _id: "66d5facd181a042918f16e5a",
      name: "Elsie Aufderhar",
      userName: "Eliza_Turner20",
      avatar: "https://avatars.githubusercontent.com/u/48565828",
      status: false,
    },
    {
      _id: "66d5facd181a042918f16e5d",
      name: "Dr. Kelley Swift",
      userName: "Stacy29",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/337.jpg",
      status: true,
    },
    {
      _id: "66d5facd181a04dg918f16e5a",
      name: "Elsie Aufderhar",
      userName: "Eliza_Turner20",
      avatar: "https://avatars.githubusercontent.com/u/48565828",
      status: false,
    },
    {
      _id: "66d5fdgcd181a042918f16e5d",
      name: "Dr. Kelley Swift",
      userName: "Stacy29",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/337.jpg",
      status: true,
    },
    {
      _id: "66d5facd18sf1a042918f16e5a",
      name: "Elsie Aufderhar",
      userName: "Eliza_Turner20",
      avatar: "https://avatars.githubusercontent.com/u/48565828",
      status: false,
    },
    {
      _id: "66d5facd181a0vz42918f16e5d",
      name: "Dr. Kelley Swift",
      userName: "Stacy29",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/337.jpg",
      status: true,
    },
    {
      _id: "66d5faFcd181a042918f16e5a",
      name: "Elsie Aufderhar",
      userName: "Eliza_Turner20",
      avatar: "https://avatars.githubusercontent.com/u/48565828",
      status: false,
    },
    {
      _id: "66d5facd181a042fs918f16e5d",
      name: "Dr. Kelley Swift",
      userName: "Stacy29",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/337.jpg",
      status: true,
    },
  ];
  return (
    <Card
      className={`mt-3 relative flex-col items-start gap-8 flex overflow-auto`}
      x-chunk="dashboard-03-chunk-0"
    >
      <div className="container px-2 py-2">
        {isLoading && <Skeleton />}

        {data && <DataTable data={data} />}

        {/* <DataTable columns={columns} data={test} /> */}

        {/* <DataTable columns={columns} data={data || [] } /> */}
      </div>
    </Card>
  );
}
