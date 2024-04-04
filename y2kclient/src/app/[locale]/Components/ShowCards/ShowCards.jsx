'use client';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { getAllProducts } from '@/lib/actions/getAllProducts';
import { useEffect, useState } from "react";



export default function ShowCards() {
    const [stateProducts, setStateProducts] = useState([]);
    const products = useAppSelector((state) => state.shirts.shirts)
    

    const dispatch = useAppDispatch()
   
   
    useEffect(() => {
      const fetchData = async () => {
        await dispatch(getAllProducts()); 
      }
      fetchData();      
    }, [dispatch]);
   console.log(products)


  return (
    <div className="flex flex-col h-[100vh] items-center content-around">
 
    </div>
  );
}