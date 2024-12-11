import AddFlyerButton from "./AddButton/AddFlyerButton";
import PreviewFlyers from "./Preview/Preview";

const FlyersConfig = () => {
  return (
    <div className="relative font-titilium left-[23%] flex flex-col gap-5 top-[9.5rem] w-[75%]">
      <PreviewFlyers/>
      <AddFlyerButton/>
    </div>
  );
};

export default FlyersConfig;