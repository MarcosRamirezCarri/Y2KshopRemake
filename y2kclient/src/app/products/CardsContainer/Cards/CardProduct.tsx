import Image from "next/image";
import Link from "next/link";

interface CartProductsProps {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  sizes: string[]
}

const CardProductComplete: React.FC<CartProductsProps> = ({
  id,
  title,
  category,
  price,
  image,
  sizes
}) => {
  return (
    <div className="p-5 rounded-md max-w-[20rem] bg-Lightblue-200 gap-4 z-5 select-none flex flex-col transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-Lightblue-300">
       <p className="font-tiltneon text-xl text-Lightblue-900 font-semibold">
            {title}
          </p>
      <Link href={{ pathname: "/detail", query: { id } }}>
        <Image
          width={680}
          height={400}
          src={image}
          className="rounded-md w-[15.25rem] ring-2 ring-Lightblue-200 h-[14.25rem] bg-transparent"
          alt="no image"
        />
        <div className="flex flex-row justify-between">
        
          <p className="font-tiltneon text-md text-Lightblue-800 font-semibold">
        {category}
      </p>
          <p className="font-tiltneon text-xl text-Lightblue-900 font-semibold">
            ${price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default CardProductComplete;
