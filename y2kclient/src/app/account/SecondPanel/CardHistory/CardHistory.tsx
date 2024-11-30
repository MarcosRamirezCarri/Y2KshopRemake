import Image from "next/image";
import { useAppDispatch } from "@/lib/hooks/hooks";
import changeCartState from "@/lib/actions/CartActions/changeCartState";
import setUserFromId from "@/lib/actions/AccountActions/getUserFromId";
import Swal from "sweetalert2";
import { History } from "@/helpers/Types";

const CardHistory: React.FC<History> = ({
  name,
  color,
  size,
  images,
  itemId,
  productId,
  quantity,
  state,
  lastUpdate,
}) => {
  const dispatch = useAppDispatch();

  const userId = localStorage.getItem("userId");
  const numberUserId = Number(userId);

  const handleCancel = () => {
    const state = "cancel";
    Swal.fire({
      title: `Cancel your order of ${name}?`,
      text: `Size: ${size}, Color: ${color}`,
      showDenyButton: true,
      confirmButtonText: "Cancel Order",
      denyButtonText: "Regret",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(changeCartState(numberUserId, itemId, state)).then(
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
        <button
          onClick={handleCancel}
          className="relative self-center bg-Lightblue-400 px-4 py-2 rounded-[1rem]  font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-Lightblue-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CardHistory;
