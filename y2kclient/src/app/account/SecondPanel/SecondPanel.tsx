"use client";
import { useAppSelector } from "@/lib/hooks/hooks";
import CardHistory from "@/app/[locale]/Components/CardHistory/CardHistory";

export default function AccountSecondPanel() {
  const user: any = useAppSelector((state) => state.account.user);
  const place = "UserHistory"

  return (
    <div className="bg-Lightblue-300  w-[100%]  flex flex-col gap-5 p-3">
      <p className="font-titilium text-2xl self-center font-medium text-Lightblue-950 ">
        My History
      </p>
      <div className="flex flex-col p-5 overflow-auto gap-5 max-h-[22rem]">
        {user.history?.map((his: any, index: any) => (
          <CardHistory
          key={index}
        history={his}
        place={place}
          />
        ))}
      </div>
    </div>
  );
}
