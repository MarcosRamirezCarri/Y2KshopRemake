import { setShirts } from "../slices/shirtsReducer";
import { Server } from "@/helpers/server";
import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";

export const getAllProducts = async(dispatch: Dispatch)  => {
    try {
        const { data } = await axios.get(`${Server}/products`);
        dispatch(setShirts(data));
      } catch (error) {
        if (error instanceof Error) {
            console.log(error.message); 
          } else {
            console.log('Error desconocido:', error); 
          }
    }
}
