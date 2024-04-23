"use client";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { sortByCategory } from "@/lib/slices/productsReducer";
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

  const getUniqueCategories = (items: ProductCategory[]): string[] => {
    const categoriesSet = new Set<string>();
    items.forEach(item => {
      categoriesSet.add(item.category);
    });
    return Array.from(categoriesSet);
  };

  const allCategories = getUniqueCategories(stateProducts)

  const handleBar = () => {
    setStatusBar(!statusBar);
  };

  return (
    <div>
      <div
        className={`flex flex-col bg-gray-800 top-[8rem] transition-all duration-300 z-[100] left-0 fixed self-start w-[15%] h-[100vh] ${
          statusBar ? "translate-x-0" : "translate-x-[-50vw]"
        } `}
      >
        <button className="text-3xl text-gray-100 p-5" onClick={handleBar}>
          <IoIosArrowDropleftCircle />
        </button>

        <select onChange={(e) => handleFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {allCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select>
          <option value="">All Categories</option>
            <option> 
              S
            </option>
            <option> 
              M
            </option>
            <option> 
              L
            </option>
            <option> 
              XL
            </option>

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
