import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET: any = process.env.SECRET_JWT;

interface AuthRequest extends Request {
  user?: { userId: number; email: string };
}

const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: number;
      email: string;
    };
    req.user = decoded;

    next();
  } catch (error: any) {
    console.log(error.message);
    res.status(401).json({ error: "Invalid token" });
  }
};

export default authenticateToken;
