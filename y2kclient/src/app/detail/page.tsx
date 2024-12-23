"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import fetchProduct from "@/lib/actions/ProductActions/getDetail";
import { Product } from "@/helpers/types/Types";
import Navbar from "../[locale]/Components/NavBar/NavBar";
import FirstView from "./detailComponents/Firstiew/FirstView";
import SecondView from "./detailComponents/SecondView/SecondView";

const DetailProduct = () => {
  const [stateDetail, setStateDetail] = useState<Product>({
    id: 0,
    name: "",
    images: [],
    price: 0,
    colors: [],
    clasification: "",
    description: "",
  });
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const param = useSearchParams();
  const searchId = param.get("id");

  console.log(stateDetail);

  useEffect(() => {
    const fetchDetail = async () => {
      const DetailProduct: any = await fetchProduct(searchId);
      setStateDetail(DetailProduct[0]);
    };
    fetchDetail();
  }, [searchId]);

  const handleChangeColor = (color: string) => {
    setSelectedColor(color);
    setSelectedSize(null);
  };
  const handleChangeSize = (size: string) => {
    setSelectedSize(size);
  };
  return (
    <div className="flex flex-col w-full items-center">
      <Navbar />
      <div className="flex flex-col w-[90%] top-[7.5rem] relative items-center">
        {stateDetail ? (
          <FirstView
            product={stateDetail}
            selectedSize={selectedSize}
            handleChangeSize={handleChangeSize}
            handleChangeColor={handleChangeColor}
            selectedColor={selectedColor}
          />
        ) : null}
        {stateDetail ? (
          <SecondView
            id={stateDetail.id}
            clasification={stateDetail.clasification}
          />
        ) : null}
      </div>
    </div>
  );
};
export default DetailProduct;
