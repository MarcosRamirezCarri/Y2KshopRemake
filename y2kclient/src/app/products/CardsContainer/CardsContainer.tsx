"use client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import { useEffect } from "react";
import { getAllProducts } from "@/lib/actions/ProductActions/getAllProducts";
import { BsBagXFill } from "react-icons/bs";
import Loader from "@/app/components/ui/Loader/Loader";
import CardProductComplete from "@/app/components/Cards/CardProduct/CardProduct";

export default function CardsContainer() {
  const dispatch = useAppDispatch();
  const stateProducts = useAppSelector((state) => state.products.product);
  const stateCategory = useAppSelector((state) => state.products.selectedCategory)
  const stateSize = useAppSelector((state) => state.products.selectedSize)
  const isLoading = useAppSelector((state) => state.products.isLoading)

  useEffect(() => {
    if (stateProducts.length === 0 && stateSize === "all" && stateCategory ==="all") {
      dispatch(getAllProducts());
    }
  }, [dispatch, stateProducts.length, stateSize, stateCategory]);

  const place = "products";
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 relative gap-[2rem] top-[7.5rem] min-h-[95vh] w-[90%] justify-items-center">
    {isLoading ? (
      <div className="col-span-1 flex justify-center items-center  lg:col-span-4">
  <Loader  message="Loading products..." />
      </div>
      
      ) : stateProducts.length > 0 ? (
        stateProducts.map((a, index) => (
          <div key={index}>
            <CardProductComplete product={a} place={place} />
          </div>
        ))
      ) : (
        <div className="w-[100%] col-span-1 lg:col-span-4 justify-center items-center flex flex-col">
          <p className="relative top-[7.5rem] text-2xl lg:text-3xl text-Lightblue-950 font-titilium font-semibold">
            It seems there are no products!
          </p>
          <p className="relative top-[7.5rem] text-lg lg:text-xl text-Lightblue-950 font-titilium font-normal">
            Check your connection or change the filters for an answer!
          </p>
          <BsBagXFill className="relative top-[8.5rem] text-3xl lg:text-5xl text-Lightblue-950 font-titilium font-semibold" />
        </div>
      )}
    </div>
  );
}
