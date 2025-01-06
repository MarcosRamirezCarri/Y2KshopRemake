import CardsContainer from "./CardsContainer/CardsContainer";
import Navbar from "../components/layout/NavBar/NavBar";
import Footer from "../components/layout/Footer/Footer";
import SideBar from "../components/ui/FiltersProduct/SideBar";

export default function ShowProducts() {
  return (
    <div className="flex flex-col w-full ">
      <Navbar />

      <div className="flex flex-row w-[100%] justify-evenly ">
        <SideBar />
        <CardsContainer />
      </div>
      <Footer/>
    </div>
  );
}
