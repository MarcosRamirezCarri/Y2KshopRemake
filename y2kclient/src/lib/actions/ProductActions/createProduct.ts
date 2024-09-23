import { Server } from "@/helpers/server";
import axios from "axios";
import Product from "@/helpers/Types";

const createProduct = (product: Product) => async () => {
  const { name, price, colors, clasification, images, description } = product;
  try {
    const data = await axios.post(`${Server}/product`, {
      name,
      price,
      colors,
      clasification,
      images,
      description,
    });
    const posted = data.status;
    if (posted == 201) {
      return { success: true };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Error desconocido:", error);
    }
  }
};

export default createProduct;
