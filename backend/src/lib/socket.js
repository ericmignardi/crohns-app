import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId) {
  return onlineUserSocketMap[userId];
}

const onlineUserSocketMap = {};

io.on("connection", (socket) => {
  console.log(`Socket ID ${socket.id} Connected`);
  const userId = socket.handshake.query.userId;
  if (userId) onlineUserSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(onlineUserSocketMap));

  socket.on("disconnect", () => {
    console.log(`Socket ID ${socket.id} Disconnected`);
    delete onlineUserSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(onlineUserSocketMap));
  });
});

export { app, server, io };
