import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { getCartFromId } from "@/lib/actions/CartActions/getCart";
import { modifyCart } from "@/lib/actions/CartActions/modifyCart";
import Swal from "sweetalert2";
import { Product } from "@/helpers/types/Types";

interface ModalModifyProps {
  modal: boolean;
  size: string;
  color: string;
  id: number;
  userId: number;
  setModal: (modal: boolean) => void;
  Product: Product;
}

const ModalModify: React.FC<ModalModifyProps> = ({
  modal,
  setModal,
  id,
  userId,
  size,
  color,
  Product,
}) => {
  const dispatch = useAppDispatch();

  const [formModify, setFormModify] = useState({
    color: color,
    size: size,
    idItem: id,
    userId: userId,
  });
  const handleSave = () => {
    dispatch(
      modifyCart(
        formModify.color,
        formModify.size,
        formModify.idItem,
        formModify.userId
      )
    ).then((response: any) => {
      if (response.success) {
        Swal.fire({
          title: "Modifyed Successfully!",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            setModal(!modal);
            dispatch(getCartFromId(userId));
          }
        });
      } else {
        Swal.fire({
          title: "Something Failed!",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    });
  };

  const handleColorChange = (newColor: string) => {
    setFormModify((prev) => ({ ...prev, color: newColor, size: "" }));
  };

  const handleSizeChange = (newSize: string) => {
    setFormModify((prev) => ({ ...prev, size: newSize }));
  };

  const availableSizes =
    Product?.colors.find((c) => c.color === formModify.color)?.sizes || [];

  return (
    <div
      onClick={() => setModal(!modal)}
      className={`
        fixed inset-0 w-[100%] flex justify-center items-center transition-colors duration-300 z-[101]
        ${modal ? "visible bg-gray-950/[0.4]" : "invisible"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`grid grid-cols-2 bg-Lightblue-100 rounded-md ring-2 ring-Lightblue-300 gap-6 transition-all duration-300 p-10 w-[80%] lg:w-[40%] ${
          modal ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <h1 className=" col-span-2 flex flex-col text-center font-titilium text-2xl font-semibold">
          Modify Color And Size
        </h1>
        <div className="flex font-titilium flex-col gap-2">
          <p className="text-xl font-medium">Actual color: {color}</p>
          <div className="flex flex-col gap-2">
            <button className="bg-pink-300  text-xl rounded-md cursor-default ring-2 ring-pink-400">
              Select Color
            </button>
            {Product?.colors.map((c) => (
              <button
                key={c.color}
                className={`px-3 py-2 rounded-md ring-2 ring-pink-400 hover:scale-105 active:bg-pink-400 text-lg ring-2 transition-all delay-800 duration-200 ${
                  formModify.color === c.color
                    ? "bg-pink-300 ring-pink-500"
                    : "bg-pink-200 ring-pink-300"
                }`}
                onClick={() => handleColorChange(c.color)}
              >
                {c.color}
              </button>
            ))}
          </div>
        </div>

        <div className="flex font-titilium flex-col gap-2">
          <p className="text-xl font-medium">Actual Size: {size}</p>
          <div className="flex flex-col gap-2">
            {availableSizes.length > 0 ? (
              <button className="bg-pink-300 text-xl cursor-default rounded-md ring-2 ring-pink-400">
                Select Size
              </button>
            ) : (
              <button className="bg-pink-300 cursor-default rounded-md ring-2 ring-pink-400">
                No Sizes
              </button>
            )}
            {availableSizes.map((s) => (
              <button
                key={s.size}
                disabled={s.quantity === 0} // Deshabilitar si la cantidad es 0
                className={`px-3 py-2 rounded-md ring-2 ring-pink-400 hover:scale-105 active:bg-pink-400 text-lg transition-all duration-200 ${
                  s.quantity === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed ring-gray-400" // Estilo para deshabilitado
                    : formModify.size === s.size
                    ? "bg-pink-300 ring-pink-500"
                    : "bg-pink-200 ring-pink-300"
                }`}
                onClick={() => handleSizeChange(s.size)}
              >
                {s.size} {s.quantity === 0 && "(Out of Stock)"}{" "}
                {/* Mostrar mensaje si está agotado */}
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-2 flex flex-row justify-center gap-4 rounded-lg mt-4">
          <button
            onClick={handleSave}
            className="font-titilium bg-pink-300 ring-2 ring-pink-400 hover:scale-105 active:bg-pink-400 text-lg ring-2 transition-all duration-200 rounded-md px-4 py-2"
          >
            Save Changes
          </button>
          <button
            onClick={() => {
              setFormModify({
                color: color,
                size: size,
                idItem: id,
                userId: userId,
              });
              setModal(false);
            }}
            className="font-titilium bg-pink-300 ring-2 ring-pink-400 hover:scale-105 active:bg-pink-400 text-lg ring-2 transition-all duration-200 rounded-md px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalModify;
