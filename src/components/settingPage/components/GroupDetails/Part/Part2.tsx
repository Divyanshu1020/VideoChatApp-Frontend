import { UserInterface } from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetMyFriendsMutation } from "@/redux/api/api";
import { useEffect, useState } from "react";
import { Friend } from "../../CreateGroup/FriendList";
import { useGroupDetails } from "../ContextApi/groupDeatailsContextApi";
export default function Part2() {
  const { disablePart2, setDisabledPart2 } = useGroupDetails();

  return (
    <Card className="" x-chunk="dashboard-04-chunk-2">
      <CardHeader className="pb-3">
        <CardTitle>Add New Members</CardTitle>
        <CardDescription className=" text-balance leading-relaxed">
          Add new members to your group.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AddNewMembers />
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button type="button" onClick={() => setDisabledPart2(!disablePart2)}>
          {disablePart2 ? " Edit " : " Save "}
        </Button>
      </CardFooter>
    </Card>
  );
}

function AddNewMembers() {
  return (
    <div>
      <div className="flex flex-col pb-4">
        <Label className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Members
        </Label>
        <Card
          className={`mt-3 relative flex-col items-start gap-8 flex overflow-auto`}
          x-chunk="dashboard-03-chunk-0"
        >
          <div className="container px-2 py-2">
            {/* {isLoading && <Skeleton />} */}

            {/* {data && <DataTable  data={data} />} */}

            <DataTable />

            {/* <DataTable columns={columns} data={data || [] } /> */}
          </div>
        </Card>
      </div>
    </div>
  );
}

function DataTable() {
  const [data, setData] = useState<Friend[] | []>([]);
  const [getMyFriends, { isLoading }] = useGetMyFriendsMutation();
  const [searchOutput, setSearchOutput] = useState<Friend[] | []>([]);
  const [searchInput, setSearchInput] = useState("");

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput.trim().length > 0) {
        const newData = data.filter((chat) => {
          return chat.name.toLowerCase().includes(searchInput.toLowerCase());
        });
        setSearchOutput(newData);
      } else {
        setSearchOutput(data);
      }
    }, 200);
    return () => clearTimeout(timeout);
  }, [data, searchInput]);

  const { disablePart2 } = useGroupDetails();

  return (
    <div className=" ">
      <div className="flex flex-col items-center pb-4">
        <Label className=" self-start mb-2 text-2xl" htmlFor="name">
          Search your friend by Id
        </Label>
        <Input
          disabled={disablePart2}
          id="name"
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          value={searchInput}
          placeholder="Enter your friend Id"
        />
      </div>
      <ScrollArea className="h-60 w-full  rounded-md border px-4">
        {!isLoading && searchOutput.length > 0
          ? searchOutput.map((item) => {
              return (
                <FriendProfile
                  key={item._id}
                  _id={item._id}
                  fullName={item.name}
                  userName={item.userName}
                  avatar={item.avatar}
                />
              );
            })
          : "User not found"}
        {isLoading && <h1>Loading...</h1>}
      </ScrollArea>
    </div>
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
  const { disablePart2, setMembersToAdd, membersToAdd } = useGroupDetails();

  const { groupMembers } = useGroupDetails();

  const handleAddRemove = () => {
    if (membersToAdd.map((member) => member._id).includes(_id)) {
      setMembersToAdd(membersToAdd.filter((it) => it._id !== _id));
    } else {
      setMembersToAdd([
        ...membersToAdd,
        {
          _id: _id,
          userName: userName,
        },
      ]);
    }
  };


if (  groupMembers.map((member) => member._id).includes(_id))  {
  return null
}
  return (
    <div key={_id} className=" cursor-pointer border-b p-2">
      <div className="flex w-full items-center gap-4">
        <Avatar className="hidden h-12 w-12 sm:flex">
          <AvatarImage src={avatar} alt={`'s Avatar`} />
          <AvatarFallback>{fullName?.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <p className="text-lg font-medium leading-none">{fullName}</p>
          <p className="text-sm text-muted-foreground">@{userName}</p>
        </div>
        <div className="ml-auto font-medium">
          <Button
            type="button"
            onClick={handleAddRemove}
            variant={
              membersToAdd.map((member) => member._id).includes(_id)
                ? "default"
                : "outline"
            }
            disabled={disablePart2}
            className=" focus:bg-primary flex flow-row gap-2"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
