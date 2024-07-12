import Image from "next/image";
import Product from "@/helpers/Types";



const CartCard: React.FC<Product> = ({
  id,
  name,
  clasification,
  price,
  images,
}) => {
  return (
    <div className="grid grid-cols-6 p-5 w-[100%] rounded-md gap-[1rem] bg-Lightblue-100 border-2 border-Lightblue-800">
      <div className="col-span-2">
        <Image
          width={680}
          height={680}
          src={images[0]}
          className="rounded w-[10.25rem] ring-2 ring-Lightblue-200 h-[10.25rem] bg-transparent"
          alt="no image"
        />
      </div>
      <div className="col-span-4 lg:col-span-2 flex flex-col gap-3">
        <p className="font-tiltneon text-lg lg:text-2xl text-Lightblue-950 font-bold">
          Product Details:
        </p>
        <p className="font-tiltneon text-md lg:text-xl text-Lightblue-950 font-semibold">
          {name}
        </p>
        <p className="font-tiltneon text-md lg:text-xl text-Lightblue-950 font-semibold">
          {clasification}
        </p>
        <p className="font-tiltneon text-md lg:text-xl text-Lightblue-950 font-semibold">
          ${price}
        </p>
        <div className="flex flex-row gap-2 lg:hidden">
        <button className="relative self-end bg-pink-300 px-2  py-1 rounded-[1.25rem] font-tiltneon text-md text-pink-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-pink-200">
          Buy
        </button>
        <button className="relative self-end bg-pink-300 px-2  py-1 rounded-[1.25rem] font-tiltneon text-md text-pink-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-pink-200">
        Discard
        </button>
        <button className="relative self-end bg-pink-300 px-2  py-1 rounded-[1.25rem] font-tiltneon text-md text-pink-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-pink-200">
         Modify
        </button>
        </div>
        
      </div>

      <div className="lg:col-span-2  gap-3 hidden lg:flex lg:flex-col">
        <button className="relative bg-pink-300 px-4 py-2 rounded-[1.25rem] font-tiltneon text-lg lg:text-xl text-pink-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-pink-200">
          Buy
        </button>
        <button className="relative bg-pink-300 px-4 py-2 rounded-[1.25rem] font-tiltneon text-lg lg:text-xl text-pink-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-pink-200">
          Discard
        </button>
        <button className="relative bg-pink-300 px-4 py-2 rounded-[1.25rem] font-tiltneon text-lg lg:text-xl text-pink-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-pink-200">
          Modify
        </button>
      </div>
    </div>
  );
};

export default CartCard;
