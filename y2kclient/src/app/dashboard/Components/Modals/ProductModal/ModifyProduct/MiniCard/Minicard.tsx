import Image from "next/image";

interface MiniCardProps {
  setStateProduct: (productId:number) => void 
  id: number,
  name: string,
  price: number,
  images: string[]
  stateProduct: number
}

const MiniCard: React.FC<MiniCardProps> = ({ id, name, price, images, setStateProduct, stateProduct }) => {
    return (
      
        <div onClick={() =>setStateProduct(id)} className={`p-4 max-w-[8rem] m-5 ${
          stateProduct === id ? 'ring-2 ring-Lightblue-600  bg-Lightblue-300':' bg-Lightblue-100'
        } gap-3 z-5 select-none flex flex-col min-h-68 transition-all duration-300 hover:scale-105 hover:ring-2 ring-Lightblue-300`} >
          <p className="font-titilium text-sm absolute text-Lightblue-950 font-semibold">id: {id}</p>
          <Image
            width={380}
            height={200}
            src={images[0]}
            className="rounded w-[6.25rem] ring-2 ring-Lightblue-200 h-[6.25rem] bg-transparent"
            alt="no image"
          />
          <p className="font-titilium text-md text-Lightblue-900 font-semibold">{name}</p>
        </div>
    );
  }
  
  export default MiniCard;