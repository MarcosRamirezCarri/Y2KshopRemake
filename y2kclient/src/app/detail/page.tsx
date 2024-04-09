"use client"
import { useSearchParams } from "next/navigation";
import Navbar from "../[locale]/Components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { Server } from "@/helpers/server";
import axios from "axios";

interface DetailProductProps {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
  
    
  }

 const DetailProduct = () => {
    const [ stateDetail, setStateDetail ] = useState<DetailProductProps[]>([])
    const param = useSearchParams()
    const searchId= param.get('id')

    useEffect(()=>{
        const fetchProduct = async (productId: any) => {
            try {
                const { data } = await axios.get<DetailProductProps[]>(`${Server}/products/${productId}`);
               
                setStateDetail(data)
              } catch (error) {
                console.error("Error fetching product data:", error);
              }
          };
          fetchProduct(searchId)
    }, [])
    console.log(stateDetail);
    

    return (
      <div className="flex flex-col w-full h-full">
   <Navbar/>
        <div className="flex flex-col w-full h-full justify-around gap-[17rem] items-center">
        </div>
   
      </div>
    );
  }
export default DetailProduct