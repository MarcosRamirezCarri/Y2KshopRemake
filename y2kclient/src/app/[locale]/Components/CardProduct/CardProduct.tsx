import Image from "next/image";
import Link from "next/link";
import { Product } from "@/helpers/types/Types";

interface CardProductProps {
  product: Product;
  place: string;
}

const CardProductComplete: React.FC<CardProductProps> = ({
  product,
  place,
}) => {
  const id: number = product.id;
  return (
    <div className="p-2 rounded-md max-w-[20rem] bg-Lightblue-200 gap-4 z-5 select-none flex flex-col transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-Lightblue-300">
      <p className="font-tiltneon text-xl text-Lightblue-900 font-semibold">
        {product.name}
      </p>
      <Link href={{ pathname: "/detail", query: { id } }}>
        <Image
          width={680}
          height={400}
          src={product.images[0]}
          className="rounded-md w-[15.25rem] ring-2 ring-Lightblue-200 h-[14.25rem] bg-transparent"
          alt="no image"
        />
        <div className="flex flex-row justify-between">
          <p
            className={`${
              place === "products" ? "visible " : "hidden"
            } font-tiltneon text-md text-Lightblue-800 font-semibold`}
          >
            {product.clasification}
          </p>
          <p
            className={` ${
              place === "products" ? "visible " : "hidden"
            } font-tiltneon text-xl text-Lightblue-900 font-semibold`}
          >
            ${product.price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default CardProductComplete;
