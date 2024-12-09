import { Product } from "@/helpers/Types";
import Image from "next/image";

const CardProductControl: React.FC<Product> = ({
  name,
  id,
  colors,
  images,
  price,
  clasification,
}) => {
  return (
    <div className="p-5 rounded-md bg-Lightblue-200 z-5 select-none grid grid-cols-3 transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-Lightblue-300">
      <div className="flex flex-col gap-1">
        <p className="font-tiltneon text-xl text-Lightblue-900 font-semibold">
          {name}
        </p>

        <Image
          width={680}
          height={400}
          src={images[0]}
          className="rounded-md w-[7.25rem] ring-2 ring-Lightblue-200 h-[7.25rem] bg-transparent"
          alt="no image"
        />

        <p className="font-tiltneon text-md text-Lightblue-800 font-semibold">
          {clasification}
        </p>
      </div>
      <div className={`grid grid-cols-[${colors.length}] gap-1`}>
        <p className={`font-tiltneon col-span-2 text-lg text-Lightblue-900 font-semibold`}>
          Colors and Sizes:
        </p>
        {colors.map((color, index) => (
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
                  Size: {size.size}, Quantity: {size.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div>
        <p className="font-tiltneon text-xl text-Lightblue-900 font-semibold">
          ${price}
        </p>
      </div>
    </div>
  );
};

export default CardProductControl;
