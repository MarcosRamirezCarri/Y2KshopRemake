import style from './NavBar.module.css'
import Link from 'next/link';
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex flex-row w-full p-4 lg:p-10 h-32 bg-gray-950 fixed justify-between z-[100]">
        <button className={style.Title}>Y2K Shop</button>
        <div className="gap-3 lg:gap-10 flex flex-row">
        <Link href={{pathname:'/cart'}} ><button className="font-titilium text-lg lg:text-2xl text-pink-50 font-normal">Carrito</button></Link>
        <button className="font-titilium text-lg lg:text-2xl text-pink-50 font-normal">Comprar</button>
        <button className="font-titilium text-lg lg:text-2xl text-pink-50 font-normal">cuenta</button>
          </div>
       
    </div>
  );
}
