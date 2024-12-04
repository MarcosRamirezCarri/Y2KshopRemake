import { Response, Request } from "express";
import CartItemModel from "../../models/Cart";
import UserModel from "../../models/User";
import ProductModel from "../../models/Products";

export const addToHistoryItem = async (req: Request, res: Response) => {
  const { userId, itemId, newState, lastUpdate } = req.body;

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

    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }

    const product: any = await ProductModel.findByPk(cartItem.productId);

    if (product === null) {
      return res.status(404).json({ message: "Product not found" });
    }


    if (newState === "cancel") {
      const updatedHistory = user.history.filter(
        (item: any) => item.itemId !== itemId
      );

      user.history = updatedHistory;
      await user.save();
      await cartItem.destroy();

      return res.status(204).send();
    }

    let updatedColors = [...product.colors];
    if (newState === "pending") {
      const colorToUpdate = product.colors.find(
        (color: any) => color.color === cartItem.color
      );
      const indexColor = product.colors.findIndex(
        (color: any) => color.color === cartItem.color
      );

      if (!colorToUpdate) {
        return res.status(404).json({ message: "Color not found in product" });
      }

      const sizeToUpdate = colorToUpdate.sizes.findIndex(
        (size: any) => size.size === cartItem.size
      );

      if (sizeToUpdate === -1) {
        return res.status(404).json({ message: "Size not found in product" });
      }

      const sizeObjToUpdate = colorToUpdate.sizes[sizeToUpdate];

      if (sizeObjToUpdate.quantity <= 0) {
        return res.status(400).json({ message: "Insufficient stock" });
      }

      updatedColors[indexColor].sizes[sizeToUpdate] = {
        ...updatedColors[indexColor].sizes[sizeToUpdate],
        quantity: updatedColors[indexColor].sizes[sizeToUpdate].quantity - 1,
      };

      product.colors = updatedColors;

      await ProductModel.update(
        { colors: updatedColors }, 
        { where: { id: cartItem.productId } }
      );
    }

    const existingItemIndex = user.history.findIndex(
      (item: any) => item.itemId === itemId
    );

    let updatedHistory;
    if (existingItemIndex !== -1) {
      updatedHistory = user.history.map((item: any) =>
        item.itemId === itemId ? { ...item, state: newState } : item
      );
    } else {
      const itemToSave = {
        itemId: itemId,
        name: product.name,
        images: product.images,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        color: cartItem.color,
        size: cartItem.size,
        state: newState,
        lastUpdate: lastUpdate,
      };

      updatedHistory = [...user.history, itemToSave];
    }

    user.history = updatedHistory;

    cartItem.lastUpdate = lastUpdate;
    cartItem.state = newState;

   
   

    await user.save();
    await cartItem.save();
   

    res.status(200).json(cartItem);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
