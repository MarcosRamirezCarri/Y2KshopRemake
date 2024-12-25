import { CartItem } from "@/helpers/types/CartItem";
import Image from "next/image";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { changeCartState } from "@/lib/actions/CartActions/changeCartState";
import { getAllCarts } from "@/lib/actions/AdminActions/getAllCarts";

interface TaskCardProps {
  cartItem: CartItem;
  handleClick: (arg: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ cartItem, handleClick }) => {
  const dispatch = useAppDispatch();

  const handleState = (state: string) => {
    dispatch(changeCartState(cartItem.userId, cartItem.id, state)).then((response: any) => {
      if (response.success) {
        dispatch(getAllCarts());
      }
    });
  };

  const isDisabled = cartItem.state === "approved" || cartItem.state === "sended";

  const getStateLabel = () => {
    switch (cartItem.state) {
      case "pending":
        return "Pending Approval";
      case "approved":
        return "Approved";
      case "sended":
        return "Sended to destiny";
      default:
        return "Error";
    }
  };

  const buttonStyles = (disabled: boolean) =>
    `relative self-center px-4 py-2 rounded-[1rem] font-normal transition-all duration-300 ${
      disabled
        ? "bg-orange-400/[0.4] text-orange-950/[0.8]"
        : "bg-orange-400/[0.8] hover:scale-105 hover:ring-2 hover:ring-orange-500"
    }`;

  return (
    <div className="bg-Lightblue-200 ring-2 ring-Lightblue-300 rounded-md grid grid-cols-3">
      <div className="flex flex-col items-center font-tiltneon text-md lg:text-xl text-Lightblue-950 font-semibold">
        <Image
          alt="history"
          width={200}
          height={150}
          src={cartItem.Product?.images[0] || "/placeholder.png"}
          className="rounded w-[6.25rem] ring-2 ring-Lightblue-400 m-2 h-[6.25rem] bg-transparent"
        />
        <p>{cartItem.Product?.name || "Unknown Product"}</p>
      </div>
      <div className="flex flex-col justify-center font-tiltneon text-md lg:text-2xl gap-4 text-Lightblue-950">
        <p>Color: {cartItem.color}</p>
        <p>Size: {cartItem.size}</p>
        <button
          className="self-start decoration-Lightblue-200 transition-all duration-150 underline hover:decoration-Lightblue-900"
          onClick={() => handleClick(cartItem.userId)}
        >
          Destiny
        </button>
      </div>
      <div className="flex flex-col justify-center font-tiltneon p-1 text-md lg:text-2xl gap-2 text-orange-950">
        {cartItem.state === "sended" && (
          <button
            onClick={() => handleState("deleteItem")}
            className="absolute start-[95%] transition-all duration-300 px-2 rounded-xl bg-orange-400/[0.8] hover:scale-105 hover:ring-2 hover:ring-orange-500"
          >
            &times;
          </button>
        )}
        <p className="text-base self-end font-medium p-2">Last Update: {cartItem.lastUpdate}</p>
        <p>State: {getStateLabel()}</p>
        {cartItem.state === "approved" && <p>Pending sending</p>}
        <div className="flex flex-row gap-2">
          <button onClick={() => handleState("adminCancel")} disabled={isDisabled} className={buttonStyles(isDisabled)}>
            Deny
          </button>
          <button onClick={() => handleState("approved")} disabled={isDisabled} className={buttonStyles(isDisabled)}>
            Approve
          </button>
          <button
            onClick={() => handleState("sended")}
            disabled={cartItem.state !== "approved"}
            className={buttonStyles(cartItem.state !== "approved")}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
