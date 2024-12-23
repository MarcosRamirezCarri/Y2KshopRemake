import Image from "next/image";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { changeCartState } from "@/lib/actions/CartActions/changeCartState";
import setUserFromId from "@/lib/actions/AccountActions/getUserFromId";
import Swal from "sweetalert2";
import { History } from "@/helpers/types/Account";

interface CardHistoryProps {
  history: History;
  place: string;
}

const CardHistory: React.FC<CardHistoryProps> = ({ history, place }) => {
  const dispatch = useAppDispatch();

  const userId = localStorage.getItem("userId");
  const numberUserId = Number(userId);

  const handleCancel = () => {
    const state = "cancel";
    Swal.fire({
      title: `Cancel your order of ${history.name}?`,
      text: `Size: ${history.size}, Color: ${history.color}`,
      showDenyButton: true,
      confirmButtonText: "Cancel Order",
      denyButtonText: "Regret",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(changeCartState(numberUserId, history.itemId, state)).then(
          (response: any) => {
            if (response.success) {
              dispatch(setUserFromId(numberUserId));
              Swal.fire(`Product cancelled with success!`, "", "success");
            } else {
              Swal.fire("An error Occurried!", "", "info");
            }
          }
        );
      } else {
        Swal.fire("An error Occurried!", "", "info");
      }
    });
  };

  return (
    <div className="bg-Lightblue-200 p-2 ring-2 gap-2 ring-Lightblue-400 rounded-md grid grid-cols-3">
      <div className="flex col-span-1 flex-col items-center font-tiltneon text-md lg:text-xl text-Lightblue-950 font-semibold">
        <Image
          alt="history"
          width={200}
          height={150}
          src={history.images[0]}
          className="rounded lg:w-[6.25rem] w-[4.35rem] h-[4.35rem] ring-2 ring-Lightblue-400  m-2 ring-Lightblue-200 lg:h-[6.25rem] bg-transparent"
        />
        <p>{history.name}</p>
      </div>
      <div className="flex flex-col col-span-1 justify-center font-tiltneon text-md lg:text-2xl gap-4 text-Lightblue-950">
        <p>Color: {history.color}</p>
        <p>Size: {history.size}</p>
      </div>
      <div className="flex flex-col col-span-1 justify-center font-tiltneon text-sm lg:text-xl gap-2 text-Lightblue-950 ">
        {place !== "AdminHistory" ? (
          <p className="text-xs lg:text-base self-end font-medium p-0 lg:p-2">
            Last Update: {history.lastUpdate}
          </p>
        ) : null}
        <div className="flex flex-row gap-2">
          State:{" "}
          {history.state === "pending" ? (
            <p>Pending Approval</p>
          ) : history.state === "approved" ? (
            <p>Approved</p>
          ) : history.state === "sended" ? (
            <p>Sended to destiny</p>
          ) : (
            <p>error</p>
          )}
        </div>
        {history.state === "approved" ? (
          <p className="hidden lg:contents"> Pending sending </p>
        ) : null}
        {place === "UserHistory" ? (
          <button
            onClick={handleCancel}
            className="relative self-center bg-Lightblue-400 px-4 py-2 rounded-[1rem]  font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-Lightblue-500"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default CardHistory;
