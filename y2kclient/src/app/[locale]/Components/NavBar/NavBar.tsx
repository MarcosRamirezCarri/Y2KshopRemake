import Link from "next/link";
import ButtonsNavBar from "./Buttons/Buttons";
import SearchBar from "./SearchBar/SearchBar";
import TextFlyer from "./TextFlyer/TextFlyer";

export default function Navbar() {
  return (
    <div className="flex flex-row w-full p-8 bg-[#190a0a] h-24 fixed items-center justify-between z-[100]">
      <div className="flex flex-row items-centes justify-center gap-3">
        <Link
          className="flex flex-col items-center justify-center"
          href={{ pathname: "/" }}
        >
          <div className="flex flex-col ">
            <p>GPD</p>
          </div>
        </Link>
      </div>

      <SearchBar />
      <ButtonsNavBar />
      <TextFlyer />
    </div>
  );
}
