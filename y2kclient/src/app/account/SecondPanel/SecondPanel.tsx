"use client";
import { useState } from "react";
import { useAppSelector } from "@/lib/hooks/hooks";
import CardHistory from "@/app/[locale]/Components/CardHistory/CardHistory";

export default function AccountSecondPanel() {
  const user: any = useAppSelector((state) => state.account.user);
  const place = "UserHistory";

  // Estado para el filtro
  const [filter, setFilter] = useState<"pending" | "approved_sended">(
    "pending"
  );

  // Filtrar el historial basado en el estado seleccionado
  const filteredHistory = user.history?.filter((his: any) => {
    if (filter === "pending") {
      return his.state === "pending";
    }
    return his.state === "approved" || his.state === "sended";
  });

  return (
    <div className="bg-Lightblue-300 w-[100%] min-h-[30rem] max-h-[30rem] flex flex-col  p-3">
      <p className="font-titilium text-2xl self-center mb-2 font-medium text-Lightblue-950">
        My History
      </p>

      <div className="flex  text-Lightblue-950 rounded-tl-md rounded-tr-md border-l-2 border-r-2  border-t-2 border-Lightblue-600 font-titilium gap-4 self-start">
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 text-lg font-medium underline ${
            filter === "pending" ? " decoration-Lightblue-950 " : "decoration-Lightblue-300"
          } rounded-md transition-all duration-150 hover:decoration-Lightblue-950`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("approved_sended")}
          className={`px-4 py-2 text-lg font-medium underline ${
            filter === "approved_sended" ? " decoration-Lightblue-950 " : "decoration-Lightblue-300"
          } rounded-md transition-all duration-150 hover:decoration-Lightblue-950`}
        >
          Approved & Sended
        </button>
      </div>

      <div className="flex flex-col p-5 border-2 border-Lightblue-600 rounded-bl-md rounded-br-md  rounded-tr-md overflow-auto gap-5 max-h-[22rem]">
        {filteredHistory?.length > 0 ? (
          filteredHistory.map((his: any, index: any) => (
            <CardHistory key={index} history={his} place={place} />
          ))
        ) : (
          <p className="text-Lightblue-950 self-center">
            No items found for this filter.
          </p>
        )}
      </div>
    </div>
  );
}
