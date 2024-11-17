import { CartItem } from "@/helpers/Types";
import Image from "next/image";

const TaskCard: React.FC<CartItem> = ({
  Product,
  productId,
  color,
  size,
  state,
}) => {
  return (
    <div className="bg-Lightblue-200 ring-2 ring-Lightblue-400 rounded-md grid grid-cols-3">
      <div className="flex flex-col items-center font-tiltneon text-md lg:text-xl text-Lightblue-950 font-semibold">
        <Image
          alt="history"
          width={200}
          height={150}
          src={Product?.images[0]}
          className="rounded w-[6.25rem] ring-2 ring-Lightblue-400  m-2 ring-Lightblue-200 h-[6.25rem] bg-transparent"
        />
        <p>{Product?.name}</p>
      </div>
      <div className="flex flex-col justify-center font-tiltneon text-md lg:text-2xl gap-4 text-Lightblue-950">
        <p>Color: {color}</p>
        <p>Size: {size}</p>
      </div>
      <div className="flex flex-col justify-center font-tiltneon text-md lg:text-2xl gap-2 text-orange-950 ">
        <div className="flex flex-row gap-2">
          State: {state === "inDispatch" ? <p>In Dispatch</p> : <p>error</p>}
        </div>
        <div className="flex flex-row gap-2">
          <button disabled={state === "approved"}
            className={`relative self-center  px-4 py-2 rounded-[1rem]  font-normal transition-all duration-300 ${
              state === "approved"
                ? "bg-orange-400/[0.4] text-orange-950/[0.8]"
                : " bg-orange-400/[0.8]  hover:scale-105 hover:ring-2 hover:ring-orange-500"
            } `}>
            Cancel
          </button>
          <button className="relative self-center bg-orange-400/[0.8] px-4 py-2 rounded-[1rem]  font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-orange-500">
            Approve
          </button>
          <button
            disabled={state !== "approved"}
            className={`relative self-center  px-4 py-2 rounded-[1rem]  font-normal transition-all duration-300 ${
              state !== "approved"
                ? "bg-orange-400/[0.4] text-orange-950/[0.8]"
                : " bg-orange-400/[0.8]  hover:scale-105 hover:ring-2 hover:ring-orange-500"
            } `}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
