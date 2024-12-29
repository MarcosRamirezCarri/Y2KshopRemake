import { saveToCart } from "@/lib/slices/cartReducer";
import axios from "axios";
import { Server } from "@/helpers/services/server";
import { Dispatch } from "@reduxjs/toolkit";

export const getCartFromId = (userId: number) => async (dispatch: Dispatch) => {
  try {
    const token = localStorage.getItem("token")
    const data = await axios.get(`${Server}/cart/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const cartData = data.data;

    if(cartData){
      dispatch(saveToCart(cartData));
      return { success: true }
    }

    
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Error desconocido:", error);
    }
  }
};

