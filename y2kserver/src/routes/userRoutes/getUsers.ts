import UserModel from "../../models/User";
import { Response, Request } from "express";

const getUsers = async (req: Request, res: Response) => {
    try {
        const products = await UserModel.findAll();
        res.status(201).json(products);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export default getUsers;