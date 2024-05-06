"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import style from "../NavBar.module.css";
import { FaBagShopping } from "react-icons/fa6";
import { FaIdBadge } from "react-icons/fa";

const ButtonsNavBar = () => {
  const [stateButton, setStateButton] = useState<string>();
  const path = usePathname();

  return (
    <div className="gap-3 lg:gap-[5rem] flex flex-row">
      <Link
        className="flex flex-col items-center justify-center"
        onMouseLeave={() => setStateButton("none cart")}
        onMouseEnter={() => setStateButton("cart")}
        href={{ pathname: "/cart" }}
      >
        <button className="flex flex-col items-center justify-center font-titilium text-4xl lg:text-5xl text-pink-50 font-normal transition-all duration-300 hover:scale-105">
          <FaCartShopping />
        </button>
        {stateButton === "cart" || path === "/cart" ? (
          <span className={style.scaleBottom}>Cart</span>
        ) : stateButton === "none cart" ? (
          <span className={style.scaleTop}>Cart</span>
        ) : null}
      </Link>
      <Link
        className="flex flex-col items-center justify-center"
        onMouseEnter={() => setStateButton("product")}
        onMouseLeave={() => setStateButton("none prod")}
        href={{ pathname: "/products" }}
      >
        <button className="flex flex-col font-titilium text-4xl lg:text-5xl text-pink-50 font-normal transition-all duration-300 hover:scale-105">
          <FaBagShopping />
        </button>
        {stateButton === "product" || path === "/products" ? (
          <span className={style.scaleBottom}>Buy</span>
        ) : stateButton === "none prod" ? (
          <span className={style.scaleTop}>Buy</span>
        ) : null}
      </Link>
      <Link
        className="flex flex-col items-center justify-center"
        onMouseEnter={() => setStateButton("account")}
        onMouseLeave={() => setStateButton("none acc")}
        href={{ pathname: "/account" }}
      >
        <button className=" flex flex-col font-titilium text-4xl lg:text-5xl text-pink-50 font-normal transition-all duration-300 hover:scale-105">
          <FaIdBadge />
        </button>
        {stateButton === "account" || path === "/account" ? (
          <span className={style.scaleBottom}>Account</span>
        ) : stateButton === "none acc" ? (
          <span className={style.scaleTop}>Account</span>
        ) : null}
      </Link>
    </div>
  );
};

export default ButtonsNavBar;
