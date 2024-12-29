"use client"
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/hooks/hooks";
import LoginModal from "../../LoginModal/LoginModal";
import setUserFromId from "@/lib/actions/AccountActions/getUserFromId";

const SessionVerify = () => {
const [modal, setModal] = useState<boolean>(false)
  const dispatch = useAppDispatch();

  

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const numberUserId = userId && !isNaN(Number(userId)) ? Number(userId) : null;

      if (token) {
        try {
          const response = "jasdhnljkd"
          if (response.success) {
            console.log("User verified successfully");
            if (numberUserId) {
              dispatch(setUserFromId(numberUserId));
            }
          } else {
            console.warn("Invalid token, clearing localStorage");
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            setModal(true)

          }
        } catch (error) {
          console.error("Error verifying token:", error);
          localStorage.clear();
          setModal(true)
        }
      } else{
        setModal(true)
      }
    };

    verifyToken();
  }, []);
 
  return(
    <div className="absolute"></div>
  )

};

export default SessionVerify;