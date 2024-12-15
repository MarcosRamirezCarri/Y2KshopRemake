import FlyerModel from "../../models/Flyers";
import { Request, Response } from "express";

export const getFlyers = async(req: Request, res: Response) => {
  try {
    const Flyers = await FlyerModel.findAll();
    console.log(Flyers)
    res.status(200).json(Flyers);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

