'use client'
import Swal from "sweetalert2";
import { logOut } from "@/lib/slices/userReducer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";


const LogOutBtn = () =>{
    const dispatch = useAppDispatch();
    let token: any = ''
    if (typeof window !== "undefined") {
         token = localStorage.getItem("token");
      }

    const handleLogout = () => {
        if(token !== "undefined"|| token !== "null" || token !== null){
            dispatch(logOut());
            localStorage.removeItem('token');
            Swal.fire({
              title: "Logged Out",
              icon: "success",
              confirmButtonText: "Ok",
            });
        } else {
            Swal.fire({
                title: "There is no account",
                icon: "error",
                confirmButtonText: "Ok",
              });
        }    
      };
    return(
        <div className={` items-center ${token === "undefined"|| token === "null" || token === null ? 'hidden' : 'content'} `}>
<button className="py-4 px-6 text-xl font-medium font-titilium text-pink-950 bg-orange-800" onClick={handleLogout}>
    Log Out
</button>
        </div>
    )
}

export default LogOutBtn;