import { Request, Response } from "express";
import UserModel from "../../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const SECRET: any = process.env.SECRET_JWT;



export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user: any = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    } else {
      const token = jwt.sign(
        { userId: user.id, email: user.email, admin: user.admin },
        SECRET,
        { expiresIn: "3h" }
      );
      const decoded = jwt.decode(token);
console.log("Decoded Token:", decoded);
      return res.status(200).json({ token, user });
    }
  } catch (error: any) {
    console.log(error.message)
    return res.status(500).json({ error: error.message });
  }
};


