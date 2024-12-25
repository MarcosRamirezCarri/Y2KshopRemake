"use client";
import NavLink from "./NavLink/NavLinks";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import * as jose from "jose";
import setUserFromId from "@/lib/actions/AccountActions/getUserFromId";
import LoginModal from "../../LoginModal/LoginModal";
import {
  FaCartShopping,
  FaBagShopping,
  FaUserXmark,
  FaIdBadge,
} from "react-icons/fa6";
import { BsArchiveFill } from "react-icons/bs";

const secret = "y2k_project";

const ButtonsNavBar = () => {
  const [stateButton, setStateButton] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [stateUser, setStateUser] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.account.user);
  const path = usePathname();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const numberUserId =
        userId && !isNaN(Number(userId)) ? Number(userId) : null;

      if (!numberUserId) {
        return;
      }

      if (token) {
        try {
          const decoded = await jose.jwtVerify(
            token,
            new TextEncoder().encode(secret)
          );
          if (decoded.payload?.userId) {
            setStateUser(true);
            dispatch(setUserFromId(numberUserId));
          } else {
            localStorage.clear();
          }
        } catch {
          localStorage.clear();
        }
      }
    };

    verifyToken();
  }, [dispatch]);

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
        {stateUser ? (
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
            <span className="absolute invisible lg:visible lg:text-md bottom-1 font-bold transition-all duration-300 lg:-translate-y-2">
              No Account
            </span>
            <span className="absolute text-md lg:text-[0.75rem] bottom-1 p-2 font-bold transition-all duration-300 lg:translate-y-2.5">
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
