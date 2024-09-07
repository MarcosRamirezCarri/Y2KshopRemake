import { Dispatch } from "@reduxjs/toolkit";
import { Server } from "@/helpers/server";
import axios from "axios";

const deleteProduct = (idProduct: number) => (dispatch: Dispatch) =>{
    try {
        const deletedProd = axios.delete(`${Server}/product/delete`, {idProduct})
        
    } catch (error) {
        
    }

}