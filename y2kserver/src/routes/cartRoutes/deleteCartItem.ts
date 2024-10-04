import CartItemModel from "../../models/Cart";
import { Request, Response } from "express";

const deleteCartItem = async (req: Request, res: Response) => {
  const { userId, itemId } = req.params;
  if (!userId || !itemId) {
    res.status(400).json({ message: "No Userid or idProduct" });
  }
  try {
  
    const cartItem: any = await CartItemModel.findOne({
      where: {
        id: itemId,
        userId: userId,
      },
    });
    if (!cartItem) {
      res.status(400).json({ message: "the item doesnt exists" });
    } else {
      await cartItem.destroy();
      res.status(204).send(`deleted item from ${userId} with the id ${itemId}`);
    }
 
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default deleteCartItem;
