import { Dispatch } from "@reduxjs/toolkit";
import { modifyCartItem } from "@/lib/slices/cartReducer";
import axios from "axios";
import { Server } from "@/helpers/services/server";

export const modifyCart =
  (color: string, size: string, itemId: number, userId: number) =>
  async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const data = await axios.put(
        `${Server}/cart/${userId}/modify/${itemId}`,
        { size, color }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const modifiedItem = data.data;
      const status = data.status;

      if (status === 201) {
        dispatch(modifyCartItem(modifiedItem));
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


