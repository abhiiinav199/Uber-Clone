import { SocketIo } from "socket.io";

let io;

export const initializeSocket = (server) => {
  io = SocketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

export const sendMessageToSocketId = (socketId, message) => {
//   console.log(message);

  if (io) {
    io.to(socketId).emit('message', message);
  } else {
    console.log("Socket.io not initialized.");  
  }
};
