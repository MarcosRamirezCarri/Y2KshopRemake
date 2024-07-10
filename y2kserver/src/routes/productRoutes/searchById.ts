import { Response, Request } from "express";
import ProductModel from "../../models/Products";

interface ProductFilterType {
    idProduct?: number;
}

const searchById = async (req: Request, res: Response) => {
  const { idProduct } = req.params as ProductFilterType;

  if (!idProduct) {
    return res
      .status(400)
      .json({ error: "id parameter is required and must be a number" });
  }

  try {
    const products: any[] = await ProductModel.findAll();

    const filteredProducts = products.filter(
      (product) => product.id === idProduct
    );

    if (filteredProducts.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(filteredProducts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default searchById;
