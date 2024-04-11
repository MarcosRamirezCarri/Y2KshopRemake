"use client";
import { useSearchParams } from "next/navigation";
import FirstView from "./detailComponents/Firstiew/FirstView";
import Navbar from "../[locale]/Components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { Server } from "@/helpers/server";
import axios from "axios";

interface DetailProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const DetailProduct = () => {
  const [stateDetail, setStateDetail] = useState<DetailProductProps[]>([]);
  const param = useSearchParams();
  const searchId = param.get("id");

  useEffect(() => {
    const fetchProduct = async (productId: any) => {
      try {
        const { data } = await axios.get<DetailProductProps[]>(
          `${Server}/products/${productId}`
        );

        let arrayData = [];
        arrayData.push(data);
        setStateDetail(arrayData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProduct(searchId);
  }, []);
console.log(stateDetail)
  return (
    <div className="flex flex-col w-full h-full">
      <Navbar />
      <div className="grid grid-cols-3 w-[90%] top-[20rem] relative justify-around items-center">
        {stateDetail.length === 0 ? null : stateDetail.map((i, index) => (
            <div key={index}>
              <FirstView
                id={i.id}
                image={i.image}
                title={i.title}
                price={i.price}
                description={i.description}
                category={i.category}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
export default DetailProduct;
