import ProductModel from "../../models/Products";
import { Response, Request } from "express";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.findAll();
        res.status(201).json(products);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

