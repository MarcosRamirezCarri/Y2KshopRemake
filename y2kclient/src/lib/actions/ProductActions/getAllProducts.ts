import { setShirts } from "../../slices/productsReducer";
import { Server } from "@/helpers/server";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = () => async (Dispatch: Dispatch) => {
  try {
    const data = await axios.get(`${Server}/product`);
    const products = data.data;
    const status = data.status;
    if (status === 201) {
      Dispatch(setShirts(products));
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
