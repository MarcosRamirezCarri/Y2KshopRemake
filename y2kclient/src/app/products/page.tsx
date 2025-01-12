import CardsContainer from "./CardsContainer/CardsContainer";
import SideBar from "../components/ui/FiltersProduct/SideBar";

export default function ShowProducts() {
  return (
    <div className="flex flex-col w-full ">

      <div className="flex flex-row w-[100%] justify-evenly ">
        <SideBar />
        <CardsContainer />
      </div>

    </div>
  );
}
