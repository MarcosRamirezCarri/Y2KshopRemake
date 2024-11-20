import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import deleteProduct from "@/lib/actions/ProductActions/deleteProduct";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import MiniCard from "./miniCard/MiniCard";

interface DeleteModalProps {
  setStateAdmin: (arg: string) => void;
  stateAdmin: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  setStateAdmin,
  stateAdmin,
}) => {
  const [stateProduct, setStateProduct] = useState<number>(0);
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.products.product);

  const handleDelete = () => {
    if (stateProduct > 0) {
      Swal.fire({
        title: `Do you want to delete the product ${stateProduct} ?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Delete",
        denyButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteProduct(stateProduct))
          .then((response: any) => {
            if (response.success === true) {
              Swal.fire("Deleted!", "", "success");
            } else {
              Swal.fire("Something went wrong!", "", "error");
            }
          });
        }
      });
    } else {
      Swal.fire("Please First select an product", "", "error");
    }
  };

  return (
    <div
      className={`fixed inset-0 flex z-[101] items-center  justify-center bg-gray-900/[0.4] ${
        stateAdmin === "DeleteProduct" ? "visible" : "invisible"
      }`}
    >
      <div
        className={`w-[60%] font-titilium bg-Lightblue-200 gap-2 justify-center transition-all duration-250 flex flex-col p-6 rounded-lg shadow-lg transition-all duration-300 ${
          stateAdmin === "DeleteProduct"
            ? "scale-100 opacity-100"
            : "scale-125 opacity-0"
        }`}
      >
        <p className="self-center text-2xl font-semibold">Delete any Product</p>
        <div className="flex items-center justify-center flex-row overflow-y-hidden overflow-x-auto">
          {products.length > 0 ? (
            products.map((prod) => (
              <MiniCard
                id={prod.id}
                name={prod.name}
                images={prod.images}
                price={prod.price}
                setStateProduct={setStateProduct}
                stateProduct={stateProduct}
              />
            ))
          ) : (
            <h1 className="self-center text-3xl font-titilium font-semibold">
              We dont have any product!
            </h1>
          )}
        </div>
        <div className="flex flex-row gap-2 self-center">
          <button
            onClick={handleDelete}
            className="bg-Lightblue-500 rounded px-4 py-2 m-1 font-titilium ring-2 ring-Lightblue-600 transition-all duration-150 hover:ring-Lightblue-700 hover:scale-105 active:bg-Lightblue-700"
          >
            Delete
          </button>

          <button
            className="bg-gray-500 self-center font-semibold w-fit rounded px-4 py-2 m-1 font-titilium ring-2 ring-gray-600 transition-all duration-150 hover:ring-gray-700 hover:scale-105 active:bg-gray-700"
            onClick={() => setStateAdmin("")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;
