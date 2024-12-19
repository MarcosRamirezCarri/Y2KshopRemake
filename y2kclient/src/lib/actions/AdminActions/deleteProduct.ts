import { Dispatch } from "@reduxjs/toolkit";
import { Server } from "@/helpers/services/server";
import { deleteProd } from "@/lib/slices/productsReducer";
import axios from "axios";

export const deleteProduct =
  (idProduct: number) => async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const deletedProd = await axios.delete(
        `${Server}/product/delete/${idProduct}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const deleted = deletedProd.status;

      if (deleted == 204) {
        dispatch(deleteProd(idProduct));
        return { success: true };
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return { success: false, message: error.message };
      } else {
        console.log("Error desconocido:", error);
        return { success: false, message: "Error desconocido" };
      }
    }
  };
