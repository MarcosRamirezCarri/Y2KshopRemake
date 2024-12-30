"use client";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import {setUserFromId} from "@/lib/actions/AccountActions/getUserFromId";
import UsersTable from "./Views/UsersViews/UsersTable";
import TaskList from "./Views/TasksViews/TaskList";
import SideBarDashboard from "./SideBarDashboard";
import FlyersConfig from "./Views/FlyersView/FlyersConfig";
import ProductsControl from "./Views/ProductsView/ProductsMetrics";

const ViewOfAll = () => {
  const dispatch = useAppDispatch();
  const [stateButtons, setStateButtons] = useState<string>("Tasks");
  const user: any = useAppSelector((state) => state.account.user);

  useEffect(() => {
   
  const userId = localStorage.getItem("userId");
  const numberUserId = userId && !isNaN(Number(userId)) ? Number(userId) : null;

  if (!numberUserId) {
    return;
  }
      dispatch(setUserFromId(numberUserId));
    
  }, [dispatch]);

  useEffect(() => {
    if (user.admin === true) {
      console.log("El usuario es administrador");
    } else {
      console.log("El usuario no es administrador");
    }
  }, [user]);

  return (
    <div className="w-[100%] flex flex-col  gap-5 ">
      <SideBarDashboard
        setStateButtons={setStateButtons}
        stateButtons={stateButtons}
      />
      {stateButtons === "Products" ? <ProductsControl /> : null}
      {stateButtons === "Users" ? <UsersTable /> : null}
      {stateButtons === "Tasks" ? <TaskList /> : null}
      {stateButtons === "Flyers" ? <FlyersConfig /> : null}
    </div>
  );
};
export default ViewOfAll;
