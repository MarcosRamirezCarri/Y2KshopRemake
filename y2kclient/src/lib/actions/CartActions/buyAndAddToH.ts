import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { Server } from "@/helpers/server";
import { modifyCartItem } from "@/lib/slices/cartReducer";

export const buyAndAddToHistory = (userId:number, itemId:number, state: string) => async(dispatch: Dispatch) =>{
    try {
        
        const data = await axios.put(`${Server}/cart/${userId}/${itemId}`, { state });
        const status = data.status;
        const dataCart = data.data;

        if( dataCart ){
            dispatch(modifyCartItem(dataCart));
            return { success: true };
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
          } else {
            console.log("Error desconocido:", error);
          }
    }

}
