import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketDataContext = createContext();

const SocketContext = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BASE_URL);
   

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    setSocket(newSocket);


  }, []);



  return (
    <SocketDataContext.Provider value={{ socket }}>
      {children}
    </SocketDataContext.Provider>
  );
};

export default SocketContext;
