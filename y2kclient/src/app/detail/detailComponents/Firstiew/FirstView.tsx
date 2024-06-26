import Image from "next/image";
import style from './FirstView.module.css'
import { useState } from "react";

interface DetailProducts {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  sizes: string[];
  handleAddToCart: any;
  handleChangeSize: any;
  selectedSize: string;
}

const FirstView: React.FC<DetailProducts> = ({
  title,
  price,
  image,
  description,
  category,
  sizes,
  handleAddToCart,
  selectedSize,
  handleChangeSize,
}) => {
const [sizesState, setSizesState] = useState(false)

const handleSizes = () =>{
  setSizesState(!sizesState)
}

  return (
    <div className="grid grid-cols-3 lg:grid-cols-5 col-span-3 w-[100%] gap-3">
      <div className="col-span-1 flex flex-col relative items-center py-0 top-20 lg:top-0 lg:py-10 gap-5">
        <Image
          width={880}
          height={800}
          src={image}
          className="rounded w-[4.25rem] lg:w-[7.25rem] ring-2 ring-pink-200 h-[4.25rem] lg:h-[7.25rem] bg-transparent"
          alt="no image"
        />
        <Image
          width={880}
          height={800}
          src={image}
          className="rounded w-[4.25rem] lg:w-[7.25rem] ring-2 ring-pink-200 h-[4.25rem] lg:h-[7.25rem] bg-transparent"
          alt="no image"
        />
        <Image
          width={880}
          height={800}
          src={image}
          className="rounded w-[4.25rem] lg:w-[7.25rem] ring-2 ring-pink-200 h-[4.25rem] lg:h-[7.25rem] bg-transparent"
          alt="no image"
        />
      </div>
      <div className="col-span-2 flex flex-col items-center gap-3 ">
        <p className="font-tiltneon text-2xl lg:text-3xl text-pink-950 font-semibold">
          {title}
        </p>
        <Image
          width={880}
          height={800}
          src={image}
          className="rounded w-[20.25rem] lg:w-[24.25rem] ring-2 ring-pink-300 h-[20.25rem] lg:h-[24.25rem] bg-transparent"
          alt="no image"
        />
      </div>

      <div className="flex flex-col p-6 justify-center items-left col-span-3 lg:col-span-2 gap-3">
        <p className="font-tiltneon text-xl text-pink-950 font-normal flex flex-row">
          Category:{" "}
          <p className="font-tiltneon text-lg text-gray-800 text-justify font-light px-2">
            - {category}
          </p>
        </p>

        <p className="font-tiltneon text-xl text-pink-950 font-normal flex flex-row ">
          Description:
        </p>
        <p className="font-tiltneon text-lg text-gray-800 text-justify font-light">
          - {description}
        </p>
        <p className="font-tiltneon text-xl text-pink-950 font-normal flex flex-row">
          Price:{" "}
          <p className="font-tiltneon text-lg text-gray-800 text-justify font-light px-2">
            - ${price}
          </p>
        </p>
        <p className="font-tiltneon text-xl text-pink-950 font-normal flex flex-row">Selected Size:{' '} {selectedSize}</p>
  
        <button
          onClick={() => handleAddToCart()}
          className="relative self-end bg-pink-400 px-6 py-4 rounded-[1.25rem] font-tiltneon text-xl text-pink-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-pink-200"
        >
          Add to cart
        </button>
        <div className="relative self-end flex flex-col items-center p-2  font-normal">
        <button
          className={`underline  px-3 py-4 rounded-[1.25rem] font-tiltneon text-lg lg:text-xl text-pink-950 
      ${
        sizesState === true
          ? "bg-pink-300 decoration-pink-300"
          : "bg-pink-400 decoration-pink-400 "
      } hover:decoration-pink-900 transition-colors duration-200`}
          onClick={handleSizes}
        >
          Select Size
        </button>
        {sizesState ? (
          <div className="absolute top-[4.50rem] flex flex-row lg:flex-col gap-2">
    
            {sizes.map((size: string, index: any) => (
              <div className={style.OnlyDropDown}>
                <div
                  className={`relative caret-blue-200 px-3 py-1 ${selectedSize === size ? 'bg-pink-400' : 'bg-pink-300' } rounded-[1.25rem] font-tiltneon text-md lg:text-lg text-pink-950 font-normal transition-all duration-300 after:rounded hover:scale-105 hover:ring-2 hover:ring-pink-200`}
                  key={index}
                  onClick={() => handleChangeSize(size)}
                >
                  {size}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      </div>
    </div>
  );
};

export default FirstView;
