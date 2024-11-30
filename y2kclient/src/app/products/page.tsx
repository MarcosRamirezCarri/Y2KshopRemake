import CardsContainer from "./CardsContainer/CardsContainer";
import Navbar from "../[locale]/Components/NavBar/NavBar";
import SideBar from "./SideBar/SideBar";

export default function ShowProducts() {
  return (
    <div className="flex flex-col w-full h-full ">
      <Navbar />

      <div className="flex flex-row w-[100%] h-[100%] justify-evenly ">
        <SideBar />
        <CardsContainer />
      </div>
    </div>
  );
}
