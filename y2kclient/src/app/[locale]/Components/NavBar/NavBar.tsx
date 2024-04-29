import style from "./NavBar.module.css";
import Link from "next/link";
import ButtonsNavBar from "./Buttons/Buttons";



export default function Navbar() {
  return (
    <div className="flex flex-row w-full p-4 lg:p-10 h-32 bg-gray-950 fixed justify-between z-[100]">
      <Link href={{ pathname: "/" }}>
        <button className={style.Title}>Y2K Shop</button>
      </Link>
      <ButtonsNavBar/>
    </div>
  );
}
