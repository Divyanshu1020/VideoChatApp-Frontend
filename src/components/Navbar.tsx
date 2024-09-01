import {
  Avatar as AV,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MessageCircle,
  SendHorizontal,
  Settings,
  UserPlus,
} from "lucide-react";
import { ModeToggle } from "./theme/mode-toggle";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="border-b z-20 left-0 fixed w-full bg-background">
      <header className="sticky mx-auto  top-0 max-w-[1400px] flex h-16 items-center gap-4   px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to={"/"}
            className="flex flex-row items-center gap-2 text-lg font-semibold md:text-base"
          >
            <MessageCircle />
            <span className=" text-nowrap">Video Chat App</span>
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to={""}
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                to={""}
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                to={""}
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                to={""}
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                to={""}
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link to={""} className="hover:text-foreground">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto items-center flex-initial flex flex-row gap-2  h-full">
            <AddFriendButton />
            <ModeToggle />
            <Avatar />
          </div>
        </div>
      </header>
    </div>
  );
}

// export default function Navbar() {
//   return (
//     <nav className=" z-20 left-0 fixed py-1 w-full bg-primary">
//       <div className="  px-4 h-full mx-auto max-w-[1400px] flex flex-row items-center j">
//         logo
//         <div className="ml-auto h-full flex flex-row items-center">
//           <div className="flex flex-row gap-2 items-center h-full">
//             <AddFriendButton />
//             <ModeToggle />
//             <Avatar />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

function Avatar() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <AV className=" border hover:border-popover-foreground">
            <AvatarImage src="https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain" />
            <AvatarFallback>CN</AvatarFallback>
          </AV>

          {/* <CircleUser className="h-5 w-5" /> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link className="flex flex-row items-center" to={"/settings"}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Create Group</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AddFriendButton() {
  return (
    <Dialog>
      <DialogTrigger className=" p-2 rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground">
        <UserPlus className="h-5 w-5" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col space-y-2">
              <Label className=" text-2xl" htmlFor="name">
                Search your friend by Id
              </Label>
              <Input id="name" type="text" placeholder="Enter your friend Id" />
            </div>
          </DialogTitle>
          <DialogDescription>
            <ScrollArea className="h-60 w-full  rounded-md border px-4">
              <FriendProfile />
            </ScrollArea>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function FriendProfile() {
  return (
    <div className=" cursor-pointer border-b p-2">
      <div className="flex w-full items-center gap-4">
        <AV className="hidden h-12 w-12 sm:flex">
          <AvatarImage
            src={
              "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain"
            }
            alt={`'s Avatar`}
          />
          <AvatarFallback>{"CN"}</AvatarFallback>
        </AV>
        <div className="grid gap-1">
          <p className="text-lg font-medium leading-none">Name</p>
          <p className="text-sm text-muted-foreground">@name</p>
        </div>
        <div className="ml-auto font-medium">
          <Button variant="outline" className=" flex flow-row gap-2">
            <span className="text-base">Send Request</span>
            <SendHorizontal className=" text-base" />
          </Button>
        </div>
      </div>
    </div>
  );
}
