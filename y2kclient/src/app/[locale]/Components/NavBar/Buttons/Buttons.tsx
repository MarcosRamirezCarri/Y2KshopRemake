"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import * as jose from "jose";
import setUserFromId from "@/lib/actions/AccountActions/getUserFromId";
import LoginModal from "../../LoginModal/LoginModal";
import { FaCartShopping } from "react-icons/fa6";
import { FaBagShopping } from "react-icons/fa6";
import { BsArchiveFill } from "react-icons/bs";
import { FaUserXmark } from "react-icons/fa6";
import { FaIdBadge } from "react-icons/fa";

const ButtonsNavBar = () => {
  const [stateButton, setStateButton] = useState<string>();
  const [modal, setModal] = useState<boolean>(false);
  const [stateUser, setStateUser] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.account.user);
  const path = usePathname();

  const secret = "y2k_project";

  useEffect(() => {
    const verifyToken = async () => {
      const token: any = localStorage.getItem("token");
      const id = localStorage.getItem("userId");
      const userId = Number(id);

      if (token) {
        try {
          const tokenFormated = String(token);
          const decoded = await jose.jwtVerify(
            tokenFormated,
            new TextEncoder().encode(secret)
          );
          if (decoded.payload?.userId) {
            setStateUser(true);
            dispatch(setUserFromId(userId));
            return true;
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            return false;
          }
        } catch (error: any) {
          console.log(error.message);
        }
      }
    };

    verifyToken();
  }, []);

  return (
    <div>
      <div className="gap-6 font-tiltneon text-gray-50   lg:gap-[5.8rem] flex flex-row">
        {user?.admin === true ? (
          <Link
            className="flex flex-col items-center justify-center active:text-Lightblue-300"
            onMouseLeave={() => setStateButton("none dash")}
            onMouseEnter={() => setStateButton("dash")}
            href={{ pathname: "/dashboard" }}
          >
            <button className=" flex flex-col text-2xl lg:text-3xl font-normal transition-all duration-300 hover:scale-105">
              <BsArchiveFill />
            </button>
            <span
              className={`absolute text-lg lg:text-[1.30rem]  justify-self-center bottom-1  p-2 font-bold justify-self-center transition-all duration-300 
           ${
             stateButton === "dash" || path === "/dashboard"
               ? "visible -translate-y-20 lg:translate-y-2 blur-none "
               : "translate-y-20 lg:-translate-y-2 blur-lg invisible"
           }`}
            >
              Dashboard
            </span>
          </Link>
        ) : null}

        <Link
          className="flex flex-col items-center justify-center active:text-Lightblue-300"
          onMouseLeave={() => setStateButton("none cart")}
          onMouseEnter={() => setStateButton("cart")}
          href={{ pathname: "/cart" }}
        >
          <button className="flex flex-col items-center justify-center text-2xl lg:text-3xl font-normal transition-all duration-300 hover:scale-105 ">
            <FaCartShopping />
          </button>

          <span
            className={`absolute text-lg lg:text-[1.40rem]  justify-self-center bottom-1 p-2 font-bold  justify-self-center transition-all duration-50 
           ${
             stateButton === "cart" || path === "/cart"
               ? "visible -translate-y-20 lg:translate-y-2 blur-none "
               : "translate-y-20 lg:-translate-y-2 blur-lg invisible"
           }`}
          >
            Cart
          </span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center active:text-Lightblue-300"
          onMouseEnter={() => setStateButton("product")}
          onMouseLeave={() => setStateButton("none prod")}
          href={{ pathname: "/products" }}
        >
          <button className="flex flex-col  text-2xl lg:text-3xl  font-normal transition-all duration-300 hover:scale-105">
            <FaBagShopping />
          </button>
          <span
            className={`absolute text-lg lg:text-[1.40rem]  justify-self-center bottom-1 p-2 font-bold justify-self-center transition-all duration-300 
           ${
             stateButton === "product" || path === "/products"
               ? "visible -translate-y-20 lg:translate-y-2 blur-none "
               : "translate-y-20 lg:-translate-y-2 blur-lg invisible"
           }`}
          >
            Buy
          </span>
        </Link>
        {stateUser ? (
          <Link
            className="flex flex-col items-center justify-center active:text-Lightblue-300"
            onMouseEnter={() => setStateButton("account")}
            onMouseLeave={() => setStateButton("none acc")}
            href={{ pathname: "/account" }}
          >
            <button className=" flex flex-col text-2xl lg:text-3xl  font-normal transition-all duration-300 hover:scale-105">
              <FaIdBadge />
            </button>
            <span
              className={`absolute text-md lg:text-[1.40rem]  justify-self-center bottom-1 p-2 font-bold justify-self-center transition-all duration-300 
           ${
             stateButton === "account" || path === "/account"
               ? "visible -translate-y-20 lg:translate-y-2 blur-none "
               : "translate-y-20 lg:-translate-y-2 blur-lg invisible"
           }`}
            >
              Account
            </span>
          </Link>
        ) : (
          <div
            className="flex flex-col items-center justify-center active:text-Lightblue-300"
            onMouseEnter={() => setStateButton("account")}
            onMouseLeave={() => setStateButton("none acc")}
            onClick={() => setModal(!modal)}
          >
            {" "}
            <button className=" flex flex-col pb-1  text-2xl lg:text-3xl font-normal transition-all duration-300 hover:scale-105">
              <FaUserXmark />
            </button>{" "}
            <span className="absolute invisible lg:visible lg:text-md   justify-self-center bottom-1  font-bold  justify-self-center transition-all duration-300   lg:-translate-y-2 lg:-translate-x-2  ">
              No Account
            </span>
            <span className="absolute text-md lg:text-[0.75rem]   justify-self-center bottom-1 p-2 font-bold   justify-self-center transition-all duration-300  lg:translate-y-2.5  lg:-translate-x-1">
              Sig In?
            </span>
          </div>
        )}
      </div>
      <LoginModal modal={modal} />
    </div>
  );
};

export default ButtonsNavBar;
