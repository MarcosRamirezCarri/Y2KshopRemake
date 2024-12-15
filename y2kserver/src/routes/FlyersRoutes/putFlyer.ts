import { Response, Request } from "express";
import FlyerModel from "../../models/Flyers";

export const putFlyer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, type, status } = req.body;
  try {
    const flyer: any = await FlyerModel.findByPk(id);
    if (flyer === null) {
      return res.status(404).json({ error: "Flyer not found" });
    } else {
      if (name !== undefined) flyer.name = name;
      if (type !== undefined) flyer.type = type;
      if (status !== undefined) flyer.status = status;

      await flyer.save();

      res.status(200).json(flyer);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


