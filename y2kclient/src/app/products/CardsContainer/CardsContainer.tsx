"use client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import { useEffect } from "react";
import { getAllProducts } from "@/lib/actions/ProductActions/getAllProducts";
import { BsBagXFill } from "react-icons/bs";
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

  const place = "products";
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 relative gap-[2rem] top-[10rem] w-[90%] justify-items-center">
      {stateProducts.length > 0 ? (
        stateProducts.map((a, index) => (
          <div key={index}>
            <CardProductComplete product={a} place={place} />
          </div>
        ))
      ) : (
        <div className="w-[100%] col-span-1 lg:col-span-4 justify-center items-center flex flex-col">
          <p className="relative top-[10rem] text-2xl lg:text-3xl text-Lightblue-950 font-titilium font-semibold">
            It seems there are no products!
          </p>
          <p className="relative top-[10.5rem] text-lg lg:text-xl text-Lightblue-950 font-titilium font-normal">
            Check your connection or change the filters for an answer!
          </p>
          <BsBagXFill className="relative top-[11.5rem] text-3xl lg:text-5xl text-Lightblue-950 font-titilium font-semibold" />
        </div>
      )}
    </div>
  );
}
