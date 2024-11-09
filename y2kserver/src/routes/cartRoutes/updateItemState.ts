import { Response, Request } from "express";
import CartItemModel from "../../models/Cart";
import UserModel from "../../models/User";

export const addToHistoryItem = async (req: Request, res: Response) => {
  const { userId, itemId } = req.params;
  const { newState } = req.body;
  if (!userId || !itemId) {
    return res.status(400).json({ message: "No Userid or idProduct" });
  }
  try {
    const cartItem: any = await CartItemModel.findOne({
      where: {
        id: itemId,
        userId,
      },
    });
    if (!cartItem) {
      return res.status(400).json({ message: "the item doesnt exists" });
    } else {
      const user: any = await UserModel.findByPk(userId);

      if (user && cartItem.length > 0) {
        const itemsToSave = cartItem.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
          state: item.state,
        }));
        console.log(cartItem,  user)

        user.history = [...user.history, ...itemsToSave];
        cartItem.state = newState;

        await user.save();
        await cartItem.save();
      }
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
