import { sql } from "../lib/db.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const sendMessage = async (req, res) => {
  const { id: receiverId } = req.params;
  const { message } = req.body;
  const { id: senderId } = req.user;
  try {
    if (!message || message.trim() === "")
      return res.status(400).json({ message: "All Fields Required" });
    const createdMessage = await sql`
    INSERT INTO messages (sender_id, receiver_id, message) VALUES (${senderId}, ${receiverId}, ${message}) RETURNING *;`;
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", createdMessage[0]);
    }
    console.log("Successfully Created Message");
    res.status(201).json(createdMessage[0]);
  } catch (error) {
    console.log("Error in sendMessage: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  const { id: receiverId } = req.params;
  const { id: senderId } = req.user;
  try {
    const messages = await sql`
    SELECT * FROM messages WHERE sender_id = ${senderId} AND receiver_id = ${receiverId} OR sender_id = ${receiverId} AND receiver_id = ${senderId};`;
    console.log("Successfully Read Messages");
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUsers = async (req, res) => {
  const { id: loggedInUser } = req.user;
  try {
    const users = await sql`
    SELECT * FROM users WHERE id != ${loggedInUser};`;
    console.log("Successfully Read Users");
    res.status(200).json(users);
  } catch (error) {
    console.log("Error in getUsers: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
