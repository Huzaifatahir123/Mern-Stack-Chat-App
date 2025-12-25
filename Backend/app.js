import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./src/Routes/userRoutes.js";
import messagesRoutes from "./src/Routes/messagesRoutes.js"

import { initializeSocket } from "./src/utils/Socket.js";

dotenv.config();

const app = express();
const httpServer = initializeSocket(app);
const PORT = process.env.PORT || 5000;

// ----------------------------
// MIDDLEWARE
// ----------------------------
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true,               // allow cookies
}));
app.use(express.json());   // parse JSON bodies
app.use(cookieParser());   // parse cookies

// ----------------------------
// MONGODB CONNECTION
// ----------------------------
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/chatapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Stop server if DB fails
  }
};

connectDB();

// ----------------------------
// TEST ROUTE
// ----------------------------


// ----------------------------
// PLACEHOLDER FOR ROUTES
// Example:
app.use("/api/user",userRoutes);
app.use("/api/messages",messagesRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
// ----------------------------

// ----------------------------
// START SERVER
// ----------------------------
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
