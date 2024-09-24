"use client";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { getAllProducts } from "@/lib/actions/ProductActions/getAllProducts";
import UsersTable from "./Views/UsersViews/UsersTable";
import SideBarDashboard from "./SideBarDashboard";
import CreateModal from "./Modals/ProductModal/CreateProduct/CreateProduct";
import DeleteModal from "./Modals/ProductModal/DeleteProduct/DeleteModal";
import ModifyProductModal from "./Modals/ProductModal/ModifyProduct/ModifyProductModal";

const ViewOfAll = () => {
  const dispatch = useAppDispatch();
  const [stateAdmin, setStateAdmin] = useState<string>("");
  const [stateButtons, setStateButtons] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllProducts());
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="w-[100%] h-[100vh] bg-gray-100 flex flex-col gap-5 ">
      <SideBarDashboard
        setStateAdmin={setStateAdmin}
        setStateButtons={setStateButtons}
        stateButtons={stateButtons}
      />
      {stateButtons === "Products" ? (
        <div>
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
