import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useCreateNewGroupMutation } from "@/redux/api/api";
import { RootState } from "@/redux/store";
import { Camera } from "lucide-react";
import { useState } from "react";
import {
  FieldValues,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FriendList from "./components/CreateGroup/FriendList";

export default function CreateGroup() {
  const [btn, setBtn] = useState("Create a new group chat");
  const [disabled, setDisabled] = useState(false);
  const [createNewGroup] = useCreateNewGroupMutation();
  const members = useSelector(
    (state: RootState) => state.friends.addedFriendIds
  );
  const form = useForm({});

  const onSubmit = async (data: FieldValues) => {
    if (members.length < 3) {
      toast({
        title: "Error",
        description: "Please add atleast 3 friends",
        variant: "destructive",
      });
      return;
    }
    setBtn("Creating...");
    setDisabled(true);
    const newForm = new FormData();
    newForm.append("name", data.name);
    newForm.append("bio", data.bio);
    newForm.append("avatar", data.image);

    newForm.append("members", JSON.stringify(members));
    try {
      const res = await createNewGroup(newForm);
      if (res.data) {
        toast({
          title: "Group Created",
          description: "Group created successfully, Sending you to the group",
          variant: "default",
        });
        setBtn("Group created successfully");
      } else {
        toast({
          title: "Error",
          variant: "default",
        });
        setBtn("Create a new group chat");
        setDisabled(false);
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
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
      <BreadcrumbWithCustomSeparator />
      <Card className="" x-chunk="dashboard-04-chunk-2">
        <CardHeader className="pb-3">
          <CardTitle>Details</CardTitle>
          <CardDescription className=" text-balance leading-relaxed">
            Fill the details to create your group.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PersonalInformation form={form} disabled={disabled} />
        </CardContent>
      </Card>

      <Card x-chunk="dashboard-04-chunk-2">
        <CardHeader>
          <CardTitle>Bio</CardTitle>
          <CardDescription>
            This is what others will see you on your profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Textarea
              disabled={disabled}
              placeholder="Write something about yourself"
              defaultValue="I am a new in this app."
              className="disabled:bg-accent"
              {...form.register("bio")}
            />
          </div>
        </CardContent>
      </Card>

      <Card x-chunk="dashboard-04-chunk-2">
        <CardHeader>
          <CardTitle>Create</CardTitle>
          <CardDescription>
            After Submit your group will be ready to chat.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button
              disabled={disabled}
              onClick={form.handleSubmit(onSubmit)}
              variant="default"
              className="disabled:bg-slate-400"
              type="submit"
            >
              {btn}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

function BreadcrumbWithCustomSeparator() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link to="/settings/manage-groups">Manage Groups</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Create</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function PersonalInformation({
  form,
  disabled,
}: {
  form: UseFormReturn<FieldValues>;
  disabled: boolean;
}) {
  const [image, setImage] = useState("");

  const imageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
  
    if (file) { // Check if file is not undefined
      const selected = URL.createObjectURL(file);
      if (selected) {
        form.setValue("image", file);
        setImage(selected);
      }
    }
  };
  return (
    <div className="flex flex-col sm:flex-row gap-4 h-fit">
      <div
        title="personal information"
        className=" w-full flex flex-col gap-4 "
      >
        <div>
          <Label className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Name
          </Label>
          <Input
            disabled={disabled}
            placeholder="Group Name"
            className=" disabled:bg-accent mt-2"
            {...form.register("name", {
              required: true,
              minLength: 3,
            })}
          />
        </div>
        <div className=" border-b"></div>
        <Members />
      </div>

      <div dir="image" className="   ">
        <Card className=" relative size-[300px] bg-accent flex flex-col items-center justify-center  ">
          <img className=" object-cover rounded-lg" src={image} alt="" />

          {image === "" && <Camera className="w-10 h-10" />}
          <input
            type="file"
            disabled={disabled}
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

function Members() {
  return (
    <div>
      <div className="flex flex-col pb-4">
        <Label className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Members
        </Label>
        <FriendList />
      </div>
    </div>
  );
}
