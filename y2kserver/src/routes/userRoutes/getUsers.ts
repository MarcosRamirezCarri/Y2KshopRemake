import UserModel from "../../models/User";
import { Response, Request } from "express";

const getUsers = async (req: Request, res: Response) => {
    try {
        const products = await UserModel.findAll();
        res.status(201).json(products);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export default getUsers;