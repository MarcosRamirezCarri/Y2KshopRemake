import { saveToCart } from "@/lib/slices/cartReducer";
import axios from "axios";
import { Server } from "@/helpers/services/server";
import { Dispatch } from "@reduxjs/toolkit";

const getCartFromId = (userId: number) => async (dispatch: Dispatch) => {
  try {
    const data = await axios.get(`${Server}/cart/${userId}`);
    const cartData = data.data;
    const status = data.status;

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

export default getCartFromId;
