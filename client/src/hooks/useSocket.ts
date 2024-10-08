import { useState, useEffect } from "react";
import Socket from "../socket";
function useSocket() {
  const [socket, setSocket] = useState<any>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  function connectEvent(): void {
    setIsConnected(true);
  }
  function disconnectEvent(): void {
    setIsConnected(false);
  }

  useEffect(() => {
    if (!socket) {
      Socket.connect();
      setSocket(Socket);
      Socket.on("connect", connectEvent);
      Socket.on("reconnect", connectEvent);
      Socket.on("disconnect", disconnectEvent);
      Socket.on("error", disconnectEvent);
    }

    return () => {
      Socket.off("connect", connectEvent);
      Socket.off("reconnect", connectEvent);
      Socket.off("disconnect", disconnectEvent);
      Socket.off("error", disconnectEvent);
      Socket.close();
    };
  }, [Socket]);

  return isConnected;
}

export { useSocket };
