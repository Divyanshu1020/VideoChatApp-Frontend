import env from "@/constants/env";
import { setNotification } from "@/redux/reducers/auth";
import { RootState } from "@/redux/store";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";
import { toast } from "./use-toast";

export type MyEvent =
  | "NEW_MESSAGE"
  | "NEW_MESSAGE_ALERT"
  | "NEW_REQUEST"
  | "WELLCOME"
  | "REFETCH";

type SocketContextType = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType | null>(null);

const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (context === null) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const newSocket = useMemo(
    () => io(env.SOCKET_URL, { withCredentials: true }),
    []
  );
  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    newSocket.on("connect", () => {
      console.log("Socket connected");
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    newSocket.on("WELLCOME", (data) => {
      toast({
        title: data.title,
        description: data.description,
        variant: "default",
      });
    });

    newSocket.on<MyEvent>("NEW_REQUEST", (data) => {
      toast({
        title: data.title,
        description: data.description,
        variant: "default",
      });
      dispatch(
        setNotification({
          notification: data.notification,
        })
      );
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [newSocket]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
