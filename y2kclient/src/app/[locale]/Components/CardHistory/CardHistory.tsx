import Image from "next/image";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { changeCartState } from "@/lib/actions/CartActions/changeCartState";
import {setUserFromId} from "@/lib/actions/AccountActions/getUserFromId";
import Swal from "sweetalert2";
import { History } from "@/helpers/types/Account";

interface CardHistoryProps {
  history: History;
  place: string;
}

const CardHistory: React.FC<CardHistoryProps> = ({ history, place }) => {
  const dispatch = useAppDispatch();
  const userId = localStorage.getItem("userId");
  const numberUserId = userId && !isNaN(Number(userId)) ? Number(userId) : null;

  if (!numberUserId) {
    Swal.fire("Invalid User ID", "Please login again.", "error");
    return null;
  }

  const handleCancel = () => {
    Swal.fire({
      title: `Cancel your order of ${history.name}?`,
      text: `Size: ${history.size}, Color: ${history.color}`,
      showDenyButton: true,
      confirmButtonText: "Cancel Order",
      denyButtonText: "Regret",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(changeCartState(numberUserId, history.itemId, "cancel")).then(
          (response: any) => {
            if (response.success) {
              dispatch(setUserFromId(numberUserId));
              Swal.fire("Product cancelled successfully!", "", "success");
            } else {
              Swal.fire("An error occurred!", "", "info");
            }
          }
        );
      }
    });
  };

  const renderState = (state: string) => {
    switch (state) {
      case "pending":
        return "Pending Approval";
      case "approved":
        return "Approved";
      case "sended":
        return "Sent to destiny";
      default:
        return "Error";
    }
  };

  return (
    <div className="select-none bg-Lightblue-200 p-2 ring-2 gap-2 ring-Lightblue-400 rounded-md grid grid-cols-3">
      {/* Product Image and Name */}
      <div className="flex col-span-1 flex-col items-center font-tiltneon text-md lg:text-xl text-Lightblue-950 font-semibold">
        <Image
          alt={history.name}
          width={200}
          height={150}
          src={history.images[0]}
          className="rounded lg:w-[6.25rem] w-[4.35rem] h-[4.35rem] ring-2 ring-Lightblue-200 lg:h-[6.25rem] bg-transparent"
        />
        <p>{history.name}</p>
      </div>

      {/* Product Details */}
      <div className="flex flex-col col-span-1 justify-center font-tiltneon text-md lg:text-2xl gap-4 text-Lightblue-950">
        <p>Color: {history.color}</p>
        <p>Size: {history.size}</p>
      </div>

      {/* Order State and Actions */}
      <div className="flex flex-col col-span-1 justify-center items-center font-tiltneon text-sm lg:text-xl gap-2 text-Lightblue-950">
        {place !== "AdminHistory" && (
          <p className="text-[0.62rem] lg:text-base self-end font-medium">
            {history.lastUpdate}
          </p>
        )}

          <p className="text-[0.75rem] lg:text-lg">{renderState(history.state)}</p>

        {history.state === "approved" && (
          <p className="hidden lg:block">Pending sending</p>
        )}
        {place === "UserHistory" && (
          <button
            onClick={handleCancel}
            className="relative self-center bg-Lightblue-400 px-4 py-2 rounded-[1rem] font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-Lightblue-500"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default CardHistory;