'use client'
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import Swal from 'sweetalert2'
import changeToAdmin from "@/lib/actions/AdminActions/setAdminUser";
import getAllUsers from "@/lib/actions/AdminActions/getAllUsers";

const UsersTable = () =>{

    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(getAllUsers())
    },[]);

    const handleAdminChange = (userId: string, isAdmin: boolean) => {
        
    };

    const users = useAppSelector((state) => state.admin.allUsers);

    return (
        <div className="relative font-titilium left-[23%] bottom-[60%] flex flex-col w-[75%]">
            <table  className="border-spacing-2 w-[100%] table-auto border-collapse top-2">
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
            {users.length > 0 ? users.map((user) =><tr key={user.id}>
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
                                    onChange={(e) => handleAdminChange(user.id, e.target.value === "true")}
                                    className="border bg-orange-200 rounded px-2 py-1 focus:outline-orange-400"
                                >
                                    <option value="true">Admin</option>
                                    <option value="false">No Admin</option>
                                </select>
                </td>
                <td className="border-l-2 border-b-2 border-r-2 p-1 text-md font-medium">
                    see History
                </td>
            </tr>)

            : <div>
                <p>No hay usuarios</p>
                </div>}
        </tbody>
            </table>
            
        </div>
    )
}

export default UsersTable;