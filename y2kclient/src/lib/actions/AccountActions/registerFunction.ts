import { registerAccount } from "@/lib/slices/userReducer";
import axios from "axios";
import { Server } from "@/helpers/server";
import { Dispatch } from "@reduxjs/toolkit";

interface AccountType {
    password: string;
    name: string;
    email: string;  
    phone: string;
    admin: boolean | null;
  }
  

const registerFunction = ({name, password, email, phone, admin}: AccountType) => async(dispatch: Dispatch) =>{
try {
const register = await axios.post(`${Server}/register`, {name, password, email, phone, admin})
 const data = register.data 
 
 dispatch(registerAccount(data))
} catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Error desconocido:", error);
      }
}
} 

export default registerFunction
 