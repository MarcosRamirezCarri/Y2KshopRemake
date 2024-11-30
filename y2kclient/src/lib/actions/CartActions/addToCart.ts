import { saveToCart } from "@/lib/slices/cartReducer";
import { Server } from "@/helpers/server";
import { formatDate } from "@/helpers/formatDate";
import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";

const addToCart = (cart: any) => async (dispatch: Dispatch) => {
  const { userId, productId, quantity, color, size } = cart;
  const state = "inCart";
  try {
    const date = new Date().toISOString();

    const lastUpdate = formatDate(date);
    console.log(lastUpdate)
    const data = await axios.post(`${Server}/cart/${userId}/add`, {
      productId,
      quantity,
      color,
      size,
      state,
      lastUpdate
    });
    const savedCart = data.data;
    const status = data.status;
    if (status === 201) {
      dispatch(saveToCart(savedCart));
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

export default addToCart;
