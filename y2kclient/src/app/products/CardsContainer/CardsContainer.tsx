"use client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import { useEffect } from "react";
import { getAllProducts } from "@/lib/actions/getAllProducts";
import CardProductComplete from "./Cards/CardProduct";

export default function CardsContainer() {
  const dispatch = useAppDispatch();
  const stateProducts = useAppSelector((state) => state.products.product);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllProducts());
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 relative gap-[2rem] top-[10rem] w-[90%] justify-items-center">
      {stateProducts.map((a, index) => (
        <div key={index}>
          <CardProductComplete
            id={a.id}
            name={a.name}
            description={a.description}
            images={a.images}
            clasification={a.clasification}
            price={a.price}
            colors={a.colors}
          />
        </div>
      ))}
    </div>
  );
}
