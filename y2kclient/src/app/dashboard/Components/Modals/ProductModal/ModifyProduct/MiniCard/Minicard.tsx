import Image from "next/image";
import Product from "@/helpers/Types";

interface MiniCardProps {
  setStateProduct: (product:any) => void 
  product: Product
  stateProduct: Product
}

const MiniCard: React.FC<MiniCardProps> = ({ product ,setStateProduct, stateProduct }) => {
    return (
      
        <div onClick={() =>setStateProduct(product)} className={`p-4 max-w-[8rem] m-5 ${
          stateProduct.id === product.id ? 'ring-2 ring-Lightblue-600  bg-Lightblue-300':' bg-Lightblue-100'
        } gap-3 z-5 select-none flex flex-col min-h-68 transition-all duration-300 hover:scale-105 hover:ring-2 ring-Lightblue-300`} >
          <p className="font-titilium text-sm absolute text-Lightblue-950 font-semibold">id: {product.id}</p>
          <Image
            width={380}
            height={200}
            src={product.images[0]}
            className="rounded w-[6.25rem] ring-2 ring-Lightblue-200 h-[6.25rem] bg-transparent"
            alt="no image"
          />
          <p className="font-titilium text-md text-Lightblue-900 font-semibold">{product.name}</p>
        </div>
    );
  }
  
  export default MiniCard;