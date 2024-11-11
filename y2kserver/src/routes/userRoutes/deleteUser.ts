import UserModel from "../../models/User";
import { Request, Response } from "express";

export const deleteUser  = async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId) {
    res.status(400).json({ message: "No Userid" });
  }
  try {
  
    const user: any = await UserModel.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      res.status(400).json({ message: "the user doesnt exists" });
    } else{
      await user.destroy();
      res.status(204).send();
    }
   
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

