import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Info, PhoneCall, Video } from "lucide-react";

export default function Top() {
  return (
    <div className="   flex flex-row items-center justify-between rounded-t-md py-4 px-2 border bg-background w-full  top-0 left-0">
      <div className="flex flex-row items-center gap-4">
        <Button variant="secondary" size="icon" className="rounded-full">
          <Avatar className=" border hover:border-popover-foreground rounded-full flex flex-col items-center justify-center">
            <AvatarImage
              className="rounded-full"
              src="https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
        <div className=" flex flex-col ">
          <span className="font-bold 2xl">Jane Doe</span>
          <p className="text-sm text-slate-500 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        </div>
      </div>
      <div className=" flex flex-row gap-5">
        <PhoneCall/>
        <Video/>
        <Info/>
      </div>
    </div>
  );
}
