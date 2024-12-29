import { Server } from "@/helpers/services/server";
import axios from "axios";

const fetchProduct = async (productId: number) => {
  try {
    const data = await axios.get(`${Server}/product/${productId}`);
    const detail = data.data;

    const formatedProduct = [];
    formatedProduct.push(detail);

    return formatedProduct;
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
};

export default fetchProduct;
