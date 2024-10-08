import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function General() {
  return (
    <div className="grid gap-6">
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>My Details</CardTitle>
          <CardDescription>Personal information about you</CardDescription>
        </CardHeader>
        <CardContent>
          <PersonalInformation />
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Update</Button>
        </CardFooter>
      </Card>
      
      <Card x-chunk="dashboard-04-chunk-2">
        <CardHeader>
          <CardTitle>Bio</CardTitle>
          <CardDescription>
            This is what others will see you on your profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <Textarea
              placeholder="Write something about yourself"
              defaultValue="I am a new in this app."
            />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Update Bio</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function PersonalInformation() {
  const userData = useSelector((state: RootState) => state.auth.userData);
  return (
    <form className="flex flex-row gap-4 h-fit">
      <div title="personal information" className="w-full ">
        <Label className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Username
        </Label>
        <Input
          placeholder=" UserName "
          className=" disabled:bg-accent"
          disabled
          defaultValue={userData?.userName}
        />

        <Label className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Name
        </Label>
        <Input
          placeholder=" Name "
          className=" disabled:bg-accent"
          disabled
          defaultValue={userData?.fullName}
        />

        <Label className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Email
        </Label>
        <Input
          placeholder="email "
          className=" disabled:bg-accent"
          disabled
          defaultValue={userData?.email}
        />

        <Label className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Password
        </Label>
        <Input
          type="password"
          placeholder="Store Name "
          className=" disabled:bg-accent"
          disabled
          defaultValue={"00000000"}
        />
      </div>

      <div dir="image" className="  min-h-full">
        <Card className=" relative size-[260px] bg-accent flex flex-col items-center justify-center  ">
          <img className=" object-cover rounded-lg" src={userData?.avatar.url} alt="" />
        </Card>
      </div>
    </form>
  );
}
