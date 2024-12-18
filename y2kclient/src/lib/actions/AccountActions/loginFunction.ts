import { setLogin } from "@/lib/slices/userReducer";
import axios from "axios";
import { Server } from "@/helpers/services/server";
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
      const token = login.token


      if (status === 200) {
        dispatch(setLogin(login));
        document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24}; Secure; SameSite=Strict`;

        console.log(document.cookie)
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
