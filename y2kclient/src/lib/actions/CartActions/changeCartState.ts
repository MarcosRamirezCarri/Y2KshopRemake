import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { formatDate } from "@/helpers/functions/formatDate";
import { Server } from "@/helpers/services/server";


const changeCartState =
  (userId: number, itemId: number, newState: string) =>
  async (dispatch: Dispatch) => {
   
    const date = new Date().toISOString();

    const lastUpdate = formatDate(date);
    
    try {
      const data = await axios.put(`${Server}/cart/update`, {
        userId,
        itemId,
        newState,
        lastUpdate
      });
      const status = data.status;

      if (status) {
      
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

export default changeCartState;
