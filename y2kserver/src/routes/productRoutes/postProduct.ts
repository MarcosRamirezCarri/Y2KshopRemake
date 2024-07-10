import ProductModel from "../../models/Products";
import { Response, Request } from "express";

const postProduct = async(req: Request, res: Response) =>{
    const {name, price, sizes, colors, clasification, images} = req.body;
    try{
        const product = ProductModel.create({name, price, sizes, colors, clasification, images})
        res.status(201).json(product)
    }catch (error: any) {
        res.status(500).json({ error: error.message });
    }

}
export default postProduct