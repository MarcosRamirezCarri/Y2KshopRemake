import AddFlyerButton from "./AddButton/AddFlyerButton";
import CreateFlyer from "../../Modals/FlyerModal/CreateFlyer";
import { useState } from "react";
import PreviewFlyers from "./Preview/Preview";

const FlyersConfig = () => {
  const [state, setState] = useState<boolean>(false);
  return (
    <div className="relative font-titilium left-[23%] flex flex-col gap-5 top-[9.5rem] w-[75%]">
      <PreviewFlyers/>
      <button onClick={() => setState(!state)} className="">
        Create flyers
      </button>
      <CreateFlyer state={state} setState={setState}/>
    </div>
  );
};

export default FlyersConfig;