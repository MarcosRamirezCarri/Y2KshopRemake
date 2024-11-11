"use client"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";


export default function AccountSecondPanel() {

    const user = useAppSelector((state) => state.account.user);

    console.log(user)
    return (
      <div className="bg-Lightblue-300  w-[100%] flex flex-col gap-5 p-5">
        <p className="font-titilium text-2xl self-center font-medium text-Lightblue-950">My History</p>
      <div className="">
  a
      </div>
      <div className="" >
  a
      </div>
       </div>
    );
  }
  