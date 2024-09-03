import { Response, Request } from "express";
import FlyerModel from "../../models/Flyers";

const PostFlyer = (req: Request, res: Response) => {
  const { name, image } = req.body;

  if (typeof name !== "string" || name.trim() === "") {
    return res
      .status(401)
      .json({ message: "The name need exist and must be a string" });
  }
  if (typeof image !== "string" || image.trim() === "") {
    return res
      .status(401)
      .json({ message: "The image need exist and must be a string" });
  }
  try {
    const Flyer = FlyerModel.create({
      name,
      image,
    });
    res.status(201).json({ Flyer });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default PostFlyer;