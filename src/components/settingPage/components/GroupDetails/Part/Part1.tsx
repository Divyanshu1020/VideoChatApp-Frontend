import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLazyGetChatDetailsQuery } from "@/redux/api/api";
import { ChatDetails, ChatDetailsMembers } from "@/types/Request";
import { Camera } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useGroupDetails } from "../ContextApi/groupDeatailsContextApi";

export default function Part1() {
  const { disablePart1, setDisabledPart1 } = useGroupDetails();

  return (
    <Card className="" x-chunk="dashboard-04-chunk-2">
      <CardHeader className="pb-3">
        <CardTitle>Details</CardTitle>
        <CardDescription className=" text-balance leading-relaxed">
          Fill the details to create your group.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PersonalInformation />
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button type="button" onClick={() => setDisabledPart1(!disablePart1)}>
          {disablePart1 ? " Edit " : " Save "}
        </Button>
      </CardFooter>
    </Card>
  );
}

function PersonalInformation() {
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [getChatDetails, { error }] = useLazyGetChatDetailsQuery();
  const [data, setData] = useState<ChatDetails>();
  const [isLoading, setIsLoading] = useState(true);

  const { form, disablePart1, setGroupName, setGroupMembers  } = useGroupDetails();

  const imageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const selected = URL.createObjectURL(file);
    if (selected) {
      form.setValue("image", file);
      setImage(selected);
    }
  };

  useEffect(() => {
    // todo add loading and try catch
    setIsLoading(true);
    const getChatDetailsFun = async () => {
      try {
        const res = await getChatDetails({
          chatId: id as string,
          populate: "true",
        });
        if (res.data.success) {
          setData(res.data.data);
          setImage(res.data.data.avatar.url);
          setGroupMembers(res.data.data.members);
          form.setValue("name", res.data.data.chatName);
          setGroupName(res.data.data.chatName);
        } else {
          toast({
            title: "Error",
            description: res.error?.data?.message,
            variant: "destructive",
          });
          // console.log("error getChatDetails", error);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong. Sending back | Error: " + error,
          variant: "destructive",
        });

        setTimeout(() => {
          navigate("/settings/manage-groups");
        }, 1000);
      } finally {
        setIsLoading(false);
      }
    };

    getChatDetailsFun();
  }, [getChatDetails, id]);
  return (
    <div className="flex flex-col sm:flex-row gap-4 h-fit">
      <div title="information" className=" w-full flex flex-col gap-4 ">
        <div>
          <Label className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Name
          </Label>
          <Input
            disabled={disablePart1}
            placeholder="Group Name"
            // defaultValue={data?.chatName}
            className=" disabled:bg-accent mt-2"
            {...form.register("name", {
              required: true,
              minLength: 3,
            })}
          />
        </div>
        <div className=" border-b"></div>
        <Members members={data?.members} />
      </div>

      <div dir="image" className="   ">
        <Card className=" relative size-[300px] bg-accent flex flex-col items-center justify-center  ">
          <img className=" object-cover rounded-lg" src={image} alt="" />

          {image === "" && <Camera className="w-10 h-10" />}
          <input
            type="file"
            disabled={disablePart1}
            title=""
            className=" absolute w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => {
              imageUpload(e);
            }}
          />
        </Card>
      </div>
    </div>
  );
}

function Members({ members }: { members: ChatDetailsMembers[] }) {
  return (
    <div>
      <div className="flex flex-col pb-4">
        <Label className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Members
        </Label>
        <FriendList members={members} />
      </div>
    </div>
  );
}

function FriendList({ members }: { members: ChatDetailsMembers[] }) {
  // 
  // const [data, setData] = useState<Friend[] | null>(null);

  // useEffect(() => {
  //   async function getFriend() {

  //       try {
  //         const res = await getMyFriends("");
  //         console.log("friendlist", res);
  //         setData(res.data.data);
  //       } catch (error) {
  //         console.log(`error`, error);
  //       }

  //   }

  //   getFriend()
  // }, [getMyFriends]);

  return (
    <Card
      className={`mt-3 relative flex-col items-start gap-8 flex overflow-auto`}
      x-chunk="dashboard-03-chunk-0"
    >
      <div className="container px-2 py-2">
        {/* {isLoading && <Skeleton />} */}

        {/* {data && <DataTable  data={data} />} */}

        <DataTable members={members} />

        {/* <DataTable columns={columns} data={data || [] } /> */}
      </div>
    </Card>
  );
}

function DataTable({ members }: { members: ChatDetailsMembers[] }) {
  const [data, setData] = useState(members);
  const [searchInput, setSearchInput] = useState("");

  const { disablePart1 } = useGroupDetails();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput.trim().length > 0) {
        const newData = data.filter((chat) => {
          return chat.fullName
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        });
        setData(newData);
      } else {
        setData(members);
      }
    }, 200);
    return () => clearTimeout(timeout);
  }, [members, searchInput]);

  return (
    <div className=" ">
      <div className="flex items-center pb-4">
        <Input
          disabled={disablePart1}
          type="search"
          placeholder="Search by name or username..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          className="text-xl h-13"
        />
      </div>
      <ScrollArea className="h-[300px]  w-full rounded-md ">
        <Table>
          <TableBody
            key={1}
            className=" grid   gap-3 py-1 [&_tr:last-child]:border-1"
          >
            {data &&
              data.map((member: ChatDetailsMembers) => (
                <FriendCell member={member} />
              ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}

function FriendCell({ member }: { member: ChatDetailsMembers }) {
  const { disablePart1 } = useGroupDetails();

  const { membersToRemove, setMembersToRemove } = useGroupDetails();
  const handleAddRemove = () => {
    if (membersToRemove.map((member) => member._id).includes(member._id)) {
      setMembersToRemove(membersToRemove.filter((it) => it._id !== member._id));
    } else {
      setMembersToRemove([
        ...membersToRemove,
        {
          _id: member._id,
          userName: member.userName,
        },
      ]);
    }
  };
  return (
    <TableRow key={member._id} className=" rounded-md block ">
      <TableCell className=" flex p-0 flex-row">
        <div className="flex w-full items-center gap-4 cursor-default p-4">
          <div className="flex items-center h-full rounded-full">
            <Avatar className="h-9 w-9 border-2 rounded-full border-white">
              <AvatarImage
                src={member?.avatar?.url}
                className="rounded-full"
                alt={`Avatar`}
              />
              <AvatarFallback>{member?.fullName.slice(0, 1)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="grid gap-1 text-nowrap">
            <p
              className={`text-sm font-medium leading-none ${
                disablePart1
                  ? "cursor-not-allowed text-slate-500"
                  : "cursor-default"
              }`}
            >
              {member.fullName}
            </p>
            <p className="text-sm text-muted-foreground">@{member.userName}</p>
          </div>
          <Button
            disabled={disablePart1}
            variant={
              membersToRemove.map((member) => member._id).includes(member._id)
                ? "destructive"
                : "outline"
            }
            className="ml-auto max-w-32 px-4 w-full disabled:bg-muted"
            size="icon"
            onClick={handleAddRemove}
            type="button"
          >
            Remove
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
