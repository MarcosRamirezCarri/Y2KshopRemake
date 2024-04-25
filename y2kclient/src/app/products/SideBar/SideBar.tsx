"use client";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { sortByCategory, sortBySize } from "@/lib/slices/productsReducer";
import { getAllProducts } from "@/lib/actions/getAllProducts";
import style from "./SideBar.module.css";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

interface ProductCategory{
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  sizes: string[]
}

export default function SideBar() {
  const [statusBar, setStatusBar] = useState(true);
  const dispatch = useAppDispatch();

  const stateProducts = useAppSelector((state) => state.products.sortProducts);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllProducts());
    };
    fetchData();
  }, []);

  const handleFilterCategory = (category: string) => {
    dispatch(sortByCategory(category));
  };
  const handleSizeCategory = (size: string) =>{
    dispatch(sortBySize(size))
  }

  const getUniqueCategories = (items: ProductCategory[]): string[] => {
    const categoriesSet = new Set<string>();
    items.forEach(item => {
      categoriesSet.add(item.category);
    });
    return Array.from(categoriesSet);
  };

  const getUniqueSizes = (items: ProductCategory[]) =>{
    const sizesSet = new Set<string>();
    items.forEach(product => {
      product.sizes.forEach(category => {
        sizesSet.add(category);
      });
    });
    return Array.from(sizesSet);
  }

  const allSizes = getUniqueSizes(stateProducts)
 

  const allCategories = getUniqueCategories(stateProducts)

  const handleBar = () => {
    setStatusBar(!statusBar);
  };

  return (
    <div>
      <div
        className={`flex flex-col bg-gray-800 gap-5 p-2 top-[8rem] transition-all duration-300 z-[100] left-0 fixed self-start w-[15%] h-[100vh] ${
          statusBar ? "translate-x-0" : "translate-x-[-50vw]"
        } `}
      >
        <button className="text-3xl text-gray-100 p-5" onClick={handleBar}>
          <IoIosArrowDropleftCircle />
        </button>
<p>Select category</p>
        <select onChange={(e) => handleFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {allCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

<p>Select Size</p>
        <select className="relative caret-blue-200 p-2 bg-blue-300 rounded-[1.25rem] font-tiltneon text-xl text-blue-950 font-normal transition-all duration-300 after:rounded hover:scale-105 hover:ring-2 hover:ring-blue-200" onChange={(e) => handleSizeCategory(e.target.value)}> 
          <option className="bg-blue-200 p-2 rounded-[1rem]" value="all">All Sizes</option>
          {allSizes.map((size, index) => (
            <option className="bg-blue-200 p-2 rounded-[1rem]" key={index} value={size}>
              {size}
            </option>
          ))}

         
        </select>
      </div>
      {!statusBar ? (
        <div className={style.animate}>
          <button
            className="text-5xl transition-all duration-100 text-gray-800 p-5"
            onClick={handleBar}
          >
            <IoIosArrowDroprightCircle />
          </button>
        </div>
      ) : null}
    </div>
  );
}
