import CartItemModel from "../../models/Cart";
import { Response, Request } from "express";

export const getAllCarts = async (req: Request, res: Response) => {
    try {
        const Carts = await CartItemModel.findAll();
        res.status(201).json(Carts);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};