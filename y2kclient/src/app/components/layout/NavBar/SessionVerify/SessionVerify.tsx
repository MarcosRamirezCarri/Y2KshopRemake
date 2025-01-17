"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { usePathname } from "next/navigation";
import { setUserFromId } from "@/lib/actions/AccountActions/getUserFromId";
import { verifySession } from "@/lib/actions/AccountActions/verifyUser";
import LoginModal from "@/app/components/ui/LoginModal/LoginModal";

const SessionVerify = () => {
  const [modal, setModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user: any = useAppSelector((state) => state.account.user);
  const path = usePathname();

  useEffect(() => {
    const verifyToken = async () => {
      const userId = localStorage.getItem("userId");
      const numberUserId =
        userId && !isNaN(Number(userId)) ? Number(userId) : null;
      const token = document.cookie.slice(6);

      if (token) {
        try {
          const response = await verifySession(token);
          if (response.success) {
            if (user.length === 0) {
              dispatch(setUserFromId(numberUserId));
            }
          } else {
            setModal(true);
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
          }
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
        }
      }
    };

    verifyToken();
  }, [modal, user.length, dispatch]);
  
  if (path === "/")
    return (
      <div className="absolute">
        <LoginModal modal={modal} />
      </div>
    );
};

export default SessionVerify;
