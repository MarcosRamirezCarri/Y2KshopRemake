import { AccountType } from "@/helpers/types/Account";
import { Server } from "@/helpers/services/server";
import { BsFillCartXFill } from "react-icons/bs";
import axios from "axios";
import { useEffect, useState } from "react";
import CardHistory from "@/app/[locale]/Components/CardHistory/CardHistory";

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

  useEffect(() => {
    const getUser = async (userId: number) => {
      if (userId === -1) {
        return;
      }
      try {
        const user = await axios.get(`${Server}/user/${userId}`);
        const userData = user.data;
        setStateUser(userData);
      } catch (error) {
        console.log(error);
      }
    };
    getUser(userId);
  }, [userId]);

  const place = "AdminHistory";

  return (
    <div
      onClick={() => setState(!state)}
      className={`fixed inset-0 flex z-[101] items-center  justify-center bg-gray-900/[0.4] ${
        state ? "visible" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-[60%] font-titilium bg-Lightblue-200 gap-2 justify-center transition-all duration-250 grid grid-cols-2 p-6 rounded-lg shadow-lg transition-all duration-300 ${
          state ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {stateUser !== "No hay user" ? (
          stateUser.history.length > 0 ? (
            stateUser?.history.map((his: any, index: any) => (
              <CardHistory key={index} history={his} place={place} />
            ))
          ) : (
            <div className="flex flex-col p-5 col-span-2 justify-center items-center">
              <p className="relative text-2xl text-Lightblue-950 font-titilium font-semibold">
                This User doesnt have any purchases!
              </p>
              <BsFillCartXFill className="relative text-5xl  text-Lightblue-950 font-titilium font-semibold" />
            </div>
          )
        ) : (
          <div className="flex flex-col p-5 col-span-2 justify-center items-center">
            <p className="relative text-2xl text-Lightblue-950 font-titilium font-semibold">
              An error occurred!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHistoryModal;
