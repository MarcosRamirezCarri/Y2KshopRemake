import { getAllCarts } from "@/lib/actions/AdminActions/getAllCarts";
import { setSelectedState } from "@/lib/slices/adminReducer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { BiTaskX } from "react-icons/bi";
import { useEffect, useState } from "react";
import { CartItem } from "@/helpers/types/CartItem";
import TaskCard from "./TaskCard/TaskCard";
import DestinyTaksModal from "../../Modals/TasksModal/DestinyTaskModal";

const TaskList = () => {
  const [stateModal, setStateModal] = useState<boolean>(false);
  const [userIdModal, setUserIdModal] = useState<number>(-1);

  const tasks: CartItem[] = useAppSelector((state) => state.admin.allCarts);
  const selectedState = useAppSelector((state) => state.admin.selectedState);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(getAllCarts());
    }
   
  }, [dispatch, tasks]);
 

  const orderTasks = (tasks: CartItem[]) => {
    const order = ["pending", "approved", "sended", "adminCanceled"];
    if (selectedState === "all") {
      return tasks.sort(
        (a, b) => order.indexOf(a.state) - order.indexOf(b.state)
      );
    }
    return tasks.sort((a, b) => {
      if (a.state === selectedState) return -1;
      if (b.state === selectedState) return 1;
      return order.indexOf(a.state) - order.indexOf(b.state);
    });
  };

  const showTask = orderTasks(tasks.filter((item) => item.state !== "inCart"));

  const countTasks = (tasks: CartItem[], state: string) => {
    if (state === "all") {
      return tasks.length;
    }
    return tasks.filter((task) => task.state === state).length;
  };

  const taskCount = countTasks(showTask, selectedState);

  const handleClick = (userId: number) => {
    setStateModal(!stateModal);
    setUserIdModal(userId);
  };

  return (
    <div className="relative font-titilium left-[23%] flex flex-col gap-5 top-[7.5rem] w-[75%]">
      <div className="flex flex-row self-center gap-5 ">
        <select
          value={selectedState}
          onChange={(e) => dispatch(setSelectedState(e.target.value))}
          className="bg-orange-200 text-lg text-orange-950 px-2 py-1 ring-2 ring-orange-400 rounded focus:outline-orange-600"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="sended">Sended</option>
          <option value="adminCanceled">Admin Canceled</option>
        </select>
        <p className="text-xl text-orange-950">
          {selectedState.charAt(0).toUpperCase() + selectedState.slice(1)}{" "}
          Tasks: {taskCount}
        </p>
      </div>
      {showTask.length > 0 ? (
        showTask.map((task, index) => (
          <TaskCard key={index} cartItem={task} handleClick={handleClick} />
        ))
      ) : (
        <div className="w-[100%] justify-center items-center flex flex-col">
          <p className="relative top-[10rem] text-2xl lg:text-3xl text-Lightblue-950 font-titilium font-semibold">
            It seems there are no pending tasks!
          </p>
          <BiTaskX className="relative top-[11rem] text-3xl lg:text-5xl text-Lightblue-950 font-titilium font-semibold" />
        </div>
      )}
      <DestinyTaksModal
        state={stateModal}
        setState={setStateModal}
        userId={userIdModal}
      />
    </div>
  );
};

export default TaskList;
