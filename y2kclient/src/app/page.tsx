import Image from "next/image";
import Navbar from "./[locale]/Components/NavBar/NavBar";
import ShowCards from "./[locale]/Components/ShowCards/ShowCards";
import Carousel from "./[locale]/Components/Carousel/Carousel";

export default function Home() {
  return (
    <div className="flex flex-col h-[1000vh] items-center content-around">
      <Navbar/>
      <ShowCards/>
      <Carousel/>
    </div>
  );
}
