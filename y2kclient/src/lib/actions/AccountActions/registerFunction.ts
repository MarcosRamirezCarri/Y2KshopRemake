import { registerAccount } from "@/lib/slices/userReducer";
import axios from "axios";
import { Server } from "@/helpers/services/server";
import { AccountType } from "@/helpers/types/Account";
import { Dispatch } from "@reduxjs/toolkit";


const registerFunction =
  ({ name, password, email, phone, location, admin }: AccountType) =>
  async (dispatch: Dispatch) => {
    try {
      const register = await axios.post(`${Server}/register`, {
        name,
        password,
        email,
        phone,
        admin,
        location
      });
      const data = register.data;
      const status = data.status;

      if (status === 201) {
        dispatch(registerAccount(data));
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

export default registerFunction;
