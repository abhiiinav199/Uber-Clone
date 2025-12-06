import { Server } from "socket.io";
import userModel from "./models/user.models.js";
import { captainModel } from "./models/captain.models.js";
let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);


    const models = {
      user: userModel, 
      captain: captainModel,
    };

    socket.on("join", async (data) => {
      const { userId, userType } = data;

    console.log(`User ${userId} joined as ${userType}`)
    // console.log(`Captain ${userId} joined as ${userType}`)


      const Model = models[userType];// dynamic value selection can be used like this for accessing the values of the object - models[userType]
      await Model.findByIdAndUpdate(
        userId,
        { socketId: socket.id },
        { new: true } 
      );
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

export const sendMessageToSocketId = (socketId, message) => {
  //   console.log(message);

  if (io) {
    io.to(socketId).emit("message", message);
  } else {
    console.log("Socket.io not initialized.");
  }
};
