import { Link, useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

import {
  GroupDetailsProvider,
  useGroupDetails,
} from "./components/GroupDetails/ContextApi/groupDeatailsContextApi";
import Part1 from "./components/GroupDetails/Part/Part1";
import Part2 from "./components/GroupDetails/Part/Part2";
import Part3 from "./components/GroupDetails/Part/Part3";
import { useAddNewMemebersInGroupMutation, useChangeAvatarOfGroupMutation, useChangeGroupNameMutation, useRemoveMemebersInGroupMutation } from "@/redux/api/api";
import { toast } from "@/hooks/use-toast";
import { set } from "react-hook-form";

export default function GroupDetailsPage() {
  return (
    <GroupDetailsProvider>
      <GroupDetails />
    </GroupDetailsProvider>
  );
}

function GroupDetails() {
  const {
    form,
    membersToAdd,
    membersToRemove,
    setDisabledPart1,
    setDisabledPart2,
    groupName,
    setIsLoading,
  } = useGroupDetails();

  const [changeGroupName] = useChangeGroupNameMutation()
  const [addMembersInGroup] = useAddNewMemebersInGroupMutation()
  const [removeMembersInGroup] = useRemoveMemebersInGroupMutation()
  const [changeAvatarOfGroup] = useChangeAvatarOfGroupMutation()
  const {id} =useParams()

  const onSubmit = async(data) => {
    setDisabledPart1(true);
    setDisabledPart2(true);
    setIsLoading(true);

    if (data.name.trim().length > 3 && data.name !== groupName) 
      {
        try {

          const res = await changeGroupName({chatId: id, name: data.name})
          if(res.error){
            toast({
              title: "Error",
              description: res.error.data.message,
              variant: "destructive",
            })
          }
          
        } catch (error) {
          console.warn("error", error);
        }
      }

      if (data.image) {
        try {
          const newForm = new FormData();
          newForm.append("chatId", String(id));
          newForm.append("avatar", data.image);

          const res = await changeAvatarOfGroup(newForm);
          if(res.error){
            toast({
              title: "Error",
              description: res.error.data.message,
              variant: "destructive",
            })
          }else {
            toast({
              title: "Success",
              description: "Avatar changed successfully",
              variant: "default",
            })
          }
          
          
        } catch (error) {
          console.warn("error", error);
        }
      }

      if (membersToAdd.length > 0) {
        try {
          const res = await addMembersInGroup({chatId: id, members: membersToAdd})
          if(res.error){
            toast({
              title: "Error",
              description: res.error.data.message,
              variant: "destructive",
            })
          }else {
            toast({
              title: "Success",
              description: "Members added successfully",
              variant: "default",
            })
          }
        } catch (error) {
          console.warn("error", error);
        }
      }

      if (membersToRemove.length > 0) {
        try {
          const res = await removeMembersInGroup({chatId: id, member: membersToRemove})
          console.log("membersToRemove", res);
          if(res.error){
            toast({
              title: "Error",
              description: res.error.data.message,
              variant: "destructive",
            })
          }else {
            toast({
              title: "Success",
              description: "Members removed successfully",
              variant: "default",
            })
          }
        } catch (error) {
          console.warn("error", error);
        }
      }


      setIsLoading(false);
    
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
      <BreadcrumbWithCustomSeparator />
      <Part1 />
      <Part2 />
      <Part3 />
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
          <BreadcrumbPage>Details</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
