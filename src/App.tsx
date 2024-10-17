// src/App.tsx

import { Toaster } from "@/components/ui/toaster";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { getUserData } from "./api/api";
import { IsLoadingMain } from "./components/auth/IsLoading";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Card, CardContent } from "./components/ui/card";
import {
  useLazyGetChatsQuery,
  useLazyGetNotificationsQuery,
} from "./redux/api/api";
import { login as loginAction } from "./redux/reducers/auth";
import { setChats } from "./redux/reducers/chats";
import { RootState } from "./redux/store";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Button } from "./components/ui/button";
import { PhoneIcon, PhoneOffIcon } from "lucide-react";
import { useWebRTC } from "./hooks/webRTC";

function App() {
  const {incomingCall, show} = useWebRTC();
  const [isLoading, setIsLoading] = useState(true);
  const userStatus = useSelector((state: RootState) => state.auth.userStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getNotifications] = useLazyGetNotificationsQuery();
  const [getChats] = useLazyGetChatsQuery();

  const initializeUserData = useCallback(async () => {
    try {
      // const userData = await getUserData();
      // const notifications = await getNotifications("");

      const [userData, notifications, chats] = await Promise.all([
        getUserData(),
        getNotifications(""),
        getChats(""),
      ]);
      if (!userData) {
        navigate("/signin");
      } else {
        // console.log("userData", userData);
        dispatch(
          loginAction({ user: userData, notification: notifications.data.data })
        );
        dispatch(setChats({ chats: chats.data.data || [] }));
      }
    } catch (error) {
      console.warn("error", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, getChats, getNotifications, navigate]);

  // const {data, isError, error} = useGetChatsQuery('')
  // useErrors([{isError, error}])
  // console.log("chats", data);

  useEffect(() => {
    if (!userStatus) {
      initializeUserData();
    } else setIsLoading(false);
  }, [initializeUserData, userStatus]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="App">
        {isLoading ? (
          <IsLoadingMain />
        ) : (
          // <div className="w-full h-full flex flex-col items-center justify-center">
          //   <div className="loading-text">Loading...</div>
          // </div>
          <>
            <Navbar />
            <main className="relative">
              {incomingCall && show && <Call />}
              {/* <Call/> */}
              <Outlet />
            </main>
            <Toaster />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;

function Call() {
  const {incomingCallUser, callDecline, callAccept} = useWebRTC();
  return (
    <div className="absolute z-20 top-0 left-0 w-full h-full bg-black/50 flex flex-col items-center justify-center">
      <Card className="w-full h-full sm:h-fit sm:max-w-sm mx-auto">
        <CardContent className="flex flex-col items-center p-6 space-y-11">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={incomingCallUser?.avatar}
              alt="Caller"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-bold">{incomingCallUser?.name}</h2>
            <p className="text-muted-foreground">Incoming call</p>
          </div>
          <div className="flex justify-center space-x-8 w-full mt-8">
            <Button
              onClick={() => callDecline()}
              size="icon"
              className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600"
            >
              <PhoneOffIcon className="h-8 w-8" />
              <span className="sr-only">Reject Call</span>
            </Button>
            <Button
              onClick={() => callAccept()}
              size="icon"
              className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600"
            >
              <PhoneIcon className="h-8 w-8" />
              <span className="sr-only">Accept Call</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
