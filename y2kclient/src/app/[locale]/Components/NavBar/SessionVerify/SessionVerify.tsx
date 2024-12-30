"use client"
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks/hooks";
import {setUserFromId} from "@/lib/actions/AccountActions/getUserFromId";
import { verifySession } from "@/lib/actions/AccountActions/verifyUser";

const SessionVerify = () => {
  const dispatch = useAppDispatch();

  

  useEffect(() => {
    const verifyToken = async () => {
      const userId = localStorage.getItem("userId");
      const numberUserId =
        userId && !isNaN(Number(userId)) ? Number(userId) : null;
      const token = document.cookie.slice(6);

      if (token) {
        try {
          const response = await verifySession(token)
          if (response.success) {
            console.log("User verified successfully");
            if (numberUserId) {
              dispatch(setUserFromId(numberUserId));
            }
          } else {
            console.warn("Invalid token, clearing localStorage");
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
           
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          localStorage.clear();
 
        }
      } 
    };

    verifyToken();
  }, []);
 
  return(
    <div className="absolute"></div>
  )

};

export default SessionVerify;