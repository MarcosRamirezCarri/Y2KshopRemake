import { Server } from "@/helpers/server";
import axios from "axios";
import Product from "@/helpers/Types";
import { modifyProduct } from "@/lib/slices/productsReducer";
import { Dispatch } from "@reduxjs/toolkit";

const modProduct = (product: Product) => async (dispatch: Dispatch) => {
  const { price, colors, images, description, id } = product;
  try {
    const data = await axios.put(`${Server}/product/modify`, {
      id,
      price,
      colors,
      images,
      description,
    });
    const modProd = data.data;
    const puted = data.status;
    if (puted == 200) {
      dispatch(modifyProduct(modProd));
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

export default modProduct;
