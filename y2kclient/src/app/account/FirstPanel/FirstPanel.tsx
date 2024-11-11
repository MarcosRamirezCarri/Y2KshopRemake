"use client";
import LogOutBtn from "@/app/[locale]/Components/LoginModal/LogOutBtn";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import setUserFromId from "@/lib/actions/AccountActions/getUserFromId";

const AccountFirstPanel = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id && id !== "undefined" && id !== "null") {
      const userId = Number(id);
      dispatch(setUserFromId(userId));
    }
  }, [dispatch]);

  const user = useAppSelector((state) => state.account.user);
console.log(user)

  return (
    <div className="bg-pink-300 flex flex-col items-center p-[0.75rem] lg:p-[1rem] gap-5">
      <p className="font-titilium text-2xl self-center font-medium text-pink-950">My account</p>
      <div className="flex flex-col lg:grid lg:grid-cols-4 w-[100%] gap-5">
        {user ? (
          <div key={user.id} className="row-span-2 grid col-span-2 w-[100%] gap-10 p-2 font-titilium text-pink-950">
            <UserInfo label="Name" value={user.name} />
            <UserInfo label="Email" value={user.email} />
            <UserInfo label="Phone" value={user.phone} />
          </div>
        ) : (
          <div>No user data available</div>
        )}
        <button className="relative row-span-3 col-start-2 col-end-2 self-center bg-pink-400 px-6 py-4 rounded-[1.25rem] font-tiltneon text-xl text-pink-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-pink-200">
          Modify
        </button>
        <div className="relative row-span-3 col-start-3 col-end-3 self-center">
          <LogOutBtn />
        </div>
      </div>
    </div>
  );
};

const UserInfo = ({ label, value }: any) => (
  <div className="gap-1">
    <p className="font-normal lg:font-medium text-sm lg:text-lg">{label}:</p>
    <p className="font-medium lg:font-semibold text-base lg:text-xl">{value}</p>
  </div>
);

export default AccountFirstPanel;
