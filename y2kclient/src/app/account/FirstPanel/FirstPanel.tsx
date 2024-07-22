"use client";
import LoginModal from "@/app/[locale]/Components/LoginModal/LoginModal";
import LogOutBtn from "@/app/[locale]/Components/LoginModal/LogOutBtn";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import setUserFromId from "@/lib/actions/AccountActions/getUserFromId";

const AccountFirstPanel = () => {
  const id = localStorage.getItem("userId");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id !== "undefined" || id !== null) {
      const userId = Number(id);
      dispatch(setUserFromId(userId));
    }
  }, [id]);

  const user = useAppSelector((state) => state.account.user);
  console.log(user);

  return (
    <div className="bg-pink-300 flex flex-col items-center p-[2rem] gap-5 ">
      <p>My account</p>
      <div className="grid w-[100%]  grid-cols-3  gap-5">
        {user.length > 0 ? user.map((data, index) => <div className="row-span-2 grid col-span-1 gap-10 p-2 font-titilium text-pink-950 font-semibold">
          <p>Fotto</p>
          <p className="flex flex row">Name:{data.name}</p>
          <p>Email:{data.email}</p>
          <p>Celular:{data.phone}</p>
        </div>) : <div>
          </div>}
        <div className="row-span-3 col-span-2">a</div>
        <button className="relative self-center col-start-2 col-end-2 bg-pink-400 px-6 py-4 rounded-[1.25rem] font-tiltneon text-xl text-pink-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-pink-200">
          Modify
        </button>
        <LoginModal />
      </div>
      <LogOutBtn />
    </div>
  );
};
export default AccountFirstPanel;
