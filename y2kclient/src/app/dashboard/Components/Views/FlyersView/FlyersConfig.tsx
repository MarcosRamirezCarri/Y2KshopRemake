import CreateFlyer from "../../Modals/FlyerModal/CreateFlyer";
import { useState, useEffect } from "react";
import { getAllFlyers } from "@/lib/actions/FlyerActions/getAllFlyers";
import ActivateFlyers from "./ActivatesFlyers.ts/ActivatesFlyers";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import PreviewFlyers from "./Preview/Preview";

const FlyersConfig = () => {
  const [state, setState] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() =>{
    dispatch(getAllFlyers());
  },[dispatch])
  return (
    <div className="relative font-titilium left-[23%] flex flex-col gap-5 top-[9.5rem] w-[75%]">
      <PreviewFlyers/>
      <button onClick={() => setState(!state)} className="">
        Create flyers
      </button>
      <ActivateFlyers/>
      <CreateFlyer state={state} setState={setState}/>
    </div>
  );
};

export default FlyersConfig;