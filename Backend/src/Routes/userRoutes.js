import express from "express"
import { forgotPassword, login, logOut, resetPassword, signUp ,getUsers } from "../controllers/userAuth.js";
import { protect } from "../middleware/protectAuth.js";
const router = express.Router();
router.post("/signUp",signUp);
router.post("/login",login);
router.post("/logout",logOut);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password",resetPassword);
router.get("/users",protect,getUsers);
router.get("/me",protect,async(req,res)=>{res.status(200).json(req.user)});
export default router;