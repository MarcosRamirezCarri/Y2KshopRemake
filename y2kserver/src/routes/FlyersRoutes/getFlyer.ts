import FlyerModel from "../../models/Flyers";
import { Request, Response } from "express";

const getFlyers = (req: Request, res: Response) => {
  try {
    const Flyers = FlyerModel.findAll();
    res.status(201).json(Flyers);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default getFlyers;