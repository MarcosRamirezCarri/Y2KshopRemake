import { History } from "@/helpers/Types";
import Image from "next/image";

const HistoryCard: React.FC<History> = ({
  name,
  color,
  size,
  images,
  itemId,
  productId,
  quantity,
  state,
}) =>{
    return (
        <div className="bg-Lightblue-200 p-2 ring-2 ring-Lightblue-400 rounded-md grid grid-cols-3">
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
      <div className="flex flex-col justify-center font-tiltneon text-md lg:text-xl gap-2 text-Lightblue-950 ">
        <div className="flex flex-row gap-2">
          State:{" "}
          {state === "pending" ? (
            <p>Pending Approval</p>
          ) : state === "approved" ? (
            <p>Approved</p>
          ) : state === "sended" ? (
            <p>Sended to destiny</p>
          ) : (
            <p>error</p>
          )}
        </div>
        {state === "approved" ? <p> Pending sending </p> : null}
      </div>
    </div>
    )
}

export default HistoryCard