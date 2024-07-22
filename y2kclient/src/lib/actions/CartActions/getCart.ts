import { saveToCart } from "@/lib/slices/cartReducer";
import axios from "axios";
import { Server } from "@/helpers/server";
import { Dispatch } from "@reduxjs/toolkit";

const getCartFromId = (userId: number) => async (dispatch: Dispatch) => {
  try {
    const cart = await axios.get(`${Server}/cart/${userId}`);
    const cartData = cart.data;

    dispatch(saveToCart(cartData));
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Error desconocido:", error);
    }
  }
};

export default getCartFromId;
