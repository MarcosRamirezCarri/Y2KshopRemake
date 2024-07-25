'use client'
import Swal from "sweetalert2";
import { logOut } from "@/lib/slices/userReducer";
import { logOutCart } from "@/lib/slices/cartReducer";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



const LogOutBtn = () =>{
    const dispatch = useAppDispatch();
    const router = useRouter();
    let token: any = ''
    let id: any = 0;
    

useEffect(() =>{
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
    id = localStorage.getItem("userId")
   
 }
},[])
console.log(id)

    const handleLogout = () => {
        if(token !== "undefined" && token !== "null"){
          if(id !== "undefined" && id !== "null" ){
            Swal.fire({
              title: "Are you sure you want to log out?",
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Yes",
              denyButtonText: `No`,
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire("Logged Out", "", "success");
                dispatch(logOutCart())
                dispatch(logOut());
                localStorage.removeItem('token');
              localStorage.removeItem("userId")
              router.push('/')
             }})  
        } else {
            Swal.fire({
                title: "There is no account",
                icon: "error",
                confirmButtonText: "Ok",
              });
        }    
      };
    }
    return(
        <div className={` items-center ${token === "undefined"|| token === "null" ? 'hidden' : 'content'} `}>
<button className="py-4 px-6 text-xl font-medium font-tiltneon text-pink-950 bg-orange-500/[0.7] rounded-[1.25rem] transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-orange-200" onClick={handleLogout}>
    Log Out
</button>
        </div>
    )
}


export default LogOutBtn;