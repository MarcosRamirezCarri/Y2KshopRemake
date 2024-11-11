"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import fetchProduct from "@/lib/actions/ProductActions/getDetail";
import Product from "@/helpers/Types";
import Navbar from "../[locale]/Components/NavBar/NavBar";
import FirstView from "./detailComponents/Firstiew/FirstView";
import SecondView from "./detailComponents/SecondView/SecondView";



const DetailProduct = () => {
  const [stateDetail, setStateDetail] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const param = useSearchParams();
  const searchId = param.get("id");

 


    useEffect(()=>{
      const fetchDetail = async() =>{
        const DetailProduct: any = await fetchProduct(searchId);
        setStateDetail(DetailProduct)
      }
      fetchDetail()
    },[searchId])


const handleChangeColor = (color: string) => {
  setSelectedColor(color);
  setSelectedSize(null); 
};
const handleChangeSize = (size: string) => {
  setSelectedSize(size);
};
  return (
    <div className="flex flex-col w-full h-full items-center">
      <Navbar />
      <div className="grid grid-rows-2 w-[90%] top-[10rem] relative items-center">
        {stateDetail.length === 0
          ? null
          : stateDetail.map((i, index) => (
              <div key={index}>
                <FirstView
                  images={i.images}
                  name={i.name}
                  price={i.price}
                  description={i.description}
                  clasification={i.clasification}
                  colors={i.colors}
                  selectedSize={selectedSize}
                  handleChangeSize={handleChangeSize}
                  handleChangeColor={handleChangeColor}
                  selectedColor={selectedColor}
                />
               <SecondView clasification={i.clasification} id={i.id} />
              </div>
            ))}
      </div>
    </div>
  );
};
export default DetailProduct;
