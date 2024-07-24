'use client'
import Swal from "sweetalert2";
import { logOut } from "@/lib/slices/userReducer";
import { logOutCart } from "@/lib/slices/cartReducer";
import { useAppDispatch } from "@/lib/hooks/hooks";



const LogOutBtn = () =>{
    const dispatch = useAppDispatch();
    let token: any = ''
    let id: any = 0
    if (typeof window !== "undefined") {
         token = localStorage.getItem("token");
         id = localStorage.getItem("userId")
      }

    const handleLogout = () => {
        if(token !== "undefined"|| token !== "null" || token !== null){
          if(id !== "undefined"|| id !== "null" || id !== null){
            dispatch(logOutCart())
            dispatch(logOut());
            localStorage.removeItem('token');
            Swal.fire({
              title: "Logged Out",
              icon: "success",
              confirmButtonText: "Ok",
            });
          }  
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
<button className="py-4 px-6 text-xl font-medium font-tiltneon text-pink-950 bg-orange-500/[0.7] rounded-[1.25rem] transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-orange-200" onClick={handleLogout}>
    Log Out
</button>
        </div>
    )
}

export default LogOutBtn;