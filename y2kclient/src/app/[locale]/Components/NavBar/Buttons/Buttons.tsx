"use client";
import NavLink from "./NavLink/NavLinks";
import { usePathname } from "next/navigation";
import { useState,  } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import LoginModal from "../../LoginModal/LoginModal";
import {
  FaCartShopping,
  FaBagShopping,
  FaUserXmark,
  FaIdBadge,
} from "react-icons/fa6";
import { BsArchiveFill } from "react-icons/bs";


const ButtonsNavBar = () => {
  const [stateButton, setStateButton] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const user: any = useAppSelector((state) => state.account.user);
  const path = usePathname();


  return (
    <div>
      <div className="gap-6 font-tiltneon text-gray-50 lg:gap-[5.8rem] flex flex-row">
        {user?.admin && (
          <NavLink
            href="/dashboard"
            icon={BsArchiveFill}
            label="Dashboard"
            isActive={stateButton === "dash" || path === "/dashboard"}
            onHover={() => setStateButton("dash")}
          />
        )}
        <NavLink
          href="/cart"
          icon={FaCartShopping}
          label="Cart"
          isActive={stateButton === "cart" || path === "/cart"}
          onHover={() => setStateButton("cart")}
        />
        <NavLink
          href="/products"
          icon={FaBagShopping}
          label="Buy"
          isActive={stateButton === "product" || path === "/products"}
          onHover={() => setStateButton("product")}
        />
        {user.id ? (
          <NavLink
            href="/account"
            icon={FaIdBadge}
            label="Account"
            isActive={stateButton === "account" || path === "/account"}
            onHover={() => setStateButton("account")}
          />
        ) : (
          <div
            className="flex flex-col items-center justify-center active:text-Lightblue-300"
            onMouseEnter={() => setStateButton("account")}
            onMouseLeave={() => setStateButton("")}
            onClick={() => setModal(!modal)}
          >
            <button className="text-2xl lg:text-3xl font-normal transition-all duration-300 hover:scale-105">
              <FaUserXmark />
            </button>
            <span className="absolute invisible lg:visible lg:text-md bottom-1 font-bold transition-all duration-300 lg:-translate-y-2 lg:-translate-x-1">
              No Account
            </span>
            <span className="absolute text-md lg:text-[0.75rem] bottom-1 p-2 font-bold transition-all duration-300 lg:translate-y-2.5 lg:-translate-x-1">
              Sign In?
            </span>
          </div>
        )}
      </div>
      <LoginModal modal={modal} />
    </div>
  );
};

export default ButtonsNavBar;
