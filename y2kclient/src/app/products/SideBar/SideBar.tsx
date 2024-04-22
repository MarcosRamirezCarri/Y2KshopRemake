'use client'
import { useState } from "react";
import style from './SideBar.module.css'
import { IoIosArrowDroprightCircle , IoIosArrowDropleftCircle  } from "react-icons/io";




export default function SideBar() {
  const [statusBar, setStatusBar] = useState(true)

  const handleBar = () =>{
    setStatusBar(!statusBar)
  }

    return (
      <div>
<div className={`flex flex-col bg-gray-800 top-[8rem] transition-all duration-300 z-[100] left-0 fixed self-start w-[15%] h-[100vh] ${statusBar ? 'translate-x-0' : 'translate-x-[-50vw]'} `}>
<button className="text-3xl text-gray-100 p-5" onClick={handleBar}><IoIosArrowDropleftCircle  /></button>
   
      </div>
      {!statusBar ? <div className={style.animate}>
        <button className="text-5xl transition-all duration-100 text-gray-800 p-5" onClick={handleBar}><IoIosArrowDroprightCircle  /></button>
      </div>

      :null}
      
      </div>
      
    );
  }