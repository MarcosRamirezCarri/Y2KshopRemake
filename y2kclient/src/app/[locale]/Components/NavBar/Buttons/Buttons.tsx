"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import LoginModal from "../../LoginModal/LoginModal";
import setUserFromId from "@/lib/actions/AccountActions/getUserFromId";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { FaCartShopping } from "react-icons/fa6";
import { FaBagShopping } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6";
import { FaIdBadge } from "react-icons/fa";

const ButtonsNavBar = () => {
  const [stateButton, setStateButton] = useState<string>();
  const [modal, setModal] = useState<boolean>(false);
  const path = usePathname();

  const dispatch = useAppDispatch();


  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id !== "undefined" || id !== null) {
      const userId = Number(id);
      dispatch(setUserFromId(userId));
    }
  }, []);

  const user = useAppSelector((state) => state.account.user);

  return (
    <div>
    <div className="gap-6 lg:gap-[5rem] flex flex-row">
      <Link
        className="flex flex-col items-center justify-center"
        onMouseLeave={() => setStateButton("none cart")}
        onMouseEnter={() => setStateButton("cart")}
        href={{ pathname: "/cart" }}
      >
        <button className="flex flex-col items-center justify-center font-titilium text-3xl lg:text-5xl text-pink-50 font-normal transition-all duration-300 hover:scale-105">
          <FaCartShopping />
        </button>

        <span
          className={`absolute text-lg lg:text-[1.50rem]  justify-self-center bottom-1 p-2 font-bold text-[#fef1f8] font-tiltneon [text-shadow:4px_2px_15px_#ffcbe8] justify-self-center transition-all duration-300 
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
        className="flex flex-col items-center justify-center"
        onMouseEnter={() => setStateButton("product")}
        onMouseLeave={() => setStateButton("none prod")}
        href={{ pathname: "/products" }}
      >
        <button className="flex flex-col font-titilium text-3xl lg:text-5xl text-pink-50 font-normal transition-all duration-300 hover:scale-105">
          <FaBagShopping />
        </button>
        <span
          className={`absolute text-lg lg:text-[1.50rem]  justify-self-center bottom-1 p-2 font-bold text-[#fef1f8] font-tiltneon [text-shadow:4px_2px_15px_#ffcbe8] justify-self-center transition-all duration-300 
           ${
             stateButton === "product" || path === "/products"
               ? "visible -translate-y-20 lg:translate-y-2 blur-none "
               : "translate-y-20 lg:-translate-y-2 blur-lg invisible"
           }`}
        >
          Buy
        </span>
      </Link>
      {user.length > 0 ? (
        <Link
          className="flex flex-col items-center justify-center"
          onMouseEnter={() => setStateButton("account")}
          onMouseLeave={() => setStateButton("none acc")}
          href={{ pathname: "/account" }}
        >
          <button className=" flex flex-col font-titilium text-3xl lg:text-5xl text-pink-50 font-normal transition-all duration-300 hover:scale-105">
            <FaIdBadge />
          </button>
          <span
            className={`absolute text-md lg:text-[1.50rem]  justify-self-center bottom-1 p-2 font-bold text-[#fef1f8] font-tiltneon [text-shadow:4px_2px_15px_#ffcbe8] justify-self-center transition-all duration-300 
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
          className="flex flex-col items-center justify-center"
          onMouseEnter={() => setStateButton("account")}
          onMouseLeave={() => setStateButton("none acc")}
          onClick={() => setModal(!modal)}
        >
          {" "}
          <button  className=" flex flex-col font-titilium text-3xl lg:text-5xl text-pink-50 font-normal transition-all duration-300 hover:scale-105">
            <FaUserXmark />
          </button>{" "}
          <span
            className="absolute text-md lg:text-[1rem] visible  justify-self-center bottom-1 p-2 font-bold text-[#fef1f8] font-tiltneon [text-shadow:4px_2px_15px_#ffcbe8] justify-self-center transition-all duration-300  translate-y-20 lg:-translate-y-1 -translate-x-2">
            No Account
          </span>
          <span
            className="absolute text-md lg:text-[0.75rem] visible  justify-self-center bottom-1 p-2 font-bold text-[#fef1f8] font-tiltneon [text-shadow:4px_2px_15px_#ffcbe8] justify-self-center transition-all duration-300  translate-y-20 lg:translate-y-2.5 -translate-x-2">
            Sig In?
          </span>
        </div>
      )}
     
    </div>
    <LoginModal modal={modal}/>
    </div>

  );
};

export default ButtonsNavBar;
