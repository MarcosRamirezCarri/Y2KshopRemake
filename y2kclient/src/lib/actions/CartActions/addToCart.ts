import { saveToCart } from "@/lib/slices/cartReducer";
import { Server } from "@/helpers/server";
import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";


const addToCart = (cart: any) => async(dispatch: Dispatch) =>{
    const {userId, productId, quantity, color, size } = cart
    const state = 'inCart';
    try {
       const data = await axios.post(`${Server}/cart/${userId}/add`, {productId, quantity, color, size, state});
       const savedCart = data.data
       dispatch(saveToCart(savedCart))
    } catch (error) {
           if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Error desconocido:", error);
      }
    }
}; 

export default addToCart;