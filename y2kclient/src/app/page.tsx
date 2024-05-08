import Image from "next/image";
import Navbar from "./[locale]/Components/NavBar/NavBar";
import ShowCards from '../app/homeComponents/ShowCards/ShowCards';
import Carousel from "./homeComponents/Carousel/Carousel";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full ">
      <Navbar/>
      <div className="flex flex-col w-full h-full justify-around gap-[17rem] items-center">
      <Carousel/>
      <ShowCards/>
      </div>
 
    </div>
  );
}
