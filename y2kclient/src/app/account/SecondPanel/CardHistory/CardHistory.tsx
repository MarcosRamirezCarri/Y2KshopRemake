import Image from "next/image";
import { History } from "@/helpers/Types";

const CardHistory: React.FC<History> = ({
  name,
  color,
  size,
  images,
  productId,
  quantity,
  state,
}) => {
  return (
    <div className="bg-Lightblue-200 ring-2 ring-Lightblue-400 rounded-md grid grid-cols-3">
      <div className="flex flex-col items-center font-tiltneon text-md lg:text-xl text-Lightblue-950 font-semibold">
        <Image
          alt="history"
          width={200}
          height={150}
          src={images[0]}
          className="rounded w-[6.25rem] ring-2 ring-Lightblue-400  m-2 ring-Lightblue-200 h-[6.25rem] bg-transparent"
        />
        <p>{name}</p>
      </div>
      <div className="flex flex-col justify-center font-tiltneon text-md lg:text-2xl gap-4 text-Lightblue-950">
        <p>Color: {color}</p>
        <p>Size: {size}</p>
      </div>
      <div className="flex flex-col justify-center font-tiltneon text-md lg:text-2xl gap-2 text-Lightblue-950 ">
        <div className="flex flex-row gap-2">
          State: {state === "inDispatch" ? <p>In Dispatch</p> : <p>error</p>}
        </div>
        <button className="relative self-center bg-Lightblue-400 px-4 py-2 rounded-[1rem]  font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-Lightblue-500">Cancel</button>
      </div>
    </div>
  );
};

export default CardHistory;
