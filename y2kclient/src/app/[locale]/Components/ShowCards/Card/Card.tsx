import Image from "next/image";

interface CardProductProps {
    id: number;
    title: string;
    price: number;
    image: string;
  }

const CardProduct: React.FC<CardProductProps> = ({ id, title, price, image }) => {
    return (
      
        <div className="p-4 bg-gray-400 rounded-md gap-3 z-5 select-none flex flex-col min-h-68">
          <p>{title}</p>
          <Image
            width={680}
            height={400}
            src={image}
            className="rounded-full w-[8.25rem] h-[8.25rem] bg-transparent"
            alt="no image"
          />
          <p>${price}</p>
        </div>
    );
  }
  
  export default CardProduct;