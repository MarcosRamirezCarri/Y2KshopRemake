import Image from "next/image";
import Link from "next/link";

interface CardProductProps {
    id: number;
    title: string;
    price: number;
    image: string;
  }

const CardProduct: React.FC<CardProductProps> = ({ id, title, price, image }) => {
    return (
      
        <div className="p-4 max-w-[16rem] bg-blue-100 gap-3 z-5 select-none flex flex-col min-h-68 transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-color-blue-200" >
          <Link href={{pathname:'/detail',query:{id}}}>
          <Image
            width={680}
            height={400}
            src={image}
            className="rounded w-[14.25rem] ring-2 ring-blue-200 h-[14.25rem] bg-transparent"
            alt="no image"
          />
          <p className="font-titilium text-xl text-blue-900 font-semibold">{title}</p>
          </Link>
        </div>
    );
  }
  
  export default CardProduct;