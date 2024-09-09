import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { useState } from "react";
import MiniCard from "./miniCard/MiniCard";

interface DeleteModalProps {
  setStateAdmin: (arg: string) => void;
  stateAdmin: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  setStateAdmin,
  stateAdmin,
}) => {
  const products = useAppSelector((state) => state.products.product);
  return (
    <div
      className={`fixed inset-0 flex z-[101] items-center  justify-center bg-gray-900/[0.4] ${
        stateAdmin === "DeleteProduct" ? "visible" : "invisible"
      }`}
    >
      <div
        className={`w-[60%] bg-Lightblue-200 gap-2 justify-center transition-all duration-250   grid grid-cols-2 p-6 rounded-lg shadow-lg transition-all duration-150 ${
          stateAdmin === "DeleteProduct"
            ? "scale-100 opacity-100"
            : "scale-125 opacity-0"
        }`}
      >
        <p>xxxx</p>
        {products.map((prod) => (
          <MiniCard
            id={prod.id}
            name={prod.name}
            images={prod.images}
            price={prod.price}
            description={prod.description}
            colors={prod.colors}
            clasification={prod.clasification}
          />
        ))}
      </div>
    </div>
  );
};
