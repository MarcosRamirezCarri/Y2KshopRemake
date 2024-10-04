import { Server } from "@/helpers/server";
import axios from "axios";
import Product from '@/helpers/Types';
import addDescription from "@/helpers/functions";

const fetchProduct = async (productId: any) => {
    try {
      const  data  = await axios.get<Product>(
        `${Server}/product/${productId}`
      );
      const detail = data.data

      const formatedProduct = [];
      formatedProduct.push(data);

     return detail;
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  export default fetchProduct;