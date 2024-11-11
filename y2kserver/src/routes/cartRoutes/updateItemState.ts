import { Response, Request } from "express";
import CartItemModel from "../../models/Cart";
import UserModel from "../../models/User";

export const addToHistoryItem = async (req: Request, res: Response) => {
  const { userId, itemId, newState } = req.body;


  if (!userId || !itemId || !newState) {
    return res.status(400).json({ message: "No Userid, idProduct, or State" });
  }

  try {
    const cartItem: any = await CartItemModel.findOne({
      where: {
        id: itemId,
        userId: userId,
      },
    });

    if (cartItem === null) {
      return res.status(400).json({ message: "The item doesn't exist" });
    }

    const user: any = await UserModel.findByPk(userId);

    if (user !== null) {
  
      const itemToSave = {
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        color: cartItem.color,
        size: cartItem.size,
        state: newState,
      };

      user.history = [...user.history, itemToSave];

 
      cartItem.state = newState;

      await user.save();
      await cartItem.save();

      res.status(200).json(cartItem);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};