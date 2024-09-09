import { Response, Request } from "express";
import CartItemModel from "../../models/Cart";
import UserModel from "../../models/User";

const addToHistoryItem = async (req: Request, res: Response) => {
  const { userId, productId } = req.params;
  if (!userId || !productId) {
    res.status(400).json({ message: "No Userid or idProduct" });
  }
  try {
  
    const cartItem: any = await CartItemModel.findOne({
      where: {
        id: productId,
        userId,
      },
    });
    if (!cartItem) {
      res.status(400).json({ message: "the item doesnt exists" });
    }
    const user: any = await UserModel.findByPk(userId);

    if (user && cartItem.length > 0) {
      const itemsToSave = cartItem.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
      }));

      user.history = [...user.history, ...itemsToSave];

      await user.save();

      await CartItemModel.destroy({ where: { userId } });
    }
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
};
