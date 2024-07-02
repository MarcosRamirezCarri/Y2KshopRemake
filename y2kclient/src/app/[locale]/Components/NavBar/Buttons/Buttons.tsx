"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FaBagShopping } from "react-icons/fa6";
import { FaIdBadge } from "react-icons/fa";

const ButtonsNavBar = () => {
  const [stateButton, setStateButton] = useState<string>();
  const path = usePathname();

  return (
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
         
          <span className={`absolute text-lg lg:text-[1.50rem]  justify-self-center bottom-1 p-2 font-bold text-[#fef1f8] font-tiltneon [text-shadow:4px_2px_15px_#ffcbe8] justify-self-center transition-all duration-300 
           ${stateButton === "cart" || path === "/cart" ? 'visible -translate-y-20 lg:translate-y-2 blur-none ': 'translate-y-20 lg:-translate-y-2 blur-lg invisible' }`}>Cart</span>
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
        <span className={`absolute text-lg lg:text-[1.50rem]  justify-self-center bottom-1 p-2 font-bold text-[#fef1f8] font-tiltneon [text-shadow:4px_2px_15px_#ffcbe8] justify-self-center transition-all duration-300 
           ${stateButton === "product" || path === "/products" ? 'visible -translate-y-20 lg:translate-y-2 blur-none ': 'translate-y-20 lg:-translate-y-2 blur-lg invisible' }`}>Buy</span>
      </Link>
      <Link
        className="flex flex-col items-center justify-center"
        onMouseEnter={() => setStateButton("account")}
        onMouseLeave={() => setStateButton("none acc")}
        href={{ pathname: "/account" }}
      >
        <button className=" flex flex-col font-titilium text-3xl lg:text-5xl text-pink-50 font-normal transition-all duration-300 hover:scale-105">
          <FaIdBadge />
        </button>
        <span className={`absolute text-md lg:text-[1.50rem]  justify-self-center bottom-1 p-2 font-bold text-[#fef1f8] font-tiltneon [text-shadow:4px_2px_15px_#ffcbe8] justify-self-center transition-all duration-300 
           ${stateButton === "account" || path === "/account" ? 'visible -translate-y-20 lg:translate-y-2 blur-none ': 'translate-y-20 lg:-translate-y-2 blur-lg invisible' }`}>Account</span>
      </Link>
    </div>
  );
};

export default ButtonsNavBar;
