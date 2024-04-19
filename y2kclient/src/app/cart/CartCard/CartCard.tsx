import Image from "next/image";

interface CartProductsProps {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

const CartCard: React.FC<CartProductsProps> = ({
  id,
  title,
  category,
  price,
  image,
}) => {
  return (
    <div className="grid grid-cols-6 p-5 w-[100%] rounded-md gap-[1rem] bg-blue-100 border-2 border-blue-800">
      <div className="col-span-2">
        <Image
          width={680}
          height={680}
          src={image}
          className="rounded w-[10.25rem] ring-2 ring-blue-200 h-[10.25rem] bg-transparent"
          alt="no image"
        />
      </div>
      <div className="col-span-4 lg:col-span-2 flex flex-col gap-3">
        <p className="font-tiltneon text-lg lg:text-2xl text-blue-950 font-bold">
          Product Details:
        </p>
        <p className="font-tiltneon text-md lg:text-xl text-blue-950 font-semibold">
          {title}
        </p>
        <p className="font-tiltneon text-md lg:text-xl text-blue-950 font-semibold">
          {category}
        </p>
        <p className="font-tiltneon text-md lg:text-xl text-blue-950 font-semibold">
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
