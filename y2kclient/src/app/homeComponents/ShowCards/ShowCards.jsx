"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import AOS from "aos";
import '../../../../node_modules/aos/dist/aos.css'
import CardProductComplete from "@/app/[locale]/Components/CardProduct/CardProduct";
import { getAllProducts } from "@/lib/actions/ProductActions/getAllProducts";
import { useEffect } from "react";

export default function ShowCards() {
  const products = useAppSelector((state) => state.products.product);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllProducts());
    };
    fetchData();
    AOS.init({duration: 1000})
  }, [dispatch]);

  const place = "home"
  const all = [];
  if (Array.isArray(products) && products.length > 0) all.push(...products);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 h-[60vh] w-[85%] items-center relative content-around">
      <p className="col-span-2 lg:col-span-4 text-center font-tiltneon text-lg lg:text-2xl text-blue-950 font-bold">You can see our products</p>
      {all.length === 0 ? (
        <div>
          <p>loading</p>
        </div>
      ) : null}
      {all.map((item, index) => (
        <div data-aos='fade-up' key={index}>
          <CardProductComplete
            product={item}
            place={place}
          />
        </div>
      ))}
    </div>
  );
}
