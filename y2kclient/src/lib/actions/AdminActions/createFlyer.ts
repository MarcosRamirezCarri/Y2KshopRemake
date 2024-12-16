import { Server } from "@/helpers/services/server";
import { FlyerType } from "@/helpers/types/FlyerType";
import axios from "axios";

export const createFlyer = (flyer: FlyerType) => async() => {
  const { name, image, type, status, text } = flyer;

  try {
    const data = await axios.post(`${Server}/flyer`, {
      name,
      image,
      type,
      status,
      text
    });
    const posted = data.status;
    if (posted === 201) {
      return { success: true };
    }
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Error desconocido:", error);
    }
  }
};
