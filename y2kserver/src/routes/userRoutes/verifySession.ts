import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET: string = process.env.SECRET_JWT || "";

export const verifySession = (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: number;
      email: string;
    };

    if (typeof decoded.userId !== "number" || isNaN(decoded.userId)) {
      return res.status(400).json({ success: false, message: "Invalid userId in token." });
    }

    return res.status(200).json({ success: true, userId: decoded.userId });
  } catch (error: any) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid token." });
  }
};