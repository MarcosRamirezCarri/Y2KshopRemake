import { Server } from "@/helpers/services/server";
import axios from "axios";
import {Product} from "@/helpers/types/Types";
import { modifyProduct } from "@/lib/slices/productsReducer";
import { Dispatch } from "@reduxjs/toolkit";

export const modProduct = (product: Product) => async (dispatch: Dispatch) => {
  const { price, colors, images, description, id } = product;
  try {
    const token = localStorage.getItem("token")
    const data = await axios.put(`${Server}/product/modify`, {
      id,
      price,
      colors,
      images,
      description,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const modProd = data.data;
    const status = data.status;
    if (status == 200) {
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



