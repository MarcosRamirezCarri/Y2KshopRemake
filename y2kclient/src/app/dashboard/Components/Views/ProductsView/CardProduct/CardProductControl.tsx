import { Product } from "@/helpers/types/Types";
import Image from "next/image";

interface ControlProps{
  product: Product;
  handleModify: (arg: Product) => void;
  handleDelete: (arg: number, arg2: string) => void;
}

const CardProductControl: React.FC<ControlProps> = ({
  product,
  handleModify,
  handleDelete
}) => {
  return (
    <div className="p-4 col-span-1 rounded-md bg-Lightblue-200 select-none grid grid-cols-3 transition-all duration-300 hover:ring-2 hover:ring-Lightblue-300">
      <div className="flex flex-col gap-1">
        <p className="font-tiltneon text-xl text-Lightblue-900 font-semibold">
          {product.name}
        </p>

        <Image
          width={680}
          height={400}
          src={product.images[0]}
          className="rounded-md w-[7.25rem] ring-2 ring-Lightblue-200 h-[7.25rem] bg-transparent"
          alt="no image"
        />

        <p className="font-tiltneon text-md text-Lightblue-800 font-semibold">
          {product.clasification}
        </p>
      </div>
      <div className={`grid grid-cols-[${product.colors.length}] gap-1`}>
        <p
          className={`font-tiltneon col-span-2 text-lg text-Lightblue-900 font-semibold`}
        >
          Colors and Sizes:
        </p>
        {product.colors.map((color, index) => (
          <div key={index} className="mt-2">
            <p className="font-tiltneon text-md text-Lightblue-800 font-semibold">
              Color: {color.color}
            </p>
            <ul className="ml-4 list-disc">
              {color.sizes.map((size, idx) => (
                <li
                  key={idx}
                  className="font-tiltneon text-sm text-Lightblue-700"
                >
                  {size.size}: {size.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 items-center justify-center">
        <button onClick={() => handleModify(product)} className="relative bg-orange-300 px-4 py-2 w-[90%] rounded-xl font-tiltneon text-lg lg:text-xl text-orange-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-orange-200">
          Modify
        </button>
        <button onClick={() => handleDelete(product.id, product.name)} className="relative bg-orange-300 px-4 py-2 w-[90%] rounded-xl font-tiltneon text-lg lg:text-xl text-orange-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-orange-200">
          Delete
        </button>
      </div>
    </div>
  );
};

export default CardProductControl;
