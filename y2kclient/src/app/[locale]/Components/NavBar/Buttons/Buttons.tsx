'use client'
import Link from "next/link";
import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import style from '../NavBar.module.css'
import { FaBagShopping } from "react-icons/fa6";
import { FaIdBadge } from "react-icons/fa";

const ButtonsNavBar = () =>{
    const [stateButton, setStateButton] = useState<string>()


    return(
        <div className="gap-3 lg:gap-[5rem] flex flex-row">
        <Link href={{ pathname: "/cart" }}>
          <button onMouseEnter={() => setStateButton('cart')}
        onMouseLeave={() => setStateButton('none')} className="flex flex-col font-titilium text-4xl lg:text-5xl text-pink-50 font-normal">
            <FaCartShopping />
          </button>
          {stateButton === 'cart'? 
          <span className="absolute justify-self-center bg-white text-black p-2 rounded-md shadow">
          Cart
        </span> : null
          }
        </Link>
        <Link  href={{ pathname: "/products" }}>
          <button onMouseEnter={() => setStateButton('product')}
        onMouseLeave={() => setStateButton('none')} className="flex flex-col font-titilium text-4xl lg:text-5xl text-pink-50 font-normal">
            <FaBagShopping />
          </button>
          {stateButton === 'product'? 
          <span className={style.scaleBottom}>
        Buy 
        </span> : null
          }
        </Link>
        <Link href={{ pathname: "/" }}>
        <button onMouseEnter={() => setStateButton('account')}
        onMouseLeave={() => setStateButton('none')} className=" flex px-4 flex-col font-titilium text-4xl lg:text-5xl text-pink-50 font-normal">
          <FaIdBadge />
        </button>
        {stateButton === 'account'? 
          <span className="absolute justify-self-center bg-white text-black p-2 rounded-md shadow">
        Account
        </span> : null
          }
        </Link>
       
      </div>
    )
}

export default ButtonsNavBar