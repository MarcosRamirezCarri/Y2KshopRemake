"use client";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import CardProduct from "./Card";
import { getAllProducts } from "@/lib/actions/getAllProducts";
import { useEffect, useState } from "react";

export default function ShowCards() {
  const products = useAppSelector((state) => state.shirts.shirts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllProducts());
    };
    fetchData();
  }, [dispatch]);

  const all = [];
  if (Array.isArray(products) && products.length > 0) all.push(...products);

  console.log(all);

  return (
    <div className="flex flex-col h-[60vh] w-full bg-gray-300 items-center relative content-around">
      {all.length === 0 ? (
        <div>
          <p>loading</p>
        </div>
      ) : null}
       {all.map((item, index) => <div key={index}>
    <CardProduct
    title={item.title}
    image={item.image}
    price={item.price}
    id={item.id}
    />
  </div>)}
    </div>
  );
}
