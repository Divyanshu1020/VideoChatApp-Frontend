import { RootState } from "@/redux/store";
import { BellDot, Menu, MessageCircle, UserPlus } from "lucide-react";
import { useSelector } from "react-redux";
import { Skeleton } from "../Home/aside/FriendList";
import { Defult } from "../Home/Right/Right";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export function IsLoadingMain() {
  const formobile = useSelector((state: RootState) => state.auth.forMobile);
  return (
    <div>
      <div className="border-b z-20 left-0 fixed w-full bg-background">
        <header className="sticky mx-auto  top-0 max-w-[1400px] flex h-16 items-center gap-4   px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <div className="flex flex-row items-center gap-2 text-lg font-semibold md:text-base">
              <MessageCircle />
              <span className=" text-nowrap">Video Chat App</span>
            </div>
          </nav>

          <Button
            disabled={true}
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>

          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <div className="ml-auto items-center flex-initial flex flex-row gap-2  h-full">
              <div className="h-5 w-5 relative">
                <BellDot className="h-5 w-5 text-accent" />
              </div>
            </div>
            <UserPlus className="h-5 w-5 text-accent " />
          </div>
        </header>
      </div>
      <main>
        <div className="grid h-full w-full ">
          <div className="flex flex-col">
            <main className="grid flex-1 gap-4 overflow-auto p-4  sm:grid-cols-[2fr_5fr] ">
              <Card
                className={`${
                  !formobile ? "" : "hidden"
                } relative flex-col items-start gap-8 sm:flex overflow-auto`}
                x-chunk="dashboard-03-chunk-0"
              >
                <div className="container px-2 py-2">
                  <Skeleton />
                </div>
              </Card>
              <Defult></Defult>
            </main>
          </div>
        </div>
      </main>
    </div>
  );
}
