import ProductModel from "../../models/Products";
import { controlColors } from "./controllers/controlColors";
import { controlProduct } from "./controllers/controlProduct";
import { Response, Request } from "express";

export const postProduct = async (req: Request, res: Response) => {
  const { name, price, colors, clasification, images, description } = req.body;

  const errorsProduct = await controlProduct(
    name,
    images,
    price,
    clasification,
    description
  );

  const hasErrorProduct = Object.values(errorsProduct).some(
    (error) => error !== ""
  );
  if (hasErrorProduct) {
    return res.status(400).json({ errorsProduct });
  }

  const errorsColors = await controlColors(colors);
  const hasErrorColors = Object.values(errorsColors).some(
    (error) => error !== ""
  );

  if (hasErrorColors) {
    return res.status(400).json({ errorsColors });
  }
  try {
    const product = ProductModel.create({
      name,
      price,
      colors,
      clasification,
      images,
      description,
    });
    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
