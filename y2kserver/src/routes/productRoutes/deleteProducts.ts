import ProductModel from "../../models/Products";
import { Request, Response } from "express";

const deleteProduct = async (req: Request, res: Response) => {
  const { idProduct } = req.params;
  if (!idProduct) {
    res.status(400).json({ message: "No idProduct" });
  }
  try {
    const product: any = await ProductModel.findOne({
      where: {
        id: idProduct,
      },
    });
    if (product === null) {
      return res.status(400).json({ message: "the item doesnt exists" });
    } else {
      await product.destroy();
      return res
        .status(204)
        .json({ message: `The item ${idProduct} was deleted` });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default deleteProduct;
