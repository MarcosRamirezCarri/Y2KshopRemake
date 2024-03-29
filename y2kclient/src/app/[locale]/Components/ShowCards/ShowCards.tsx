'use client';
import { UseDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

interface Product{
    id: number,
    title: string,
    price: number,

}

export default function Home() {
    const [stateProducts, setStateProducts] = useState<Product[]>([]);

  return (
    <div className="flex flex-col h-[100vh] items-center content-around">
 
    </div>
  );
}