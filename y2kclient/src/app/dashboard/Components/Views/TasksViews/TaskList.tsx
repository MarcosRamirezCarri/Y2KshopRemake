import { getAllCarts } from "@/lib/actions/AdminActions/getAllCarts";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard/TaskCard";

const TaskList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCarts());
  }, []);
  const tasks = useAppSelector((state) => state.admin.allCarts);
 const showTask = tasks.filter((item) => item.state !== 'inCart');

  return (
    <div className="relative font-titilium left-[23%] flex flex-col gap-10 top-[10rem] w-[75%]">
      {showTask.length > 0
        ? showTask.map((task) => (
            <TaskCard
              Product={task.Product}
              color={task.color}
              size={task.size}
              state={task.state}
              id={task.id}
              userId={task.userId}
              productId={task.productId}
              quantity={task.quantity}
            />
          ))
        : null}
    </div>
  );
};

export default TaskList;
