import ProductModel from "../../models/Products";
import { Request, Response } from "express";

const deleteProduct = async (req: Request, res: Response) => {
  const { idProduct } = req.params;
  try {
    if (!idProduct) {
      res.status(400).json({ message: "No idProduct" });
    }
    const product: any = await ProductModel.findOne({
      where: {
        id: idProduct,
      },
    });
    if (!product) {
      res.status(400).json({ message: "the item doesnt exists" });
    }
    await product.destroy();
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export default deleteProduct;