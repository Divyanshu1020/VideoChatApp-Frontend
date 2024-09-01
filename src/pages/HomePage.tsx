import FriendList from "@/components/aside/FriendList";
import AppLayout from "@/components/layout/AppLayout";
import Right from "@/components/Right/Right";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"

export default function HomePage() {
  return (
    <AppLayout>
      <Page />
    </AppLayout>
  );
}

function Page() {
  return (
    <div className="grid h-full w-full ">
      <div className="flex flex-col">
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-[2fr_5fr] ">
          
            <FriendList />
          
          <Right/>
        </main>
      </div>
    </div>
  );
}
