'use client'
import { useState } from "react"
import SideBarDashboard from "./Modals/SideBarDashboard"
import CreateModal from "./Modals/ProductModal/CreateProduct/CreateProduct"

const ViewOfAll = () =>{
    const [stateAdmin, setStateAdmin] = useState<string>('')
    console.log(stateAdmin)
    return(
        <div className="w-[100%] h-[100vh] bg-gray-100 flex flex-col gap-5 relative">
         <SideBarDashboard setStateAdmin={setStateAdmin} />
         <CreateModal setStateAdmin={setStateAdmin} stateAdmin={stateAdmin}/>
        </div>
    )
}
export default ViewOfAll