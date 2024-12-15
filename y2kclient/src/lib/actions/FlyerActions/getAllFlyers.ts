import axios from "axios";
import { Server } from "@/helpers/services/server";
import { Dispatch } from "@reduxjs/toolkit";
import { setAllFlyers } from "@/lib/slices/flyersReducer";

export const getAllFlyers = () => async (dispatch: Dispatch) => {
  try {
    const data = await axios.get(`${Server}/flyer`);
    const dataFlyer = data.data;
    const status = data.status;

    if (status === 200) {
      dispatch(setAllFlyers(dataFlyer));
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Error desconocido:", error);
    }
  }
};
