import style from "./NavBar.module.css";
import Link from "next/link";
import ButtonsNavBar from "./Buttons/Buttons";



export default function Navbar() {
  return (
    <div className="flex flex-row w-full p-4 lg:p-10 h-32 bg-gray-950 fixed justify-between z-[100]">
      <Link href={{ pathname: "/" }}>
        <div className="flex flex-row">
          <p className="font-titilium text-5xl font-bold text-pink-300 [text-shadow:_7px_0px_6px_#80dde0;] ">Y</p>
          <p className="font-titilium text-5xl font-bold text-blue-300 [text-shadow:_7px_0px_6px_#ffa1d3;]" >2</p>
          <p className="font-titilium text-5xl font-bold text-pink-300 [text-shadow:_7px_0px_6px_#80dde0;]">K</p>
          <p className="font-titilium text-5xl font-bold text-blue-300 [text-shadow:_7px_0px_6px_#ffa1d3;]">Fashion</p>


        </div>
      </Link>
      <ButtonsNavBar/>
    </div>
  );
}
