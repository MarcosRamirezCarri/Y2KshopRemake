import Navbar from "./[locale]/Components/NavBar/NavBar";
import ShowCards from '../app/homeComponents/ShowCards/ShowCards';
import Carousel from "./homeComponents/Carousel/Carousel";
import Footer from "./[locale]/Components/Footer/Footer";

export default function Home() {
  
  return (
    <div className="flex flex-col w-full ">
      <Navbar/>
      <div className="flex flex-col w-full  justify-around gap-[17rem] items-center">
      <Carousel/>
      <ShowCards/>
    
      </div>
 <Footer/>
    </div>
  );
}
