"use client";
import Image from "next/image";
import { Product } from "@/helpers/types/Types";
import { useState } from "react";
import SelectButtons from "./Buttons/SelectButton/SelectButton";
import ImagesDetail from "./Images/imagesDetail";
import AddToCart from "./Buttons/AddToCart/AddToCartbtn";

interface FirstViewProps {
  product: Product
}

const FirstView: React.FC<FirstViewProps> = ({product}) => {
  const [stateImg, setStateImg] = useState<string[]>(product.images);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  

  const handleChangeColor = (color: string) => {
    setSelectedColor(color);
    setSelectedSize(null);
  };

  const handleChangeSize = (size: string) => {
    setSelectedSize(size);
  };
  const isOutOfStock = product.colors.every((color) =>
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
      <ImagesDetail stateImg={stateImg} setStateImg={setStateImg}/>

 
      <div className="col-span-2 flex flex-col items-center gap-3">
        <p className="font-tiltneon text-2xl lg:text-3xl text-pink-950 font-semibold">
          {product.name}
        </p>
        <Image
          src={stateImg[0]} 
          alt="Main product image"
          className="rounded w-[18.25rem] lg:w-[24.25rem] h-[18.25rem] lg:h-[24.25rem] ring-2 ring-pink-300 bg-transparent"
          width={880}
          height={800}
        />
        {renderSelectedInfo()}
      </div>

      <div className="col-span-3 relative lg:col-span-2 flex flex-col gap-3 top-10">
        <div className="font-tiltneon text-xl text-pink-950">
          Category:
          <span className="font-light text-gray-950 px-2">
            - {product.clasification}
          </span>
        </div>
        <div className="font-tiltneon w-[90%] text-xl text-pink-950">
          Description:
          <p className="font-light text-gray-950">
            - {product.description}
          </p>
        </div>
        <div className="font-tiltneon text-xl text-pink-950">
          Price:
          <span className="font-light text-gray-950 px-2">
            - ${product.price}
          </span>
        </div>

        <div className="flex flex-col justify-start gap-3 items-start">
          <SelectButtons
            handleChangeColor={handleChangeColor}
            handleChangeSize={handleChangeSize}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            colors={product.colors}
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
