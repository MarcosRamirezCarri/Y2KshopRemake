import { Server } from "@/helpers/services/server";
import axios from "axios";
import { useEffect, useState } from "react";

interface DestinyTaksModalProps {
  state: boolean;
  userId: number;
  setState: (arg: boolean) => void;
}

const DestinyTaksModal: React.FC<DestinyTaksModalProps> = ({
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

  return (
    <div
      onClick={() => setState(!state)}
      className={`fixed inset-0 flex z-[101] items-center  justify-center bg-gray-900/[0.4] ${
        state ? "visible" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`font-titilium bg-Lightblue-200 gap-2 justify-center transition-all duration-250 flex flex-col p-6 rounded-lg shadow-lg transition-all duration-300 ${
          state ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <h2 className="text-2xl flex justify-center font-semibold col-span-2">User Information</h2>
        {stateUser !== "No hay user" ? (
          <div className="p-10 grid grid-cols-2 text-2xl text-Lightblue-950 gap-2">
            <div className="flex flex-col">
              <p>{stateUser.name}</p>
              <p>User ID:{stateUser.id}</p>
              <p>Email: {stateUser.email}</p>
              
              
            </div>
            <div className="flex flex-col">
              <p>City: {stateUser.location?.city}</p>
              <p>Province: {stateUser.location?.province}</p>
              <p>Country: {stateUser.location?.country}</p>
            </div>
          </div>
        ) : (
          <p>An error occurred</p>
        )}
      </div>
    </div>
  );
};

export default DestinyTaksModal;
