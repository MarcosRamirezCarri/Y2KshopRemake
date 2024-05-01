"use client";
import Link from "next/link";
import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import style from "../NavBar.module.css";
import { FaBagShopping } from "react-icons/fa6";
import { FaIdBadge } from "react-icons/fa";

const ButtonsNavBar = () => {
  const [stateButton, setStateButton] = useState<string>();

  return (
    <div className="gap-3 lg:gap-[5rem] flex flex-row">
      <Link className="flex flex-col items-center justify-center"
        onMouseLeave={() => setStateButton("none")}
        onMouseEnter={() => setStateButton("cart")}
        href={{ pathname: "/cart" }}
      >
        <button className="flex flex-col items-center justify-center font-titilium text-4xl lg:text-5xl text-pink-50 font-normal">
          <FaCartShopping />
        </button>
        {stateButton === "cart" ? (
          <span className={style.scaleBottom}>Cart</span>
        ) : null}
      </Link>
      <Link className="flex flex-col items-center justify-center"
        onMouseEnter={() => setStateButton("product")}
        onMouseLeave={() => setStateButton("none")}
        href={{ pathname: "/products" }}
      >
        <button className="flex flex-col font-titilium text-4xl lg:text-5xl text-pink-50 font-normal">
          <FaBagShopping />
        </button>
        {stateButton === "product" ? (
          <span className={style.scaleBottom}>Buy</span>
        ) : null}
      </Link>
      <Link className="flex flex-col items-center justify-center"
        onMouseEnter={() => setStateButton("account")}
        onMouseLeave={() => setStateButton("none")}
        href={{ pathname: "/" }}
      >
        <button className=" flex flex-col font-titilium text-4xl lg:text-5xl text-pink-50 font-normal">
          <FaIdBadge />
        </button>
        {stateButton === "account" ? (
          <span className={style.scaleBottom}>Account</span>
        ) : null}
      </Link>
    </div>
  );
};

export default ButtonsNavBar;
