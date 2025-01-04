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
  const [stateUser, setStateUser] = useState<AccountType>({
    name: "",
    email: "",
    location: {
      city: "",
      province: "",
      country: "",
    },
    admin: false,
    phone: "",
    password: "",
    id: 0,
    history: [],
  });

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
  }, [userId, stateUser]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 4;

  const indexOflastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOflastProduct - productsPerPage;
  const currentProduct =
    stateUser.id !== 0
      ? stateUser.history.slice(indexOfFirstProduct, indexOflastProduct)
      : null;

  // Calculate total pages
  const totalPages = Math.ceil(stateUser.history.length / productsPerPage);

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
        className={`w-[80%] font-titilium min-h-[61vh] bg-Lightblue-300 gap-2 justify-center transition-all duration-250 grid grid-cols-2 p-6 rounded-lg shadow-lg transition-all duration-300 ${
          state ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {stateUser.id !== 0 ? (
          stateUser.history.length > 0 ? (
            currentProduct?.map((his: any, index: any) => (
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
        <div
          className={` col-span-2 ${
            totalPages === 0 ? "hidden" : "flex flex-row"
          } justify-center items-center my-4`}
        >
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 mx-1 bg-orange-300 rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="px-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 mx-1 bg-orange-300 rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHistoryModal;
