import { Server } from "@/helpers/services/server";
import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { setAdminUser } from "@/lib/slices/adminReducer";

export const changeToAdmin =
  (userId: number, admin: boolean) => async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const data = await axios.put(
        `${Server}/user`,
        { userId, admin },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const changed = data.data;
      const statChanged = data.status;

      if (statChanged === 200) {
        dispatch(setAdminUser(changed));
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

