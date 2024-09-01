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
export default function ManageGroup() {
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
          <Button>Create</Button>
        </CardFooter>
      </Card>

      <YourGroup />
    </div>
  );
}

function YourGroup() {
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
          <div className="flex flex-row items-center border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ">
            <div className=" p-4 flex flex-col align-middle [&:has([role=checkbox])]:pr-0 ">
              <div className="font-medium">Emma Brown</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                dicripton
              </div>
            </div>
            <div className="p-4 ml-auto [&:has([role=checkbox])]:pr-0">25</div>
          </div>
          
         
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
