import axios from "axios";
import { Server } from "@/helpers/services/server";
import { Dispatch } from "@reduxjs/toolkit";
import { modifyFlyers } from "@/lib/slices/flyersReducer";

export const modifyFlyer =
  (id: number, status: boolean) => async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token")
      const data = await axios.put(`${Server}/flyer/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const dataFlyer = data.data;
      const statusFlyer = data.status;

      if (statusFlyer === 200) {
        dispatch(modifyFlyers(dataFlyer));
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
