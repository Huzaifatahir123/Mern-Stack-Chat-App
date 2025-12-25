import express from "express"
import { protect } from "../middleware/protectAuth.js";
import { getMessages ,sendMessages } from "../controllers/messagesController.js";
const router = express.Router();
router.post("/sendMessages",protect,sendMessages);
router.get("/getMessages/:receiverId",protect,getMessages);
export default router;