import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLazyGetMyGroupsQuery } from "@/redux/api/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Group {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  bio: string;
  avatar: string
  members: number
}
export default function ManageGroup() {
  const navigate = useNavigate()
  return (
    <div className="grid gap-6">
      <Card className="" x-chunk="dashboard-04-chunk-2">
        <CardHeader className="pb-3">
          <CardTitle>Create New Group</CardTitle>
          <CardDescription className=" text-balance leading-relaxed">
            Create a new group and enjoy group talking.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={()=>navigate('create')}>Create</Button>
        </CardFooter>
      </Card>

      <YourGroup />
    </div>
  );
}

function YourGroup() {
  const [myGroups, setMyGroups] = useState([])
  const [getMyGroups] = useLazyGetMyGroupsQuery()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchMyGroups() {
      try {
        const res = await getMyGroups("")
        // console.log("res", res)
        setMyGroups(res.data.data);
      } catch (error) {
        console.warn("error", error);
      }
    }

    fetchMyGroups()
  },[getMyGroups])
  
  return (
    

    <Card x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Your Group</CardTitle>
          <CardDescription>Group that owned by you.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className=" h-10 px-4 font-medium text-muted-foreground border-b flex flex-row items-center justify-between">
          <span>Group</span>
          <span>Members</span>
        </div>

        <ScrollArea className=" h-80 w-full">
          {
            myGroups?.map((group:Group)=>{
              return (
                <div key={group._id} onClick={()=>navigate(`details/${group._id}`)} className="cursor-pointer flex flex-row items-center border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ">
            <div className=" p-4 flex flex-col align-middle [&:has([role=checkbox])]:pr-0 ">
              <div className="font-medium">{group.chatName}</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                {group.bio}
              </div>
            </div>
            <div className="p-4 ml-auto [&:has([role=checkbox])]:pr-0">{group.members}</div>
          </div>
              )
            })
          }



          
          
         
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
