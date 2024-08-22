import ProductModel from "../../models/Products";
import { Response, Request } from "express";

const postProduct = async (req: Request, res: Response) => {
  const { name, price, colors, clasification, images, description } = req.body;

  const errors: string[] = [];
  console.log(name, price, colors, clasification, images, description)


  if (typeof name !== "string" || name.trim() === "") {
    errors.push("El nombre es requerido y debe ser una cadena de texto.");
  }

  if (typeof price !== "number" || price <= 0) {
    errors.push("El precio debe ser un número mayor a 0.");
  }

  if (!Array.isArray(images) || images.length === 0) {
    errors.push("Debe proporcionar al menos una imagen.");
  } else {
    images.forEach((image: any, index: number) => {
      if (typeof image !== "string" || image.trim() === "") {
        errors.push(`La imagen en la posición ${index + 1} no es válida.`);
      }
    });
  }

  if (typeof clasification !== "string" || clasification.trim() === "") {
    errors.push(
      "La clasificación es requerida y debe ser una cadena de texto."
    );
  }

  if (!Array.isArray(colors) || colors.length === 0) {
    errors.push("Debe proporcionar al menos un color.");
  } else {
    colors.forEach((color: any, colorIndex: number) => {
      if (typeof color.color !== "string" || color.color.trim() === "") {
        errors.push(`El color en la posición ${colorIndex + 1} no es válido.`);
      }

      if (!Array.isArray(color.sizes) || color.sizes.length === 0) {
        errors.push(
          `El color en la posición ${
            colorIndex + 1
          } debe tener al menos una talla.`
        );
      } else {
        color.sizes.forEach((size: any, sizeIndex: number) => {
          if (typeof size.size !== "string" || size.size.trim() === "") {
            errors.push(
              `La talla en la posición ${sizeIndex + 1} del color ${
                colorIndex + 1
              } no es válida.`
            );
          }
        });
      }
    });
}
  if (errors.length > 0) {
    return res.status(400).json( errors );
  }
  
  try {
    const product = ProductModel.create({
      name,
      price,
      colors,
      clasification,
      images,
      description,
    });
    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export default postProduct;
