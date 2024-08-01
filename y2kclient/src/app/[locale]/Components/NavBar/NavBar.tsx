import Link from "next/link";
import ButtonsNavBar from "./Buttons/Buttons";
import SearchBar from "./SearchBar/SearchBar";
import { BsArchiveFill } from "react-icons/bs";

export default function Navbar() {
  return (
    <div className="flex flex-row w-full px-4 lg:px-8 py-10 lg:py-8 h-32 bg-gray-950 fixed items-center justify-between z-[100]">
      <div className="flex flex-row items-centes justify-center gap-3">
      <Link
        className="flex flex-col items-center justify-center"
        href={{ pathname: "/" }}
      >
        <div className="flex flex-col ">
          <p className="font-titilium text-2xl lg:text-5xl relative top-2.5 font-bold text-pink-300 [text-shadow:_7px_0px_6px_#80dde0;] ">
            Zul ' 
          </p>
          <p className="font-titilium text-2xl lg:text-4xl font-bold text-Lightblue-300 [text-shadow:_7px_0px_6px_#ffa1d3;]">
            Fashion
          </p>
        </div>
      </Link>
      <Link href={{pathname: '/dashboard'}}>
     <button className=" flex flex-col font-titilium text-3xl lg:text-5xl text-pink-50 font-normal transition-all duration-300 hover:scale-105">
      <BsArchiveFill/>
     </button>
      </Link>
      </div>
    
      <SearchBar />
      <ButtonsNavBar />
    </div>
  );
}
