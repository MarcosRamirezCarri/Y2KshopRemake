"use client";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import AOS from "aos";
import '../../../../../node_modules/aos/dist/aos.css'
import CardProduct from "./Card/Card";
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
    AOS.init({duration: 1000})
  }, [dispatch]);

  const all = [];
  if (Array.isArray(products) && products.length > 0) all.push(...products);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 h-[60vh] w-[85%] items-center relative content-around">
      {all.length === 0 ? (
        <div>
          <p>loading</p>
        </div>
      ) : null}
      {all.map((item, index) => (
        <div data-aos='fade-up' key={index}>
          <CardProduct
            title={item.title}
            image={item.image}
            price={item.price}
            id={item.id}
          />
        </div>
      ))}
    </div>
  );
}
