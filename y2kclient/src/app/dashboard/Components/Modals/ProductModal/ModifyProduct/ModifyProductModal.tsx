import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { useState } from "react";
import MiniCard from "./MiniCard/Minicard";

interface ModifyProductModalProps {
  setStateAdmin: (arg: string) => void;
  stateAdmin: string;
}

const ModifyProductModal: React.FC<ModifyProductModalProps> = ({
  setStateAdmin,
  stateAdmin,
}) => {
    const [stateModal, setStateModal] = useState<boolean>(false)
  const [stateProduct, setStateProduct] = useState<number>(0);
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.product);
  return (
    <div
      className={`fixed inset-0 flex z-[101] items-center  justify-center bg-gray-900/[0.4] ${
        stateAdmin === "ModifyProduct" ? "visible" : "invisible"
      }`}
    >
      <div
        className={`w-[60%] font-titilium bg-Lightblue-200 gap-2 justify-center transition-all duration-250 grid grid-cols-2 p-6 rounded-lg shadow-lg transition-all duration-150 ${
          stateAdmin === "ModifyProduct"
            ? "scale-100 opacity-100"
            : "scale-125 opacity-0"
        }`}
      >
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
          <p>There are no products</p>
        )}
        </div>
        <div>

        </div>
        
      </div>
    </div>
  );
};

export default ModifyProductModal;
