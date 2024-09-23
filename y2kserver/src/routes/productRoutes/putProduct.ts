import ProductModel from "../../models/Products";
import { Response, Request } from "express";
import Product from "../../routesTypes/Types";


const updateProduct = async (req: Request, res: Response) => {
  const { id, name, price, colors, clasification, images, description }: Partial<Product> = req.body;

  try {
    const product: any = await ProductModel.findByPk(id);

    if (product === null) {
      return res.status(404).json({ error: "Product not found" });
    }
      if (name !== undefined) product.name = name;
      if (price !== undefined) product.price = price;
      if (colors !== undefined) product.colors = colors;
      if (clasification !== undefined) product.clasification = clasification;
      if (images !== undefined) product.images = images;
      if (description !== undefined) product.description = description;
      await product.save();
  
      res.status(200).json(product);
    

    
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default updateProduct;