"use client";
import Image from "next/image";
import { Product } from "@/helpers/types/Types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import fetchProduct from "@/lib/actions/ProductActions/getDetail";
import SelectButtons from "./Buttons/SelectButton/SelectButton";
import ImagesDetail from "./Images/imagesDetail";
import AddToCart from "./Buttons/AddToCart/AddToCartbtn";

const FirstView = () => {
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
  const numberId = Number(searchId);

  useEffect(() => {
    const fetchDetail =  async() => {
      if (stateDetail.id === 0) {
        const DetailProduct: any = await fetchProduct(numberId);
      setStateDetail(DetailProduct[0]);
      }
      
    };
    fetchDetail();
  }, [searchId, stateDetail]);

  const handleChangeColor = (color: string) => {
    setSelectedColor(color);
    setSelectedSize(null);
  };

  const handleChangeSize = (size: string) => {
    setSelectedSize(size);
  };
  const isOutOfStock = stateDetail.colors.every((color) =>
    color.sizes.every((size) => size.quantity === 0)
  );
  

  const renderSelectedInfo = () => (
    <div
      className={`flex flex-row gap-2 ${
        selectedColor && selectedSize
          ? "translate-y-0 visible blur-none"
          : "-translate-y-4 invisible blur-lg"
      } transition-all bg-pink-400 p-5 rounded duration-500`}
    >
      <p className="font-tiltneon text-sm lg:text-xl text-pink-50">
        Selected Color: {selectedColor}
      </p>
      <p className="font-tiltneon text-sm lg:text-xl text-pink-50">
        Selected Size: {selectedSize}
      </p>
    </div>
  );

  return (
    <div className="grid grid-cols-3 lg:grid-cols-5 col-span-3 gap-3">
      {/* Left: Image Thumbnails */}
      <ImagesDetail stateDetail={stateDetail} setStateDetail={setStateDetail}/>

      {/* Center: Main Product Information */}
      <div className="col-span-2 flex flex-col items-center gap-3">
        <p className="font-tiltneon text-2xl lg:text-3xl text-pink-950 font-semibold">
          {stateDetail.name}
        </p>
        <Image
          src={stateDetail.images[0]} // Imagen principal
          alt="Main product image"
          className="rounded w-[18.25rem] lg:w-[24.25rem] h-[18.25rem] lg:h-[24.25rem] ring-2 ring-pink-300 bg-transparent"
          width={880}
          height={800}
        />
        {renderSelectedInfo()}
      </div>

      {/* Right: Product Details and Actions */}
      <div className="col-span-3 relative lg:col-span-2 flex flex-col gap-3 top-10">
        <div className="font-tiltneon text-xl text-pink-950">
          Category:
          <span className="font-light text-gray-950 px-2">
            - {stateDetail.clasification}
          </span>
        </div>
        <div className="font-tiltneon w-[90%] text-xl text-pink-950">
          Description:
          <p className="font-light text-gray-950">
            - {stateDetail.description}
          </p>
        </div>
        <div className="font-tiltneon text-xl text-pink-950">
          Price:
          <span className="font-light text-gray-950 px-2">
            - ${stateDetail.price}
          </span>
        </div>

        <div className="flex flex-col justify-start gap-3 items-start">
          <SelectButtons
            handleChangeColor={handleChangeColor}
            handleChangeSize={handleChangeSize}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            colors={stateDetail.colors}
          />
          <AddToCart
            selectedColor={selectedColor}
            selectedSize={selectedSize}
          />
        </div>
      </div>
    </div>
  );
};

export default FirstView;
