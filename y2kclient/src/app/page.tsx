import Navbar from './components/layout/NavBar/NavBar';
import ShowCards from '../app/home/ShowCards/ShowCards';
import Carousel from "./home/Carousel/Carousel";
import Footer from './components/layout/Footer/Footer';

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
