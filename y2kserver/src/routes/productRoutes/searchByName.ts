import { Response, Request } from "express";
import ProductModel from "../../models/Products";

interface ProductFilterType {
    name?: string;
}

const searchByName = async (req: Request, res: Response) => {
    const { name } = req.query as ProductFilterType;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: "Name parameter is required and must be a string" });
    }

    try {
        const products: any[] = await ProductModel.findAll();

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(name.toLowerCase())
        );

        if (filteredProducts.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(filteredProducts);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export default searchByName;