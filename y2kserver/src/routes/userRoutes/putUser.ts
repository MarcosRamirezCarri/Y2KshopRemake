import UserModel from "../../models/User";
import { Response, Request } from "express";



export const putUser = async (req: Request, res: Response) => {

  const { name, password, email, phone, admin, userId } = req.body;


  try {
    
    const user: any = await UserModel.findByPk(userId);

    if (user === null) {
      return res.status(404).json({ error: "User not found" });
    } else{
      if (name !== undefined) user.name = name;
      if (password !== undefined) user.price = password;
      if (email !== undefined) user.email = email;
      if (phone !== undefined) user.phone = phone;
      if (admin !== undefined) user.admin = admin;
  
      await user.save();
  
      res.status(200).json(user);
    }

 
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

