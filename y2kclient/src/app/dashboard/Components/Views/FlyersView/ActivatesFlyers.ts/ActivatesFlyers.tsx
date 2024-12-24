import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import Image from "next/image";
import { modifyFlyer } from "@/lib/actions/AdminActions/modifyFlyer";
import { getAllFlyers } from "@/lib/actions/FlyerActions/getAllFlyers";
import { deleteFlyer } from "@/lib/actions/AdminActions/deleteFlyer";
import Swal from "sweetalert2";
import { FlyerType } from "@/helpers/types/FlyerType";

const ActivateFlyers: React.FC = () => {
  const dispatch = useAppDispatch();
  const flyers = useAppSelector((state) => state.flyers.allFlyers);
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({}); // Para manejar el estado de carga por flyer




  const handleDelete = (id: number, name: string) => {
    if (id > 0) {
      Swal.fire({
        title: `Do you want to delete the flyer ${name} ?`,
        showDenyButton: true,
        confirmButtonText: "Delete",
        denyButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteFlyer(id)).then((response: any) => {
            if (response.success) {
              Swal.fire("Deleted!", "", "success");
              dispatch(getAllFlyers());
            } else {
              Swal.fire({
                title: "Somtehing Failed!",
                text: response.message,
                icon: "error",
                confirmButtonText: "Ok",
              });
            }
          });
        }
      });
    } 
  };

  const handleToggleStatus = async (
    id: number,
    currentStatus: boolean,
    type: string
  ) => {
    if (type === "text" && !currentStatus) {
      const activeTextFlyer = flyers.find(
        (flyer) => flyer.type === "text" && flyer.status === true
      );

      if (activeTextFlyer) {
        Swal.fire(
          "Error!",
          "Only one flyer of type 'Text' can be active",
          "error"
        );
        return;
      }
    }
    setLoading((prev) => ({ ...prev, [id]: true }));

    const response = await dispatch(modifyFlyer(id, !currentStatus));

    setLoading((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="p-4 text-Lightblue-950">
      <h1 className="text-xl font-bold mb-4">Activate/Deactivate Flyers</h1>
      {flyers && flyers.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {flyers.map((flyer: FlyerType) => (
            <div
              key={flyer.id}
              className={`p-4 gap-2 flex flex-col items-center rounded-lg ${
                flyer.status ? "bg-Lightblue-200" : "bg-orange-200"
              }`}
            >
              <p className="font-semibold">Name: {flyer.name}</p>
              <p>Type: {flyer.type}</p>
              <Image
                src={flyer.image}
                className={` ${
                  flyer.type === "text" ? "hidden" : "visible"
                } h-[50%] ring-2 w-[50%]`}
                width={980}
                height={800}
                alt="PhCarousel"
              />
              <p className={`${flyer.type !== "text" ? "hidden" : "visible"}`}>
                Text: {flyer.text}
              </p>

              <p>Status: {flyer.status ? "Active" : "Inactive"}</p>
              <div className="flex flex-row gap-2 content-end">
                <button
                  className={`m-1 px-4 py-2 rounded ring-orange-600 bg-orange-500 transition-all duration-300 hover:scale-105 ring-2 hover:ring-orange-700`}
                  onClick={() =>
                    handleToggleStatus(flyer.id, flyer.status, flyer.type)
                  }
                  disabled={loading[flyer.id]}
                >
                  {loading[flyer.id]
                    ? "Processing..."
                    : flyer.status
                    ? "Deactivate"
                    : "Activate"}
                </button>
                <button onClick={() => handleDelete(flyer.id, flyer.name)} className="bg-gray-500 text-white rounded px-4 py-2 m-1 font-titilium ring-2 ring-gray-600 transition-all duration-150 hover:ring-gray-700 hover:scale-105 active:bg-gray-700">
                  Delete
                </button>
              </div>
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
