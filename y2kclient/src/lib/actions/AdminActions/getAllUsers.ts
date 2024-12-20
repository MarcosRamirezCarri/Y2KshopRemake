import axios from "axios";
import { Server } from "@/helpers/services/server";
import { saveUsers } from "@/lib/slices/adminReducer";
import { Dispatch } from "@reduxjs/toolkit";

export const getAllUsers = () => async (dispatch: Dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.get(`${Server}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const users = data.data;
    const statusUser = data.status;
    console.log(users);
    if (statusUser === 201) {
      dispatch(saveUsers(users));
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
