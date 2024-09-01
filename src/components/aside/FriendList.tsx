import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ColumnDef } from "@tanstack/react-table";
import { Card } from "../ui/card";
import { DataTable } from "./data-table";

export type Payment = {
  id: string;
  name: string;
  avatar: string[];
  groupChat: boolean;
  isOnline: boolean;
  newMessage: string;
  index: number;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className="flex w-full items-center gap-4">
          {/* <div className=" h-9 w-9 relative">
            {payment.avatar.map((item, index) => {
              return (
                <Avatar key={index} className={` absolute left-[${index + 0.5}rem]`}>
                  <AvatarImage src= {item}/>
                  <AvatarFallback>
                  {payment.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              );
            })}

            
          </div> */}
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage
              src={payment.avatar[0]}
              alt={`${payment.name}'s Avatar`}
            />
            <AvatarFallback>{payment.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">{payment.name}</p>
            <p className="text-sm text-muted-foreground">
              {payment.newMessage}
            </p>
          </div>
          <div className="ml-auto font-medium">
            {payment.isOnline ? "Online" : "Offline"}
          </div>
        </div>
      );
    },
  },
];

export default function FriendList() {
  const data: Payment[] = [
    {
      id: "728ed52f",
      name: "Naruto",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: true,
      isOnline: true,
      newMessage: "Hello",
      index: 1,
    },
    {
      id: "728ed52g",
      name: "Sasuke",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: false,
      newMessage: "Hello",
      index: 2,
    },
    {
      id: "728ed52f",
      name: "Naruto",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: true,
      newMessage: "Hello",
      index: 1,
    },
    {
      id: "728ed52g",
      name: "Sasuke",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: false,
      newMessage: "Hello",
      index: 2,
    },
    {
      id: "728ed52f",
      name: "Naruto",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: true,
      newMessage: "Hello",
      index: 1,
    },
    {
      id: "728ed52g",
      name: "Sasuke",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: false,
      newMessage: "Hello",
      index: 2,
    },
    {
      id: "728ed52f",
      name: "Naruto",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: true,
      newMessage: "Hello",
      index: 1,
    },
    {
      id: "728ed52g",
      name: "Sasuke",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: false,
      newMessage: "Hello",
      index: 2,
    },
    {
      id: "728ed52f",
      name: "Naruto",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: true,
      newMessage: "Hello",
      index: 1,
    },
    {
      id: "728ed52g",
      name: "Sasuke",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: false,
      newMessage: "Hello",
      index: 2,
    },
    {
      id: "728ed52f",
      name: "Naruto",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: true,
      newMessage: "Hello",
      index: 1,
    },
    {
      id: "728ed52g",
      name: "Sasuke",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: false,
      newMessage: "Hello",
      index: 2,
    },
    {
      id: "728ed52f",
      name: "Naruto",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: true,
      newMessage: "Hello",
      index: 1,
    },
    {
      id: "728ed52g",
      name: "Sasuke",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: false,
      newMessage: "Hello",
      index: 2,
    },
    {
      id: "728ed52g",
      name: "Sasuke",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: false,
      newMessage: "Hello",
      index: 2,
    },
    {
      id: "728ed52f",
      name: "Naruto",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: true,
      newMessage: "Hello",
      index: 1,
    },
    {
      id: "728ed52g",
      name: "Sasuke",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: false,
      newMessage: "Hello",
      index: 2,
    },
    {
      id: "728ed52f",
      name: "Naruto",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: true,
      newMessage: "Hello",
      index: 1,
    },
    {
      id: "728ed52g",
      name: "Sasuke",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: false,
      newMessage: "Hello",
      index: 2,
    },
    {
      id: "728ed52f",
      name: "Naruto",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: true,
      newMessage: "Hello",
      index: 1,
    },
    {
      id: "728ed52g",
      name: "Sasuke",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: false,
      newMessage: "Hello",
      index: 2,
    },
    {
      id: "728ed52f",
      name: "Naruto",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: true,
      newMessage: "Hello",
      index: 1,
    },
    {
      id: "728ed52g",
      name: "Sasuke",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: false,
      newMessage: "Hello",
      index: 2,
    },
    {
      id: "728ed52f",
      name: "Naruto",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: true,
      newMessage: "Hello",
      index: 1,
    },
    {
      id: "728ed52g",
      name: "Sasuke",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: false,
      newMessage: "Hello",
      index: 2,
    },
    {
      id: "728ed52f",
      name: "Naruto",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: true,
      newMessage: "Hello",
      index: 1,
    },
    {
      id: "728ed52g",
      name: "Sasuke",
      avatar: [
        "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain",
      ],
      groupChat: false,
      isOnline: false,
      newMessage: "Hello",
      index: 2,
    },
  ];
  return (
    <Card
      className=" relative hidden flex-col items-start gap-8 md:flex overflow-auto"
      x-chunk="dashboard-03-chunk-0"
    >
      <div className="container px-2 py-2">
        <DataTable columns={columns} data={data} />
      </div>
    </Card>
  );
}

