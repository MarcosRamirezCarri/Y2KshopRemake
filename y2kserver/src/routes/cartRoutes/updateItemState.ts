import { Response, Request } from "express";
import CartItemModel from "../../models/Cart";
import UserModel from "../../models/User";
import ProductModel from "../../models/Products";

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

    if (user === null) {
      return res.status(404).json({ message: "User not found" });
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

    const product: any = await ProductModel.findByPk(cartItem.productId);

    if (product === null) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Crear una copia del historial
    const existingItemIndex = user.history.findIndex(
      (item: any) => item.itemId === itemId
    );

    let updatedHistory;
    if (existingItemIndex !== -1) {
      // Actualizar el estado si el elemento ya existe
      updatedHistory = user.history.map((item: any) =>
        item.itemId === itemId ? { ...item, state: newState } : item
      );
    } else {
      // Agregar un nuevo elemento al historial
      const itemToSave = {
        itemId: itemId,
        name: product.name,
        images: product.images,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        color: cartItem.color,
        size: cartItem.size,
        state: newState,
      };

      updatedHistory = [...user.history, itemToSave];
    }

    // Actualizar el historial del usuario
    user.history = updatedHistory;

    // Actualizar el estado del carrito
    cartItem.state = newState;

    await user.save();
    await cartItem.save();

    res.status(200).json(cartItem);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};