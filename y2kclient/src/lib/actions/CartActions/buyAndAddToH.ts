import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { Server } from "@/helpers/server";
import { modifyCartItem } from "@/lib/slices/cartReducer";

 const buyAndAddToHistory =
  (userId: number, itemId: number, newState: string) =>
  async (dispatch: Dispatch) => {
    try {

      const  data  = await axios.put(
        `${Server}/cart/update`,
        { userId, itemId, newState  }
      );
      const status = data.status;
      const dataCart = data.data;

      console.log(dataCart)

      dispatch(modifyCartItem(dataCart));
      return { success: true };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Error desconocido:", error);
      }
    }
  };

  export default buyAndAddToHistory