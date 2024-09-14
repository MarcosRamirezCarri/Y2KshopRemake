'use client'
import { useState, useEffect } from "react"
import { useAppDispatch } from "@/lib/hooks/hooks"
import { getAllProducts } from "@/lib/actions/getAllProducts"
import SideBarDashboard from "./Modals/SideBarDashboard"
import CreateModal from "./Modals/ProductModal/CreateProduct/CreateProduct";
import DeleteModal from "./Modals/ProductModal/DeleteProduct/DeleteModal";
import ModifyProductModal from "./Modals/ProductModal/ModifyProduct/ModifyProductModal"


const ViewOfAll = () =>{
    const dispatch = useAppDispatch()
    const [stateAdmin, setStateAdmin] = useState<string>('')
    useEffect(() => {
        const fetchData = async () => {
          await dispatch(getAllProducts());
        };
        fetchData();
      }, [dispatch]);

    console.log(stateAdmin)
    return(
        <div className="w-[100%] h-[100vh] bg-gray-100 flex flex-col gap-5 relative">
         <SideBarDashboard setStateAdmin={setStateAdmin} />
         <CreateModal setStateAdmin={setStateAdmin} stateAdmin={stateAdmin}/>
         <DeleteModal setStateAdmin={setStateAdmin} stateAdmin={stateAdmin}/>
         <ModifyProductModal setStateAdmin={setStateAdmin} stateAdmin={stateAdmin}/>
    
        </div>
    )
}
export default ViewOfAll