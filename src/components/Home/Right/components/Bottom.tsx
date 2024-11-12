import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CornerDownLeft,
  File,
  FileMusicIcon,
  Image,
  Paperclip,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSocket } from "@/hooks/socket";
import { toast } from "@/hooks/use-toast";
import { ChangeEvent, FormEvent, KeyboardEvent, SetStateAction, useRef, useState } from "react";
import { useSendAttchmentMutation } from "@/redux/api/api";

interface Data {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  members: string[];
}

export default function Bottom({
  islooding,
  data,
}: {
  islooding: boolean;
  data: Data | undefined;
}) {
  const [fileToShow, setFileToShow] = useState<File[] | []>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { socket } = useSocket();
  const [sendAttchment, { isLoading }] = useSendAttchmentMutation()

  const deleteItemFromFileToShoe = (file: File) => {
    setFileToShow((prev) => prev.filter((item) => item !== file));
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const sendAttachmentToServer = async (message?: string) => {
    const formData = new FormData();
    formData.append("chatId", data?._id as string);
    fileToShow.forEach((file) => {
      formData.append("files", file);
    });
    if(message) formData.append("content", message)
    try {
      const res = await sendAttchment(formData);
      if (res.data.status === "success") {
        console.log("res");
      } else {
        toast({
          title: "Something went wrong",
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
    } finally {
      setFileToShow([])
      textareaRef.current!.value = "";
      textareaRef.current?.focus();
    }
  }
  const handleSubmit = (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    if (textareaRef.current) {
      const message = textareaRef.current.value;

      //* Check if message and fileToShow are empty
      if (message.trim().length === 0 && fileToShow.length === 0) {
        toast({
          title: "Empty message",
          description: "Please enter a message",
          variant: "destructive",
        });
        return;
      } else if (message.trim().length === 0 && fileToShow.length > 0) {
        sendAttachmentToServer()
        return
      } else if (message.trim().length > 0 && fileToShow.length > 0) {
        sendAttachmentToServer(message)
        return
      }

      socket?.emit("NEW_MESSAGE", {
        chatId: data?._id,
        message,
        members: data?.members,
      });

      textareaRef.current.value = "";
      setFileToShow([]);
      textareaRef.current?.focus();

    }
  };  return (
    <form
      className="relative overflow-hidden rounded-b-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
      x-chunk="dashboard-03-chunk-1"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Label htmlFor="message" className="sr-only">
        Message
      </Label>
      <Textarea
        disabled={islooding}
        ref={textareaRef}
        onKeyDown={handleKeyDown}
        id="message"
        placeholder="Type your message here..."
        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0 "
      />
      <div className="flex flex-row justify-start gap-4 items-center p-3 pt-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {" "}
              <SendFiles setFileToShow={setFileToShow} />
            </TooltipTrigger>
            <TooltipContent side="top">Attach File</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="  flex-wrap max-h-10 overflow-hidden flex flex-row gap-2">
          {fileToShow.length > 0 &&
            fileToShow.map((file, index) => {
              const Icon = file.type.includes("image") ? (
                <Image className="mr-2 h-4 w-4" />
              ) : (
                <File className="mr-2 h-4 w-4" />
              );

              return (
                <Card
                  key={index}
                  className="bg-accent w-fit  flex items-center h-10 px-4 py-2"
                >
                  {Icon}
                  <p className=" text-nowrap  max-w-[100px] overflow-hidden text-sm">
                    {" "}
                    {file.name}
                  </p>

                  <X
                    className="ml-2 h-3.5 w-3.5 cursor-pointer"
                    onClick={() => deleteItemFromFileToShoe(file)}
                  />
                </Card>
              );
            })}
        </div>

        <Button
          disabled={islooding || isLoading}
          type="submit"
          size="sm"
          className="ml-auto gap-1.5 disabled:bg-accent"
        >
          {isLoading ? "Sending..." : "Send"}
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </form>
  );
}

function SendFiles({
  setFileToShow,
}: {
  setFileToShow: (value: SetStateAction<[] | File[]>) => void;
}) {
  const fileChaneHandeler = (
    e: ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    if (files.length === 0) return;
    if (files.length > 5) {
      toast({
        title: "Error",
        description: `You can't send more than 5 ${name} at a time `,
        variant: "destructive",
      });
    }

    setFileToShow((prev : File[]) => {
      const newFile = [...prev, ...files];

      if (newFile.length > 5) {
        toast({
          title: "Error",
          description: `You can't send more than 5 itam at a time `,
          variant: "destructive",
        });

        return prev;
      }

      return newFile;
    });

    console.log("files", files);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Paperclip className="size-4" />
          <span className="sr-only">Attach file</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <div className=" relative flex select-none items-center rounded-sm px-2 py-1.5 text-base outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-default">
          <input
            onChange={(e) => fileChaneHandeler(e, "image")}
            type="file"
            accept="image/png, image/jpeg, image/gif "
            className="absolute opacity-0 left-0 top-0 "
            multiple
          />
          <Image className="mr-2 h-4 w-4" />
          <span>Image </span>
        </div>
        <div className=" relative flex select-none items-center rounded-sm px-2 py-1.5 text-base outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-default">
          <input
            onChange={(e) => fileChaneHandeler(e, "audio")}
            type="file"
            accept=" audio/wav, audio/mpeg"
            className="absolute opacity-0 left-0 top-0 "
          />
          <FileMusicIcon className="mr-2 h-4 w-4" />
          <span>Audio</span>
        </div>
        <div className=" relative flex select-none items-center rounded-sm px-2 py-1.5 text-base outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-default">
          <input
            onChange={(e) => fileChaneHandeler(e, "file")}
            type="file"
            className="absolute opacity-0 left-0 top-0 "
          />
          <File className="mr-2 h-4 w-4" />
          <span>File</span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
