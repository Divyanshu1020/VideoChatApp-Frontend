// src/App.tsx

import { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ThemeProvider } from "./components/theme/theme-provider";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { getUserData } from "./api/api";
import { useDispatch } from "react-redux";
import { login as loginAction } from "./redux/reducers/auth";
import { useLazyGetChatsQuery, useLazyGetNotificationsQuery } from "./redux/api/api";
import { Toaster } from "@/components/ui/toaster"
import { setChats } from "./redux/reducers/chats";
import { IsLoadingMain } from "./components/auth/IsLoading";
// import useErrors from "./hooks/Error";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const userStatus = useSelector((state : RootState)=> state.auth.userStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [getNotifications] = useLazyGetNotificationsQuery();
  const [getChats] = useLazyGetChatsQuery();
  
  const initializeUserData = useCallback(async () => {
    try {
      // const userData = await getUserData();
      // const notifications = await getNotifications("");

      const [userData, notifications, chats] = await Promise.all([
        getUserData(),
        getNotifications(""),
        getChats("")
      ])
      if (!userData) {
        navigate("/signin")
      } else {
        // console.log("userData", userData);
        dispatch(loginAction({ user: userData, notification: notifications.data.data }));
        dispatch(setChats({ chats: chats.data.data || [] }));
      }
    } catch (error) {
      console.error("Failed to initialize user data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, getChats, getNotifications, navigate]);

  // const {data, isError, error} = useGetChatsQuery('')
  // useErrors([{isError, error}])
  // console.log("chats", data);

  useEffect(() => {
    if(!userStatus) {initializeUserData()}
    else setIsLoading(false)
  }, [initializeUserData, userStatus]);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="App">
        {isLoading ? (

          <IsLoadingMain/>
          // <div className="w-full h-full flex flex-col items-center justify-center">
          //   <div className="loading-text">Loading...</div>
          // </div>
        ) : (
          <>
            <Navbar />
            <main>
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
