import { Request, Response } from "express";
import CartItemModel from "../../models/Cart";
import ProductModel from "../../models/Products";

export const getCartItems = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ message: "No user id" });
  }

  try {
    const cartItems = await CartItemModel.findAll({
      where: { userId: userId},
      include: [ProductModel],
    });

    if (!cartItems) {
      res.status(400).json({ message: "No items in this cart" });
    } else {
      res.status(201).json( cartItems );
    }
  
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


