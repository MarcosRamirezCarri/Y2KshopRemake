import axios from "axios";
import { Server } from "@/helpers/server";
import { saveUsers } from "@/lib/slices/adminReducer";
import { Dispatch } from "@reduxjs/toolkit";

const getAllUsers = () => async (dispatch: Dispatch) => {
  try {
    const data = await axios.get(`${Server}/user`);
    const users = data.data;
    const statusUser = data.status;

    if (statusUser === 201) {
      dispatch(saveUsers(users));
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

export default getAllUsers;