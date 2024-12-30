import { Server } from "@/helpers/services/server";
import axios from "axios";

export const verifySession = async (token: string) => {
  try {
    
    const data = await axios.get(`${Server}/session`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const status = data.data.success;

    if (status) {
      return { success: true };
    }

    return { success: false, message: "Verification failed" };
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error en la verificación del token:", error.message);
      return { success: false, message: error.message };
    } else {
      console.log("Error desconocido:", error);
      return { success: false, message: "Error desconocido" };
    }
  }
};
