import http from "http";
import app from "./app.js";
import { initializeSocket } from "./socket.js";
import dotenv from "dotenv";
dotenv.config();

const server = http.createServer(app);

initializeSocket(server);

server.listen(process.env.PORT, () => {
  console.log(`Sever is running on https://localhost:${process.env.PORT}`);
});
