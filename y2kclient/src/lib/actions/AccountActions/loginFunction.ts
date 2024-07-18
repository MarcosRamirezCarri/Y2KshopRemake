import { setLogin } from "@/lib/slices/userReducer";
import axios from "axios";
import { Server } from "@/helpers/server";
import { Dispatch } from "@reduxjs/toolkit";

interface LoginData {
    email: string;
    password: string;
}

const loginFunction = ({email, password}: LoginData) => async(dispatch: Dispatch) =>{
try {
    const loginData = await axios.post(`${Server}/login`, {email, password})
    const login = loginData.data
    const {token} = login.token 
    localStorage.setItem('token', token )


    dispatch(setLogin(login))
    
} catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Error desconocido:", error);
      }
}
};

export default loginFunction;
 