import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { Server } from "@/helpers/server";
import { modifyCartItem } from "@/lib/slices/cartReducer";

const buyAndAddToHistory = (userId:number, itemId:number) => async(dispatch: Dispatch) =>{
    try {
        const data = await axios.put(`${Server}/cart/${userId}/${itemId}`);
        const status = data.status;
        const dataCart = data.data;

        if(status === 200){
            dispatch(modifyCartItem(dataCart));
            return { success: true };
        }
    } catch (error) {
        
    }

}