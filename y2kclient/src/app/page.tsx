import ShowCards from '../app/home/ShowCards/ShowCards';
import Carousel from "./home/Carousel/Carousel";


export default function Home() {
  
  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-col w-full  justify-around gap-[17rem] items-center">
      <Carousel/>
      <ShowCards/>
    
      </div>
    </div>
  );
}
