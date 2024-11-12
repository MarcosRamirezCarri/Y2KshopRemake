"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import CardHistory from "./CardHistory/CardHistory";

export default function AccountSecondPanel() {
  const user: any = useAppSelector((state) => state.account.user);

  return (
    <div className="bg-Lightblue-300  w-[100%] flex flex-col gap-5 p-5">
      <p className="font-titilium text-2xl self-center font-medium text-Lightblue-950">
        My History
      </p>
      {user?.history.map((his: any) => (
        <div>
          <CardHistory
            name={his.name}
            color={his.color}
            size={his.size}
            images={his.images}
            productId={his.productId}
            quantity={his.quantity}
            state={his.state}
          />
        </div>
      ))}
    </div>
  );
}
