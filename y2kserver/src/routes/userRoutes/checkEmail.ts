import UserModel from "../../models/User";
import { Request, Response } from "express";

export const checkEmail = async (req: Request, res: Response) => {
  const { emailuser } = req.params;
  if (!emailuser) {
   return res.status(400).json({ message: "No Email" });
  }
  try {
    const user = await UserModel.findOne({ where: { email: emailuser } });

    if (user !== null) {
      return res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error: any) {

    res.status(500).json({ error: error.message });
  }
};
