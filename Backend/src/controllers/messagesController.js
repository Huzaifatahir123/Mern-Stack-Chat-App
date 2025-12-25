import { log } from "console";
import { Message } from "../models/messageModel.js";
import User from "../models/userModel.js"
import { getReceiverSocketId } from '../utils/Socket.js';

export const sendMessages = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId, message } = req.body;
    console.log(req.user._id);

    if (!receiverId || !message) {
      return res.status(400).json({ message: "Receiver and message required" });
    }

    // Check if the receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    // Create message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
   
    

    // --- SOCKET IO FUNCTIONALITY START ---
    // 1. Get the receiver's socket ID from our map
    const receiverSocketId = getReceiverSocketId(receiverId);
    
    // 2. If they are online, send the message instantly
    if (receiverSocketId) {
      // global.io comes from socket.js
      global.io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    // --- SOCKET IO FUNCTIONALITY END ---

    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.log("SEND_MESSAGE_ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const receiverId = req.params.receiverId;

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: receiverId },
        { senderId: receiverId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 }); // ascending order for chat UI

    res.status(200).json(messages);
  } catch (error) {
    console.log("GET_MESSAGES_ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};