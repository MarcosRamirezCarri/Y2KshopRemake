"use client";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { getAllProducts } from "@/lib/actions/ProductActions/getAllProducts";
import setUserFromId from "@/lib/actions/AccountActions/getUserFromId";
import UsersTable from "./Views/UsersViews/UsersTable";
import { redirect } from "next/navigation";
import SideBarDashboard from "./SideBarDashboard";
import ProductsMetrics from "./Views/ProductsView/ProductsMetrics";
import CreateModal from "./Modals/ProductModal/CreateProduct/CreateProduct";
import DeleteModal from "./Modals/ProductModal/DeleteProduct/DeleteModal";
import ModifyProductModal from "./Modals/ProductModal/ModifyProduct/ModifyProductModal";

const ViewOfAll = () => {
  const dispatch = useAppDispatch();
  const [stateAdmin, setStateAdmin] = useState<string>("");
  const [stateButtons, setStateButtons] = useState<string>("");
  const user = useAppSelector((state) => state.account.user);


  useEffect(() => {
    const id = localStorage.getItem("userId");

    const token = localStorage.getItem("token");
    const userId = Number(id);
    if (token !== "undefined" || token !== null) {
      dispatch(setUserFromId(userId));
    }
    const fetchData = async () => {
      await dispatch(getAllProducts());
    };
    fetchData();
  }, [dispatch]);


useEffect(() =>{
  if (user.admin === true) {
    console.log("El usuario es administrador");

  } else {
    console.log("El usuario no es administrador");
    redirect('/')

  } 
},[user])
      

      

  return (
    <div className="w-[100%] bg-gray-100 flex flex-col  gap-5 ">
      <SideBarDashboard
        setStateAdmin={setStateAdmin}
        setStateButtons={setStateButtons}
        stateButtons={stateButtons}
      />
      {stateButtons === "Products" ? (
        <div>
          <ProductsMetrics/>
          <CreateModal setStateAdmin={setStateAdmin} stateAdmin={stateAdmin} />
          <DeleteModal setStateAdmin={setStateAdmin} stateAdmin={stateAdmin} />
          <ModifyProductModal
            setStateAdmin={setStateAdmin}
            stateAdmin={stateAdmin}
          />
        </div>
      ) : null}
      {stateButtons === "Users" ? (
       
          <UsersTable />
    
      ) : null}
    </div>
  );
};
export default ViewOfAll;
