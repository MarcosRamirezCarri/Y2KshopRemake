import { registerAccount } from "@/lib/slices/userReducer";
import axios from "axios";
import { Server } from "@/helpers/server";
import AccountType from '../../../helpers/Types'
import { Dispatch } from "@reduxjs/toolkit";

const registerFunction = ({name, password, email, phone, admin}: AccountType) => async(dispatch: Dispatch) =>{
try {
const register = await axios.post(`${Server}/register`, {name, password, email, phone, admin})
 const data = register.data 
 
 dispatch(registerAccount(data))
} catch (error) {
    
}
} 
 