import { ChatDetailsMembers } from "@/types/Request";
import { createContext, useContext, useState } from "react";
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";


interface MembersToAddAndRemove {
    _id: string;
    userName: string;
}

interface GroupDetailsContextType {
    membersToRemove: MembersToAddAndRemove[];
    setMembersToRemove: (members: MembersToAddAndRemove[]) => void;
    form: UseFormReturn<FieldValues>
    disablePart1: boolean
    setDisabledPart1: (value: boolean) => void
    disablePart2: boolean
    setDisabledPart2: (value: boolean) => void
    membersToAdd: MembersToAddAndRemove[]
    setMembersToAdd: (members: MembersToAddAndRemove[]) => void
    groupName: string
    setGroupName: (value: string) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    groupMembers: ChatDetailsMembers[]
    setGroupMembers: (members: ChatDetailsMembers[]) => void
}

const groupDetailsContext = createContext<GroupDetailsContextType | null >(null)

const GroupDetailsProvider = ({ children }: { children: React.ReactNode }) => {
    const [groupName, setGroupName] = useState<string>("");
    const [groupMembers, setGroupMembers] = useState<ChatDetailsMembers[]>([]);
    const [membersToRemove, setMembersToRemove] = useState<MembersToAddAndRemove[]>([]);
    const [membersToAdd, setMembersToAdd] = useState<MembersToAddAndRemove[]>([]);
    const [disablePart1, setDisabledPart1] = useState(true);                      
    const [disablePart2, setDisabledPart2] = useState(true);  
    const [isLoading, setIsLoading] = useState(false);                  

    const form = useForm({});
    const value = {
        membersToRemove,
        setMembersToRemove,
        form,
        disablePart1,
        setDisabledPart1,
        disablePart2,
        setDisabledPart2,
        membersToAdd,
        setMembersToAdd,
        groupName,
        setGroupName,
        isLoading,
        setIsLoading,
        groupMembers, 
        setGroupMembers,
    }
    return (
        <groupDetailsContext.Provider value={value}>
            {children}
        </groupDetailsContext.Provider>
    );
};

const useGroupDetails = () => {
    const context = useContext(groupDetailsContext);
    if (!context) {
      throw new Error("useGroupDetails must be used within a GroupDetailsProvider");
    }
    return context;
  };

export { GroupDetailsProvider, useGroupDetails }