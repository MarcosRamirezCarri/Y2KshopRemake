import { setFromId } from "@/lib/slices/userReducer";
import axios from "axios";
import { Server } from "@/helpers/services/server";
import { Dispatch } from "@reduxjs/toolkit";




const setUserFromId = ( userId: number ) => async (dispatch: Dispatch) => {
    try {
      const user = await axios.get(`${Server}/user/${userId}` )
      const userData = user.data;

      dispatch(setFromId(userData));
      
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Error desconocido:", error);
      }
    }
  };

export default setUserFromId;
