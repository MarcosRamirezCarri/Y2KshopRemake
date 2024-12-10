import axios from "axios";
import { Server } from "@/helpers/services/server";

export const checkEmailExists = async (emailuser: string) => {
  try {
    if (emailuser) {
      const data = await axios.get(`${Server}/user/checkemail/${emailuser}`);

      if (data.data.exists) {
        return data.data.exists;
      } else {
        return false;
      }
    }
  } catch (error: any) {
    console.log("Error checking email:", error.message);
    return false;
  }
};
