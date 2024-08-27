import { Response, Request } from "express";
import CartItemModel from "../../models/Cart";
import ProductModel from "../../models/Products";
import UserModel from "../../models/User";

const postInCart = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { productId, quantity, color, size, state } = req.body;

  if (!userId || !productId) {
    res.status(400).json({ message: "No userId and ProductId" });
  }
  try {
    const user = await UserModel.findByPk(userId);
    const product: any = await ProductModel.findByPk(productId);
    if (!user || !product) {
      return res.status(404).json({ error: "User or Product not found" });
    }
    const selectedColor = product.colors.find((c:any) => c.color === color);
    if (!selectedColor) {
      return res.status(400).json({ error: "Color not found in product" });
    }
    const selectedSize = selectedColor.sizes.find((s:any) => s.size === size);
    if (!selectedSize) {
      return res.status(400).json({ error: "Size not found in color" });
    }
    const cartItem = await CartItemModel.create({
      userId,
      productId,
      quantity,
      color,
      size,
      state,
    });
    res.status(201).json(cartItem)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
}
};

export default postInCart;
