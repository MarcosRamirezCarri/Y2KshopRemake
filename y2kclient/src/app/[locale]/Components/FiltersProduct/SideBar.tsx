"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { sortByCategory, sortBySize } from "@/lib/slices/productsReducer";
import { Product } from "@/helpers/types/Types";
import SideBarFilters from "./SideBarFilters/SideBarFilters";
import style from "./SideBar.module.css";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";

 const SideBar = () => {
  const [statusBar, setStatusBar] = useState<boolean>(true);
  const [statusFilter2, setStatusFilter2] = useState<boolean>(false);
  const [statusFilter1, setStatusFilter1] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const selectedCat = useAppSelector((state) => state.products.selectedCategory)
  const selectedSize = useAppSelector((state) => state.products.selectedSize)

  const stateProducts = useAppSelector((state) => state.products.sortProducts);

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
      product.colors.forEach((color) => {
        color.sizes.forEach((size) => {
          if (size.quantity > 0) {
            sizesSet.add(size.size);
          }
        });
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
        className={`flex flex-row bg-[#00080a] gap-2 p-2 pt-8 lg:pt-0 rounded-b-2xl top-[4.5rem] transition-all duration-300 z-[90] right-0 fixed self-start lg:w-[40%]  ${
          statusBar
            ? "translate-y-0 visible blur-none"
            : "translate-y-[-50vh] invisible blur-lg"
        } `}
      >
        <button
          className="text-3xl h-[1%] relative text-Lightblue-100 p-5"
          onClick={handleBar}
        >
          <IoIosArrowDropupCircle />
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
          selectedCat={selectedCat}
          selectedSize={selectedSize}
          
        />
      </div>
      {!statusBar ? (
        <div className={style.animate}>
          <button
            className="text-5xl transition-all duration-100 text-Lightblue-800 p-5"
            onClick={handleBar}
          >
            <IoIosArrowDropdownCircle />
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default SideBar