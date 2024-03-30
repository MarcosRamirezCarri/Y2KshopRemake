'use client';
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { getAllProducts } from "@/lib/actions/getAllProducts";
import { useEffect, useState } from "react";

interface Product{
    id: number,
    title: string,
    price: number,

}

export default function ShowCards() {
    const [stateProducts, setStateProducts] = useState<Product[]>([]);
    const products = useAppSelector((state) => state.shirts)

    const dispatch = useAppDispatch()
   
    useEffect(() => {
      const fetchData = async () => {
        await dispatch(getAllProducts()); 
      }
      fetchData();      
    }, [dispatch]);
   


  return (
    <div className="flex flex-col h-[100vh] items-center content-around">
 
    </div>
  );
}