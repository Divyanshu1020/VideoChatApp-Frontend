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
  BellDot,
  MessageCircle,
  SendHorizontal,
  Settings,
  Trash2Icon,
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
import { RootState } from "@/redux/store";
import { Menu, Package2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "@/api/api";
import { toast } from "@/hooks/use-toast";
// import useAsyncMutation from "@/hooks/useAsyncMutation";
import {
  useAcceptAndRejectFriendRequestMutation,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "@/redux/api/api";
import { logout as logoutAction, Notication, removeNotification } from "@/redux/reducers/auth";
import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";

export default function Navbar() {
  const { userStatus } = useSelector((state: RootState) => state.auth);
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
            {userStatus ? (
              <>
                <Notification />
                <AddFriendButton />
                <ModeToggle />
                <Avatar />
              </>
            ) : null}
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
  const userData = useSelector((state: RootState) => state.auth.userData);
  // console.log("userAvatar", userAvatar);
  const dispatch = useDispatch();
  const signOut = async () => {
    await logout()
      .then(() => dispatch(logoutAction()))
      .catch((error) => console.log(error));
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <AV className=" border hover:border-popover-foreground">
            <AvatarImage src={userData?.avatar.url} />
            <AvatarFallback>{userData?.fullName?.slice(0, 2)}</AvatarFallback>
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
        <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export interface UserInterface {
  _id: string;
  avatar: {
    url: string;
    publicId: string;
  };
  createdAt: string;
  email: string;
  fullName: string;
  updatedAt: string;
  userName: string;
}
function AddFriendButton() {
  const [searchUser] = useLazySearchUserQuery();
  const [searchOutput, setSearchOutput] = useState<UserInterface[] | []>([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput !== "") {
        // do something
        searchUser(searchInput)
          .then((data) => {
            setSearchOutput(data.data.data);
            console.log("searchOutput", data.data.data);
          })
          .catch((error) => console.log(error));
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [searchInput, searchUser]);

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
              <Input
                id="name"
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                value={searchInput}
                placeholder="Enter your friend Id"
              />
            </div>
          </DialogTitle>
          <DialogDescription>
            <ScrollArea className="h-60 w-full  rounded-md border px-4">
              {searchOutput.length > 0
                ? searchOutput.map((item) => {
                    return (
                      <FriendProfile
                        key={item._id}
                        _id={item._id}
                        fullName={item.fullName}
                        userName={item.userName}
                        avatar={item.avatar.url}
                      />
                    );
                  })
                : "User not found"}
            </ScrollArea>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function FriendProfile({
  _id,
  fullName,
  userName,
  avatar,
}: {
  _id: string;
  fullName: string;
  userName: string;
  avatar: string;
}) {
  const [sendFriendRequest, { isLoading }] = useSendFriendRequestMutation();
  const handleSendFriendRequest = async (id: string) => {
    const data = {
      receiverId: id,
    };

    try {
      const res = await sendFriendRequest(data);
      console.log("res", res);

      if (res.data) {
        toast({
          title: "Friend Request Sent",
          variant: "default",
        });
      } else {
        toast({
          // title: res?.error?.data?.message,
          variant: "default",
        });
      }
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  };
  return (
    <div key={_id} className=" cursor-pointer border-b p-2">
      <div className="flex w-full items-center gap-4">
        <AV className="hidden h-12 w-12 sm:flex">
          <AvatarImage src={avatar} alt={`'s Avatar`} />
          <AvatarFallback>{fullName.slice(0, 1)}</AvatarFallback>
        </AV>
        <div className="grid gap-1">
          <p className="text-lg font-medium leading-none">{fullName}</p>
          <p className="text-sm text-muted-foreground">@{userName}</p>
        </div>
        <div className="ml-auto font-medium">
          <Button
            variant="outline"
            className=" focus:bg-primary flex flow-row gap-2"
            onClick={() => handleSendFriendRequest(_id)}
          >
            <span className="text-base">
              {isLoading ? "Sending..." : "Send Request"}
            </span>
            <SendHorizontal className=" text-base" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function Notification() {
  const [reply] = useAcceptAndRejectFriendRequestMutation();
  const [notification, setNotication] = useState<Notication[] | []>([]);
  const notificationFromStore = useSelector(
    (state: RootState) => state.auth.userNotification
  );
  const dispatch = useDispatch()

  useEffect(() => {
    setNotication(notificationFromStore)
  },[notificationFromStore])
  // const friendRequestHandler = async(status : string, requestId: string) => {
  //     try {
  // const res = await reply({status, requestId})
  // if(res.data.status === "success"){ {
  //   console.log("res", res);
  // }else{

  // }
  //     } catch (error) {
  //       toast({
  //         title: "Error",
  //         description: "Something went wrong. Please try again later.",
  //         variant: "destructive",
  //       })
  //       console.log(error);
  //     }
  // }

  const friendRequestHandler = async (status: string, requestId: string) => {
    try {
      const res = await reply({ status, requestId });
      if (res.data.success || res.data.statusCode === 200) {
        toast({
          title : status === "accepted" ? "New Friend Added in Your Friend List" : "Request Rejected",
          description: status === "accepted" ? "You can see it in your friend list" : "Request Rejected successfully",
          variant: "default",
        })
        dispatch(removeNotification(requestId))
        // setNotication( pre => (pre.filter(item => item._id !== requestId)))
      } else {
        toast({
          title: res?.data?.data?.message,
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
      console.log(error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className=" p-2 rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground"
        >
          <div className="h-5 w-5 relative">
            <BellDot className="h-5 w-5" />
            <span className="absolute top-[-10px] right-[-10px] flex flex-col items-center justify-center p-2 h-5 w-5 rounded-full bg-red-500 text-xs ">
              {notification.length}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-[350px]" align="end">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem> */}
        {notification.length > 0
          ? notification.map((item) => {
              return (
                <Card key={item._id}>
                  <CardContent className=" py-2 px-2">
                    <div className=" flex flex-row items-center gap-2">
                      <div>{item.sender.fullName}</div>

                      <div className=" ml-auto gap-2 flex flex-row justify-around items-center">
                        <Button
                          onClick={() =>
                            friendRequestHandler("accepted", item._id)
                          }
                          className=" h-8  "
                        >
                          Accept
                        </Button>
                        <Button
                          variant={"destructive"}
                          onClick={() =>
                            friendRequestHandler("rejected", item._id)
                          }
                          className=" p-2 bg-red-500 h-8 w-9"
                        >
                          <Trash2Icon />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          : (
            <div className="flex flex-col items-center justify-center py-5">
              <h2>No Notifications</h2>
            </div>
          )}

        {/* </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
