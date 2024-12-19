import { Server } from "@/helpers/services/server";
import axios from "axios";
import {Product} from "@/helpers/types/Types";

export const createProduct = (product: Product) => async () => {
  const { name, price, colors, clasification, images, description } = product;
  try {
    const token = localStorage.getItem("token")
    const data = await axios.post(`${Server}/product`, {
      name,
      price,
      colors,
      clasification,
      images,
      description,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const posted = data.status;
    if (posted == 201) {
      return { success: true };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return { success: false, message: error.message };
    } else {
      console.log("Error desconocido:", error);
      return { success: false, message: "Error desconocido" };
    }
  }
};

