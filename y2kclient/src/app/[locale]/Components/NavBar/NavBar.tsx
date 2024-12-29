import Link from "next/link";
import ButtonsNavBar from "./Buttons/Buttons";
import SessionVerify from "./SessionVerify/SessionVerify";
import SearchBar from "./SearchBar/SearchBar";
import TextFlyer from "./TextFlyer/TextFlyer";

export default function Navbar() {
  return (
    <div className="flex flex-row w-full pb-2 px-10 bg-[#00080a] h-[4.6rem] fixed items-center justify-between z-[100]">
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
      <SessionVerify/>
    </div>
  );
}
