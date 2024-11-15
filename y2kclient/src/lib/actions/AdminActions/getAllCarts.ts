import axios from "axios";
import { Server } from "@/helpers/server";
import { saveCarts } from "@/lib/slices/adminReducer";
import { Dispatch } from "@reduxjs/toolkit";

export const getAllCarts = () => async (dispatch: Dispatch) => {
  try {
    const data = await axios.get(`${Server}/cart`);
    const carts = data.data;
    const statusCarts = data.status;

    if (statusCarts === 201) {
      dispatch(saveCarts(carts));
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
