import { Dispatch } from "@reduxjs/toolkit";
import { deleteFromCart } from "@/lib/slices/cartReducer";
import axios from "axios";
import { Server } from "@/helpers/services/server";

export const deleteCartItem =
  (userId: number, id: number) => async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const data = await axios.delete(`${Server}/cart/${userId}/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const status = data.status;
      if (status === 204) {
        dispatch(deleteFromCart(id));
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


