"use client";
import { useEffect, useState } from "react";
import UserHistoryModal from "../../Modals/UserModal/UserModalHistory";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import Swal from "sweetalert2";
import { changeToAdmin } from "@/lib/actions/AdminActions/setAdminUser";
import { getAllUsers } from "@/lib/actions/AdminActions/getAllUsers";

const UsersTable = () => {
  const dispatch = useAppDispatch();

  const [stateModal, setStateModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 10;
  const users = useAppSelector((state) => state.admin.allUsers);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getAllUsers());
    }
    
  }, [dispatch, users]);

  const handleAdminChange = (
    userId: number,
    name: string,
    isAdmin: boolean
  ) => {
    Swal.fire({
      title: `You want ${name} to be an admin?`,
      icon: "question",
      showDenyButton: true,
      showConfirmButton: true,
    }).then((result: any) => {
      if (result.isConfirmed) {
        dispatch(changeToAdmin(userId, isAdmin)).then((response: any) => {
          if (response?.success) {
            Swal.fire("Saved!", "", "success");
          } else {
            Swal.fire({
              title: "Something Failed!",
              text: response.message,
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        });
      }
    });
  };


  const [userId, setUserId] = useState<number>(-1);

  const handleClick = (id: number) => {
    setUserId(id);
    setStateModal(!stateModal);
  };


  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="relative font-titilium left-[10%] flex flex-col top-[7.5rem] w-[75%]">
      <table className="border-spacing-2 w-[100%] table-auto border-collapse top-2">
        <thead>
          <tr className="bg-orange-200 select-none shadow-inner">
            <th className="ring-orange-400 ring-2 rounded-tl-xl shadow-inner px-8 py-2 text-black-50 text-xl font-medium">
              Name
            </th>
            <th className="ring-orange-400 ring-2 shadow-inner px-8 py-2 text-black-50 text-xl font-medium">
              Email
            </th>
            <th className="ring-orange-400 ring-2 shadow-inner px-8 py-2 text-black-50 text-xl font-medium">
              Phone
            </th>
            <th className="ring-orange-400 ring-2 shadow-inner px-8 py-2  text-black-50 text-xl font-medium">
              Admin
            </th>
            <th className="rounded-tr-xl shadow-inner ring-orange-400 ring-2 px-8 py-2 text-black-50 text-xl font-medium">
              History
            </th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="border-l-2 border-b-2 border-r-2 px-2 py-3 text-md font-medium">
                  {user.name}
                </td>
                <td className="border-l-2 border-b-2 border-r-2 p-1 text-md font-medium">
                  {user.email}
                </td>
                <td className="border-l-2 border-b-2 border-r-2 p-1 text-md font-medium">
                  {user.phone}
                </td>
                <td className="border-l-2 border-b-2 border-r-2 p-1 text-md font-medium">
                  <select
                    value={user.admin ? "true" : "false"}
                    onChange={(e) =>
                      handleAdminChange(
                        user.id,
                        user.name,
                        e.target.value === "true"
                      )
                    }
                    className="border bg-orange-200 rounded px-2 py-1 focus:outline-orange-400"
                  >
                    <option value="true">Admin</option>
                    <option value="false">No Admin</option>
                  </select>
                </td>
                <td className="border-l-2 border-b-2 border-r-2 p-1 text-md font-medium">
                  <button onClick={() => handleClick(user.id)}>
                    see history
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No users available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center my-4">
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
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 mx-1 bg-orange-300 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      <UserHistoryModal
        state={stateModal}
        userId={userId}
        setState={setStateModal}
      />
    </div>
  );
};

export default UsersTable;
