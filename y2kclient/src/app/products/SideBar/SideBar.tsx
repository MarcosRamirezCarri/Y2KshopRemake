"use client";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { sortByCategory, sortBySize } from "@/lib/slices/productsReducer";
import { getAllProducts } from "@/lib/actions/getAllProducts";
import SideBarFilters from "./SideBarFilters/SideBarFilters";
import style from "./SideBar.module.css";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

interface ProductCategory {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  sizes: string[];
}

export default function SideBar() {
  const [statusBar, setStatusBar] = useState<boolean>(true);
  const [statusFilter2, setStatusFilter2] = useState<boolean>(false);
  const [statusFilter1, setStatusFilter1] = useState<boolean>(false);
  const [statusSelectedFilter, setStatusSelectedFilter] = useState<string>("");
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
  const handleSizeCategory = (size: string) => {
    dispatch(sortBySize(size));
  };

  const getUniqueCategories = (items: ProductCategory[]): string[] => {
    const categoriesSet = new Set<string>();
    items.forEach((item) => {
      categoriesSet.add(item.category);
    });
    return Array.from(categoriesSet);
  };

  const getUniqueSizes = (items: ProductCategory[]) => {
    const sizesSet = new Set<string>();
    items.forEach((product) => {
      product.sizes.forEach((category) => {
        sizesSet.add(category);
      });
    });
    return Array.from(sizesSet);
  };

  const allSizes = getUniqueSizes(stateProducts);

  const allCategories = getUniqueCategories(stateProducts);

  const handleBar = () => {
    setStatusBar(!statusBar);
    
  };
  const handleFilter1 = () => {
    setStatusFilter1(!statusFilter1);
    if(statusFilter2 === true){
      setStatusFilter2(false)
    }
  };
  const handleFilter2 = () => {
    setStatusFilter2(!statusFilter2);
    if(statusFilter1 === true){
      setStatusFilter1(false)
    }
  };

  return (
    <div>
      <div
        className={`flex flex-col bg-gray-800 gap-2 p-2 top-[8rem] transition-all duration-300 z-[100] left-0 fixed self-start w-[40%] lg:w-[15%] h-[100vh] ${
          statusBar ? "translate-x-0" : "translate-x-[-50vw]"
        } `}
      >
        <button className="text-3xl text-gray-100 p-5" onClick={handleBar}>
          <IoIosArrowDropleftCircle />
        </button>
        <SideBarFilters
          handleFilter1={handleFilter1}
          handleFilter2={handleFilter2}
          handleFilterCategory={handleFilterCategory}
          handleSizeCategory={handleSizeCategory}
          allCategories={allCategories}
          allSizes={allSizes}
          statusFilter1={statusFilter1}
          statusFilter2={statusFilter2}
        />
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
