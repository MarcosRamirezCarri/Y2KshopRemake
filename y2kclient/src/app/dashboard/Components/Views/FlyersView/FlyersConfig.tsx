import CreateFlyer from "../../Modals/FlyerModal/CreateFlyer";
import { useState, useEffect } from "react";
import { getAllFlyers } from "@/lib/actions/FlyerActions/getAllFlyers";
import ActivateFlyers from "./ActivatesFlyers.ts/ActivatesFlyers";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import PreviewFlyers from "./Preview/Preview";

const FlyersConfig = () => {
  const [state, setState] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllFlyers());
  }, [dispatch]);
  return (
    <div className="relative font-titilium left-[23%] flex flex-col gap-5 top-[7.5rem]  w-[75%]">
      <button
        className="relative self-center bg-orange-300 px-4 py-2 w-[40%] rounded-xl text-2xl text-orange-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-orange-200"
        onClick={() => setState(!state)}
      >
        Create flyer
      </button>
      <p className="text-xl text-Lightblue-950  font-bold ">Preview big flyers</p>
      <PreviewFlyers />
      
      <ActivateFlyers />
      <CreateFlyer state={state} setState={setState} />
    </div>
  );
};

export default FlyersConfig;
