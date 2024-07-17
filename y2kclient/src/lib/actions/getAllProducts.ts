import { setShirts } from "../slices/productsReducer";
import Product from "@/helpers/Types";
import { Server } from "@/helpers/server";
import  addDescription from "@/helpers/functions";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";



export const getAllProducts = () => async (Dispatch: Dispatch) => {
  try {
    const { data } = await axios.get(`${Server}/product`);

    const dataWithDesc = addDescription(data)

    Dispatch(setShirts(dataWithDesc))
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Error desconocido:", error);
    }
  }
};
