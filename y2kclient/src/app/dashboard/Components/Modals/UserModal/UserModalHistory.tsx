import { AccountType } from "@/helpers/Types";
import { Server } from "@/helpers/server";
import axios from "axios";
import { useEffect, useState } from "react";

import HistoryCard from "./HistoryCard/HistoryCard";

interface HistoryModalProps {
  state: boolean;
  userId: number;
  setState: (arg: boolean) => void;
}

const UserHistoryModal: React.FC<HistoryModalProps> = ({
  state,
  userId,
  setState,
}) => {
  const [stateUser, setStateUser] = useState<any>("No hay user");
  console.log(stateUser);


  useEffect(() => {
    const getUser = async (userId: number) => {
      try {
   
        const user = await axios.get(`${Server}/user/${userId}`);
        const userData = user.data;
        setStateUser(userData);
      } catch (error) {
        console.log(error);
      }
    };
    getUser(userId);
  }, []);

  return (
    <div
      onClick={() => setState(!state)}
      className={`fixed inset-0 flex z-[101] items-center  justify-center bg-gray-900/[0.4] ${
        state ? "visible" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-[60%] font-titilium bg-Lightblue-200 gap-2 justify-center transition-all duration-250 flex flex-col p-6 rounded-lg shadow-lg transition-all duration-300 ${
          state ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {stateUser !== "No hay user" ? (
          stateUser.history.length > 0 ? (
            stateUser?.history.map((his: any) => (
              <HistoryCard
                itemId={his.itemId}
                name={his.name}
                color={his.color}
                size={his.size}
                images={his.images}
                productId={his.productId}
                quantity={his.quantity}
                state={his.state}
              />
            ))
          ) : (
            <div>
              <p>No history</p>
            </div>
          )
        ) : (
          <div>
            <p>Error on </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHistoryModal;
