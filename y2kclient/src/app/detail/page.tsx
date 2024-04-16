"use client";
import { useSearchParams } from "next/navigation";
import FirstView from "./detailComponents/Firstiew/FirstView";
import SecondView from "./detailComponents/SecondView/SecondView";
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
        const shirtsWithShortenedTitles = arrayData.map((shirt) => ({
          ...shirt,
          title:
            shirt.title.length > 20
              ? `${shirt.title.substring(0, 20)}...`
              : shirt.title,
        }));
        setStateDetail(shirtsWithShortenedTitles);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProduct(searchId);
  }, [searchId]);
  return (
    <div className="flex flex-col w-full h-full items-center">
      <Navbar />
      <div className="grid grid-rows-2 w-[90%] top-[10rem] relative justify-around items-center">
        {stateDetail.length === 0
          ? null
          : stateDetail.map((i, index) => (
              <div>
                <FirstView
                  key={index}
                  image={i.image}
                  title={i.title}
                  price={i.price}
                  description={i.description}
                  category={i.category}
                />
                <SecondView category={i.category} id={i.id} />
              </div>
            ))}
      </div>
    </div>
  );
};
export default DetailProduct;
