import { setLogin } from "@/lib/slices/userReducer";
import axios from "axios";
import { Server } from "@/helpers/server";
import Swal from "sweetalert2";
import { Dispatch } from "@reduxjs/toolkit";

interface LoginData {
  email: string;
  password: string;
}

const loginFunction =
  ({ email, password }: LoginData) =>
  async (dispatch: Dispatch) => {
    try {
      const loginData = await axios.post(`${Server}/login`, {
        email,
        password,
      });
      const login = loginData.data;
      const status = loginData.status;

      if (status === 200) {
        dispatch(setLogin(login));
        return { success: true, user: login.user };
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

export default loginFunction;
