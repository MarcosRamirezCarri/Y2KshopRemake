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
  const isOutOfStock = product.colors.every((color) =>
    color.sizes.every((size) => size.quantity === 0)
  );

  const handlePreventClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isOutOfStock) {
      e.preventDefault(); // Evita la redirección
    }
  };

  return (
    <div
      className={`p-2 rounded-md max-w-[20rem] ${
        isOutOfStock
          ? "bg-orange-200 hover:ring-2 cursor-not-allowed ring-orange-400"
          : "bg-Lightblue-200 hover:ring-2 hover:ring-Lightblue-300"
      } gap-4 z-5 select-none flex flex-col  transition-all duration-300 hover:scale-105 `}
    >
      <p className="font-tiltneon text-xl text-Lightblue-900 font-semibold">
        {product.name}
      </p>
      <Link
        href={isOutOfStock ? "#" : { pathname: "/detail", query: { id } }}
        onClick={handlePreventClick}
      >
        <Image
          width={680}
          height={400}
          src={product.images[0]}
          className={`rounded-md w-[15.25rem] ring-2 ${
            isOutOfStock
              ? "cursor-not-allowed ring-orange-200 blur-sm"
              : " ring-Lightblue-200"
          }  h-[14.25rem] bg-transparent`}
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
          {isOutOfStock && (
            <p className="text-red-700 text-center font-semibold">
              Out of Stock!
            </p>
          )}
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
