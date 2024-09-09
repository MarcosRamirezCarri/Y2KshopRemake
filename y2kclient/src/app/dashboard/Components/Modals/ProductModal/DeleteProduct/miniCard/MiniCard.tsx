import Image from "next/image";
import Link from "next/link";
import Product from "@/helpers/Types";



const MiniCard: React.FC<Product> = ({ id, name, price, images }) => {
    return (
      
        <div className="p-4 max-w-[8rem] bg-Lightblue-100 gap-3 z-5 select-none flex flex-col min-h-68 transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-color-blue-200" >
          <Image
            width={380}
            height={200}
            src={images[0]}
            className="rounded w-[7.25rem] ring-2 ring-Lightblue-200 h-[7.25rem] bg-transparent"
            alt="no image"
          />
          <p className="font-titilium text-xl text-Lightblue-900 font-semibold">{name}</p>
        </div>
    );
  }
  
  export default MiniCard;