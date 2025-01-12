import { Server } from "@/helpers/services/server";
import axios from "axios";
import { Product } from "@/helpers/types/Types";

export const getProductDetail = async (productId: number) => {
  try {
    const data = await axios.get(`${Server}/product/${productId}`);
    const detail: Product = data.data;
    const status = data.status;

    if (status === 200) {
      return { detail, success: true };
    }
  } catch (error: any) {
    console.error("Error fetching product data:", error.message);
  }
};
