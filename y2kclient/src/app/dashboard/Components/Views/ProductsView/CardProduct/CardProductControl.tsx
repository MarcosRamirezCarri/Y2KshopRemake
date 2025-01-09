import { Product } from "@/helpers/types/Types";
import Image from "next/image";

interface ControlProps {
  product: Product;
  handleModify: (arg: Product) => void;
  handleDelete: (arg: number, arg2: string) => void;
}

const CardProductControl: React.FC<ControlProps> = ({
  product,
  handleModify,
  handleDelete,
}) => {

  const isOutOfStock = product.colors.every((color) =>
    color.sizes.every((size) => size.quantity === 0)
  );

  return (
    <div
      className={`p-4 col-span-1 shadow-md rounded-md select-none grid grid-cols-3 transition-all duration-300 ${
        isOutOfStock
          ? "bg-orange-200 ring-2 ring-orange-300"
          : "bg-Lightblue-200 hover:ring-2 hover:ring-Lightblue-300"
      }`}
    >
      <div className="flex flex-col gap-1">
        <p className="text-xl text-Lightblue-900 font-semibold">
          {product.name}
        </p>

        <Image
          width={680}
          height={400}
          src={product.images[0]}
          className="rounded-md w-[7.25rem] ring-2 ring-Lightblue-200 h-[7.25rem] bg-transparent"
          alt="no image"
        />

        <p className="text-md text-Lightblue-800 font-semibold">
          {product.clasification}
        </p>
      </div>
      <div className={`grid grid-cols-${product.colors.length} gap-1`}>
        <p
          className={`col-span-${product.colors.length} text-md text-Lightblue-900 font-semibold`}
        >
          Colors, Sizes and Quantity:
        </p>
        {product.colors.map((color, index) => (
          <div key={index} className="mt-2">
            <p className="text-md text-Lightblue-800 font-semibold">
              {color.color}
            </p>
            <ul className="ml-4 list-disc">
              {color.sizes.map((size, idx) => (
                <li key={idx} className="text-sm text-Lightblue-700">
                  {size.size}: {size.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 items-center justify-center">
        {isOutOfStock && (
          <p className="text-red-700 text-center font-semibold">
            Out of Stock!
          </p>
        )}
        <button
          onClick={() => handleModify(product)}
          className="relative bg-orange-300 px-4 py-2 w-[90%] rounded-xl text-lg lg:text-xl text-orange-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-orange-500"
        >
          Modify
        </button>
        <button
          onClick={() => handleDelete(product.id, product.name)}
          className="relative bg-orange-300 px-4 py-2 w-[90%] rounded-xl text-lg lg:text-xl text-orange-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-orange-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CardProductControl;