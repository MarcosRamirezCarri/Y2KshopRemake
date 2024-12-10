"use client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import { useEffect } from "react";
import { getAllProducts } from "@/lib/actions/ProductActions/getAllProducts";
import CardProductComplete from "@/app/[locale]/Components/CardProduct/CardProduct";

export default function CardsContainer() {
  const dispatch = useAppDispatch();
  const stateProducts = useAppSelector((state) => state.products.product);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllProducts());
    };
    fetchData();
  }, []);

const place = "products"
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 relative gap-[2rem] top-[10rem] w-[90%] justify-items-center">
      {stateProducts.map((a, index) => (
        <div key={index}>
          <CardProductComplete
           product={a}
           place={place}
          />
        </div>
      ))}
    </div>
  );
}
