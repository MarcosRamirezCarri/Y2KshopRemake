import CartItemModel from "../../models/Cart";
import { Request, Response } from "express";

const deleteCartItem = async (req: Request, res: Response) => {
  const { userId, idProduct } = req.params;
  try {
    if (!userId || !idProduct) {
      res.status(400).json({ message: "No Userid or idProduct" });
    }
    const cartItem: any = await CartItemModel.findOne({
      where: {
        id: idProduct,
        userId,
      },
    });
    if (!cartItem) {
      res.status(400).json({ message: "the item doesnt exists" });
    }
    await cartItem.destroy();
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default deleteCartItem;
