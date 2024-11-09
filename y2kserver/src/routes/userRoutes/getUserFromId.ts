import { error } from "console";
import UserModel from "../../models/User";
import { Response, Request } from "express";

interface TypeUserId {
    userId?: number
}

export const getUserFromId = async (req: Request, res: Response) => {
const { userId } = req.params as TypeUserId

if (!userId) {
    return res
      .status(400)
      .json({ error: "id parameter is required and must be a number" });
  }
    try {
        const user = await UserModel.findByPk(userId);
     

        if(user === null){
            res.status(400).json({message: 'User not found'})
        } else {
            res.status(201).json(user);
        }

       
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

