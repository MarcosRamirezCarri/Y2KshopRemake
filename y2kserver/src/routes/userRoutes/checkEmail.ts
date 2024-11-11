import UserModel from "../../models/User";
import { Request, Response } from "express";

export const checkEmail = async (req: Request, res: Response) => {
  const { emailuser } = req.query;
  if (!emailuser) {
    res.status(400).json({ message: "No Email" });
  }
  try {
    const user = await UserModel.findOne({ where: { email: emailuser } });

    if (user !== null) {
      return res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
