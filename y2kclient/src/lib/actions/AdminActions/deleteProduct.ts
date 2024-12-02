import { Dispatch } from "@reduxjs/toolkit";
import { Server } from "@/helpers/server";
import { deleteProd } from "@/lib/slices/productsReducer";
import axios from "axios";

const deleteProduct = (idProduct: number) => async (dispatch: Dispatch) => {
  try {
    const deletedProd = await axios.delete(
      `${Server}/product/delete/${idProduct}`
    );
    const deleted = deletedProd.status;
  

    if (deleted == 204) {
      dispatch(deleteProd(idProduct));
      return { succes: true };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Error desconocido:", error);
    }
  }
};

export default deleteProduct