import { Dispatch } from "@reduxjs/toolkit";
import { Server } from "@/helpers/services/server";
import axios from "axios";

export const deleteFlyer =
  (idFlyer: number) => async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const deletedProd = await axios.delete(
        `${Server}/flyer/delete/${idFlyer}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const deleted = deletedProd.status;

      if (deleted == 204) {
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
