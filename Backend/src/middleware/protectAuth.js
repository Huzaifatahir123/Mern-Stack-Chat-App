import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {

    
    let token;

    // 1️⃣ Get token from cookies
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // 2️⃣ If token not found
    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Attach user to request object (excluding password)
    req.user = await User.findById(decoded.userId).select("-passwordHash");

    // 5️⃣ Move to next middleware/route
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
