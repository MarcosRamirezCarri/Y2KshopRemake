import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import Image from "next/image";
import { modifyFlyer } from "@/lib/actions/AdminActions/modifyFlyer";
import { FlyerType } from "@/helpers/types/FlyerType";

const ActivateFlyers: React.FC = () => {
  const dispatch = useAppDispatch();
  const flyers = useAppSelector((state) => state.flyers.allFlyers); // Suponiendo que el estado de los flyers está en Redux
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({}); // Para manejar el estado de carga por flyer

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    setLoading((prev) => ({ ...prev, [id]: true }));

    const response = await dispatch(modifyFlyer(id, !currentStatus));

    if (response && response.success) {
      console.log(`Flyer ${id} actualizado correctamente.`);
    } else {
      console.log(`Error al actualizar el flyer ${id}.`);
    }

    setLoading((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="p-4 text-Lightblue-950">
      <h1 className="text-xl  font-bold mb-4">Activate/Deactivate Flyers</h1>
      {flyers && flyers.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {flyers.map((flyer: FlyerType) => (
            <div
              key={flyer.id}
              className={`p-4 gap-2 flex flex-col items-center border rounded-lg ${
                flyer.status ? "bg-Lightblue-200" : "bg-orange-200"
              }`}
            >
              <p className="font-semibold">Name: {flyer.name}</p>
            
                <p>Type: {flyer.type}</p>
                <Image
                  src={flyer.image}
                  className={` ${flyer.type === "text" ? "hidden" : "visible"} h-[50%] ring-2 w-[50%]`}
                  width={980}
                  height={800}
                  alt="PhCarousel"
                />
         

              <p>Status: {flyer.status ? "Active" : "Inactive"}</p>
              <button
                className={`mt-2 px-4 py-2 rounded  ${
                  flyer.status
                    ? "bg-orange-500 hover:bg-orange-700"
                    : "bg-orange-500 hover:bg-orange-700"
                } transition-all duration-150`}
                onClick={() => handleToggleStatus(flyer.id, flyer.status)}
                disabled={loading[flyer.id]}
              >
                {loading[flyer.id]
                  ? "Processing..."
                  : flyer.status
                  ? "Deactivate"
                  : "Activate"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay flyers disponibles.</p>
      )}
    </div>
  );
};

export default ActivateFlyers;
