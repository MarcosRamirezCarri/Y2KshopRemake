import { useState } from "react";
import Product from "@/helpers/Types";

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
  const [stateSize, setStateSize] = useState<boolean>(false);
  const [stateColor, setStateColor] = useState<boolean>(false)
  const [formModify, setFormModify] = useState({
    color: "",
    size: "",
    idItem: id,
    userId: userId
  })
  return (
    <div
      onClick={() => setModal(!modal)}
      className={`
    fixed inset-0 w-[100%] flex justify-center items-center transition-colors duration-500 z-[101]
    ${modal ? "visible bg-gray-950/[0.4]" : "invisible"}
  `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`flex flex-row bg-Lightblue-100 rounded gap-6 transition-all duration-500 p-10 w-[40%] ${
          modal ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <div className="flex flex-col">
        <p>Actual color: {color}</p>
        <button
        className={`underline  px-3 py-4 rounded-xl font-tiltneon text-lg lg:text-xl text-gray-950 
      ${
        stateSize === true
          ? "bg-Lightblue-300 decoration-Lightblue-300"
          : "bg-Lightblue-400 decoration-Lightblue-400 "
      } hover:decoration-Lightblue-900 transition-colors duration-200 active:bg-Lightblue-500 `}
        onClick={() => setStateSize(!stateSize)}
      >
        Change Color
      </button>
        </div>
        <div className="flex flex-col">
        <p>Actual Size: {size}</p>
        </div>
     
       
      </div>
    </div>
  );
};

export default ModalModify;
