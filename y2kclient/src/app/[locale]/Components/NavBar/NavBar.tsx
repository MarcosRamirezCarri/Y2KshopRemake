import style from './NavBar.module.css'
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex flex-row w-full p-4 lg:p-10 h-32 bg-gray-950 fixed justify-between z-[100]">
        <button className={style.Title}>Y2K Shop</button>
        <div className="gap-3 lg:gap-10 flex flex-row">
        <button className="font-titilium text-lg lg:text-2xl text-gray-50 font-normal">Cuenta</button>
        <button className="font-titilium text-lg lg:text-2xl text-gray-50 font-normal">Comprar</button>
        <button className="font-titilium text-lg lg:text-2xl text-gray-50 font-normal">Carrito</button>
          </div>
       
    </div>
  );
}
