'use client'
import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function Home() {
    const [input, setInput] = useState<string>('')

    return (
      <div className="flex flex-col w-[40%] h-[80%] ">
   <input type="text"
   placeholder="Search Products..."
   >
   </input>
   <button type="submit">
<HiMagnifyingGlass/>
   </button>
      </div>
    );
  }