import FlyerModel from "../../models/Flyers";
import { Request, Response } from "express";

export const deleteFlyer = async (req: Request, res: Response) => {
  const { flyerId } = req.params;
  if (!flyerId) {
    res.status(400).json({ message: "No idProduct" });
  }
  try {
    const flyer: any = await FlyerModel.findByPk(flyerId);
  
    if (flyer === null) {
      return res.status(400).json({ message: "the item doesnt exists" });
    } else {
      await flyer.destroy();
      return res
        .status(204)
        .json({ message: `The item ${flyerId} was deleted` });
    }
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({ error: error.message });
  }
};
