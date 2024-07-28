"use client";
import { useState, useEffect } from "react";
import Product from "@/helpers/Types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { sortByCategory, sortBySize } from "@/lib/slices/productsReducer";
import { getAllProducts } from "@/lib/actions/getAllProducts";
import SideBarFilters from "./SideBarFilters/SideBarFilters";
import style from "./SideBar.module.css";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

export default function SideBar() {
  const [statusBar, setStatusBar] = useState<boolean>(true);
  const [statusFilter2, setStatusFilter2] = useState<boolean>(false);
  const [statusFilter1, setStatusFilter1] = useState<boolean>(false);
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

  const getUniqueCategories = (items: Product[]): string[] => {
    const categoriesSet = new Set<string>();
    items.forEach((item) => {
      categoriesSet.add(item.clasification);
    });
    return Array.from(categoriesSet);
  };

  const getUniqueSizes = (items: Product[]) => {
    const sizesSet = new Set<string>();
    items.forEach((product) => {
      product.colors.forEach((category) => {
        category.sizes.some((size) => sizesSet.add(size.size));
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
    if (statusFilter2 === true) {
      setStatusFilter2(false);
    }
  };
  const handleFilter2 = () => {
    setStatusFilter2(!statusFilter2);
    if (statusFilter1 === true) {
      setStatusFilter1(false);
    }
  };

  return (
    <div>
      <div
        className={`flex flex-col bg-gray-950 gap-2 p-2 top-[8rem] transition-all duration-300 z-[100] left-0 fixed self-start w-[40%] lg:w-[15%] h-[100vh] ${
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
