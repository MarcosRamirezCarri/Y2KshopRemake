import { saveToCart } from "@/lib/slices/cartReducer";
import { Dispatch } from "@reduxjs/toolkit";


const addToCart = (cart: any) => async(dispatch: Dispatch) =>{
    if (typeof cart === "object" && cart !== null){
        console.log('Se admitio el objeto', cart)
        dispatch(saveToCart(cart))
    }
    console.log('No se admitio o no entro a la funcion')
}; 

export default addToCart;