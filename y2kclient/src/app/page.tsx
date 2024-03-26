import Image from "next/image";
import Navbar from "./[locale]/Components/NavBar/NavBar";
import Carousel from "./[locale]/Components/Carousel/Carousel";

export default function Home() {
  return (
    <div className="flex flex-col h-[1000vh] items-center content-around">
      <Navbar/>
      <div>
      <Carousel/>
        </div>
    </div>
  );
}
