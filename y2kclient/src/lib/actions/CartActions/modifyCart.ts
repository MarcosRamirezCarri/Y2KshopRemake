import { Dispatch } from "@reduxjs/toolkit";
import { modifyCartItem } from "@/lib/slices/cartReducer";
import axios from "axios";
import { Server } from "@/helpers/server";

const modifyCart =
  (color: string, size: string, itemId:number, userId:number) => async(dispatch: Dispatch) => {
    try {
        const modItem = await axios.put(`${Server}/cart/${userId}/modify/${itemId}`, {size, color})
        
        const modifiedItem = modItem.data;
        
        if(modifiedItem){
            dispatch(modifyCartItem(modifiedItem))
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

  export default modifyCart;