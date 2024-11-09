import UserModel from "../../models/User";
import Validate from "./Validator/ValidatorUser";
import { Request, Response } from "express";

export const postUser = async (req: Request, res: Response) => {
  const { password, email, phone, name, admin } = req.body;

  console.log(password, email, phone, name, admin)
  try {
    const errors = await Validate(name, email, phone, password);
    if (errors.length > 0) {
      res.status(400).json({ errors });
    }
    const newUser = UserModel.create({ password, email, name, phone, admin });
    res.status(201).json(newUser);
  }catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};




