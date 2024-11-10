import { Response, Request } from "express";
import CartItemModel from "../../models/Cart";
import UserModel from "../../models/User";

export const addToHistoryItem = async (req: Request, res: Response) => {
  const {userId , itemId, newState } = req.body;
  console.log(userId, itemId, newState)
  if (!userId || !itemId || !newState) {
   res.status(400).json({ message: "No Userid or idProduct or State" });
  }
  try {

    const cartItem: any = await CartItemModel.findOne({
      where: {
        id: itemId,
        userId,
      },
    });

    if (cartItem === null) {
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
  

        user.history = [...user.history, ...itemsToSave];
        cartItem.state = newState;

        await user.save();
        await cartItem.save();

        res.status(200).json({cartItem});
      }
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
