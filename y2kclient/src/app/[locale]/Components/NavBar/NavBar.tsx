import style from "./NavBar.module.css";
import Link from "next/link";
import ButtonsNavBar from "./Buttons/Buttons";
import SearchBar from "./SearchBar/SearchBar";

export default function Navbar() {
  return (
    <div className="flex flex-row w-full p-4 pb-8 lg:p-10 h-32 bg-gray-950 fixed items-center justify-between z-[100]">
      <Link
        className="flex flex-col items-center justify-center"
        href={{ pathname: "/" }}
      >
        <div className="flex flex-row">
          <p className="font-titilium text-3xl lg:text-5xl font-bold text-pink-300 [text-shadow:_7px_0px_6px_#80dde0;] ">
            Y
          </p>
          <p className="font-titilium text-3xl lg:text-5xl font-bold text-blue-300 [text-shadow:_7px_0px_6px_#ffa1d3;]">
            2
          </p>
          <p className="font-titilium text-3xl lg:text-5xl font-bold text-pink-300 [text-shadow:_7px_0px_6px_#80dde0;]">
            K
          </p>
          <p className="font-titilium text-3xl lg:text-5xl font-bold text-blue-300 [text-shadow:_7px_0px_6px_#ffa1d3;]">
            Fashion
          </p>
        </div>
      </Link>
      <SearchBar />
      <ButtonsNavBar />
    </div>
  );
}
