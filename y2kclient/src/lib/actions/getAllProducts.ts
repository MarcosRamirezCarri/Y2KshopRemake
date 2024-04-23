import { setShirts } from "../slices/productsReducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Server } from "@/helpers/server";
import { getSizesForCategory } from "@/helpers/functions";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

interface Shirt {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const getAllProducts = () => async (Dispatch: Dispatch) => {
  try {
    const { data } = await axios.get<Shirt[]>(`${Server}/products`);
    const shirtsWithShortenedTitles = data.map((shirt) => ({
      ...shirt,

      title:
        shirt.title.length > 10
          ? `${shirt.title.substring(0, 10)}...`
          : shirt.title,
      sizes: getSizesForCategory(shirt.category),
    }));

    Dispatch(setShirts(shirtsWithShortenedTitles));
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Error desconocido:", error);
    }
  }
};
