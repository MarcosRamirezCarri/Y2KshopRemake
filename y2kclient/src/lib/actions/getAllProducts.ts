import { setShirts } from "../slices/shirtsReducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Server } from "@/helpers/server";
import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";

interface Shirt {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,

}

export const getAllProducts = createAsyncThunk('shirts/GetShirts' ,  async()  => {
    try {
        const { data } = await axios.get<Shirt[]>(`${Server}/products`);
        console.log(data)
        
       return data;
      } catch (error) {
        if (error instanceof Error) {
            console.log(error.message); 
          } else {
            console.log('Error desconocido:', error); 
          }
    }
})
