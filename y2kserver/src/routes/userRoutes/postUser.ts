import UserModel from "../../models/User";
import Validate from "./Validator/ValidatorUser";
import { Request, Response } from "express";

const postUser = async (req: Request, res: Response) => {
  const { password, email, phone, name } = req.body;
  try {
    const errors = await Validate(name, email, phone, password);
    if (errors.length > 0) {
      res.status(400).json({ errors });
    }
    const newUser = UserModel.create({ password, email, name, phone });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Algo salió mal' });
  }
};


export default postUser;
