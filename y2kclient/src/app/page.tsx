import Image from "next/image";
import Navbar from "./[locale]/Components/NavBar/NavBar";
import ShowCards from "./[locale]/Components/ShowCards/ShowCards";
import Carousel from "./[locale]/Components/Carousel/Carousel";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full gap-5">
      <Navbar/>
      <div className="flex flex-col w-full h-full justify-around gap-10 items-center">
      <Carousel/>
      <ShowCards/>
      </div>
 
    </div>
  );
}
