import UserModel from "../../models/User";
import { controllerUser } from "./controllers/controllerUser";
import { Request, Response } from "express";

export const postUser = async (req: Request, res: Response) => {
  const { password, email, location, phone, name, admin } = req.body;
  console.log(password, email, location, phone, name, admin); 

  try {

    const errors = await controllerUser(name, email, phone, password, location);
    if (errors.length > 0) {
      return res.status(400).json({ errors }); 
    }

    const newUser = await UserModel.create({ password, email, name, phone, location, admin });

    res.status(201).json(newUser);

  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: error.message }); 
  }
};


