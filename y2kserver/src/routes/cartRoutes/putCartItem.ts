import { Request, Response } from "express";
import CartItemModel from "../../models/Cart";

const putCartItem = async (req: Request, res: Response) => {
  const { userId, itemId } = req.params;
  const { color, size } = req.body;
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
    console.log('item carrito',cartItem)
    if (cartItem === null) {
      res.status(400).json({ message: "the item doesnt exists" });
    }else{
        if (color !== undefined && color !== null) {
            cartItem.color = color;
          }
      
          if (size !== undefined && size !== null) {
            cartItem.size = size;
          }
        await cartItem.save();
    
        res.status(201).json(cartItem);
    }
    
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({ error: error.message });
  }
};

export default putCartItem;
