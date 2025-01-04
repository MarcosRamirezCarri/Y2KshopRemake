"use client";
import LogOutBtn from "@/app/[locale]/Components/LoginModal/LogOutBtn";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import {setUserFromId} from "@/lib/actions/AccountActions/getUserFromId";

const AccountFirstPanel = () => {
  const dispatch = useAppDispatch();
  const user: any = useAppSelector((state) => state.account.user);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const numberUserId = userId && !isNaN(Number(userId)) ? Number(userId) : null;
  
    if (!numberUserId) {
      return;
    }
  
      dispatch(setUserFromId(numberUserId));
  }, [dispatch]);



  return (
    <div className="bg-pink-300 flex flex-col items-center p-[0.65rem] min-h-[30rem] max-h-[30rem] lg:p-[1rem] gap-5">
      <p className="font-titilium text-xl lg:text-2xl self-center font-medium text-pink-950">
        {user.name}
      </p>
      <div className="grid grid-cols-4 w-[100%] gap-5">
        {user ? (
          <div className="grid grid-cols-4 col-span-4">
            <div
              key={user.id}
              className="flex flex-col col-span-2 w-[100%] gap-10 p-5 font-titilium text-pink-950"
            >
            
              <UserInfo label="Phone" value={user.phone} />
              <UserInfo label="City" value={user.location?.city} />
              <UserInfo label="Email" value={user.email} />
            </div>
            <div className=" flex flex-col col-span-2 w-[100%] gap-10 p-5 font-titilium text-pink-950">
             
              <UserInfo label="Province" value={user.location?.province} />
              <UserInfo label="Country" value={user.location?.country} />

            </div>
          </div>
        ) : (
          <div>No user data available</div>
        )}
        <div className="row-span-3 justify-center col-start-2 col-end-4 flex flex-row gap-3">
          <button className="relative  self-center bg-pink-400 px-6 py-4 rounded-lg ring-2 ring-pink-600 font-tiltneon text-xl text-pink-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-pink-200">
            Modify
          </button>
          <div className="relative  self-center">
            <LogOutBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

const UserInfo = ({ label, value }: any) => (
  <div className="gap-1  flex flex-row ">
    <p className="font-semibold self-center  text-md lg:text-2xl">{label}:</p>
    <p className="font-medium self-center  text-sm lg:text-xl">{value}</p>
  </div>
);

export default AccountFirstPanel;
