import CardsContainer from "./CardsContainer/CardsContainer";
import Navbar from "../[locale]/Components/NavBar/NavBar";


export default function ShowProducts() {
  return (
    <div className="flex flex-col w-full h-full ">
      <Navbar/>
      <div className="flex flex-col w-full h-full justify-around items-center">
<CardsContainer/>
      </div>
 
    </div>
  );
}