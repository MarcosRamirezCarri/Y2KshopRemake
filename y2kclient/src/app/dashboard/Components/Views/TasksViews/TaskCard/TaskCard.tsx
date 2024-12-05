import { CartItem } from "@/helpers/Types";
import Image from "next/image";
import { useAppDispatch } from "@/lib/hooks/hooks";
import changeCartState from "@/lib/actions/CartActions/changeCartState";
import { getAllCarts } from "@/lib/actions/AdminActions/getAllCarts";

const TaskCard: React.FC<CartItem | any> = ({
  Product,
  productId,
  color,
  size,
  state,
  userId,
  id,
  lastUpdate,
  handleClick
}) => {
  const dispatch = useAppDispatch();

  const handleState = (state: string) => {
    dispatch(changeCartState(userId, id, state)).then((response: any) => {
      if (response.success) {
        dispatch(getAllCarts());
      }
    });
  };


 

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
        <button className="self-start decoration-Lightblue-200 transtition-all duration-150 underline hover:decoration-Lightblue-900" onClick={() =>handleClick(userId)}>Destiny</button>
      </div>
      <div className="flex flex-col justify-center font-tiltneon text-md lg:text-2xl gap-2 text-orange-950 ">
      <p className="text-base self-end font-medium p-2">Last Update: {lastUpdate}</p>
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
        <div className="flex flex-row gap-2">
        
          <button
            onClick={() => handleState("adminCancel")}
            disabled={state === "approved" || state === "sended"}
            className={`relative self-center  px-4 py-2 rounded-[1rem]  font-normal transition-all duration-300 ${
              state === "approved" || state === "sended"
                ? "bg-orange-400/[0.4] text-orange-950/[0.8]"
                : " bg-orange-400/[0.8]  hover:scale-105 hover:ring-2 hover:ring-orange-500"
            } `}
          >
            Deny
          </button>
          <button
            onClick={() => handleState("approved")}
            disabled={state === "approved" || state === "sended"}
            className={`relative self-center  px-4 py-2 rounded-[1rem]  font-normal transition-all duration-300 ${
              state === "approved" || state === "sended"
                ? "bg-orange-400/[0.4] text-orange-950/[0.8]"
                : " bg-orange-400/[0.8]  hover:scale-105 hover:ring-2 hover:ring-orange-500"
            } `}
          >
            Approve
          </button>
          <button
            onClick={() => handleState("sended")}
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
