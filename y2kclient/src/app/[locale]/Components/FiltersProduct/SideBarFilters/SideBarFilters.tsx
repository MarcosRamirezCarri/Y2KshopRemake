import React, { useEffect, useRef } from "react";
import style from "../SideBar.module.css";

interface PropsFilters {
  handleFilterCategory: (arg: string) => void;
  handleSizeCategory: (arg: string) => void;
  allSizes: string[];
  allCategories: string[];
  handleFilter1: () => void;
  handleFilter2: () => void;
  statusFilter1: boolean;
  statusFilter2: boolean;
  selectedSize: string;
  selectedCat: string;
}

const SideBarFilters: React.FC<PropsFilters> = ({
  handleFilterCategory,
  handleSizeCategory,
  allSizes,
  allCategories,
  handleFilter1,
  handleFilter2,
  statusFilter1,
  statusFilter2,
  selectedSize,
  selectedCat,
}) => {
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  const sizeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const applyAnimationDelay = (elements: NodeListOf<Element>) => {
      elements.forEach((element, index) => {
        (element as HTMLElement).style.animationDelay = `${index * 0.1}s`;
      });
    };

    if (statusFilter1 && categoryContainerRef.current) {
      const categoryElements = categoryContainerRef.current.querySelectorAll(
        `.${style.OnlyDropDown}`
      );
      applyAnimationDelay(categoryElements);
    }

    if (statusFilter2 && sizeContainerRef.current) {
      const sizeElements = sizeContainerRef.current.querySelectorAll(
        `.${style.OnlyDropDown}`
      );
      applyAnimationDelay(sizeElements);
    }
  }, [statusFilter1, statusFilter2]);
  return (
    <div className="relative flex flex-row items-center ">
      <div className="relative flex flex-col items-center p-2 gap-2 font-normal">
        <button
          className={`underline bg-Lightblue-200 px-6 py-2 rounded-[1.25rem] font-tiltneon text-lg lg:text-2xl text-Lightblue-950 ${
            statusFilter1
              ? "bg-Lightblue-300 decoration-Lightblue-300"
              : "bg-Lightblue-400 decoration-Lightblue-400"
          } hover:decoration-blue-900 transition-colors duration-200`}
          onClick={handleFilter1}
        >
          Categories
        </button>
        {statusFilter1 && (
          <div
            className="absolute top-[4rem] flex bg-[#00080a] p-2 rounded-xl flex-col gap-2"
            ref={categoryContainerRef}
          >
            <div
              className="relative caret-Lightblue-200 p-2 bg-Lightblue-300 rounded-[1.25rem] font-tiltneon text-lg lg:text-xl text-Lightblue-950 font-normal transition-all duration-300 after:rounded hover:scale-105 hover:ring-2 hover:ring-Lightblue-200"
              onClick={() => handleFilterCategory("all")}
            >
              All Categories
            </div>
            {allCategories.map((category: string, index: number) => (
              <div className={style.OnlyDropDown} key={index}>
                <div
                  className={`relative p-2 ${
                    selectedCat === category
                      ? "bg-Lightblue-300 ring-2 ring-Lightblue-200"
                      : "bg-Lightblue-200"
                  } rounded-[1.25rem] font-tiltneon text-md lg:text-lg text-Lightblue-950 font-normal transition-all duration-300 after:rounded hover:scale-105 hover:ring-2 hover:ring-Lightblue-200`}
                  onClick={() => handleFilterCategory(category)}
                >
                  {category}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="relative flex flex-col  items-center p-2 gap-2 font-normal">
        <button
          className={`underline bg-Lightblue-200 px-6 py-2 rounded-[1.25rem] font-tiltneon text-lg lg:text-2xl text-Lightblue-950 ${
            statusFilter2
              ? "bg-Lightblue-300 decoration-Lightblue-300"
              : "bg-Lightblue-400 decoration-Lightblue-400"
          } hover:decoration-Lightblue-900 transition-colors duration-200`}
          onClick={handleFilter2}
        >
          Sizes
        </button>
        {statusFilter2 && (
          <div
            className="absolute top-[4rem] flex bg-[#00080a] p-2 rounded-xl flex-col gap-2"
            ref={sizeContainerRef}
          >
            <div
              className="relative caret-Lightblue-200 p-2 bg-Lightblue-300 rounded-[1.25rem] font-tiltneon text-lg lg:text-xl text-Lightblue-950 font-normal transition-all duration-300 after:rounded hover:scale-105 hover:ring-2 hover:ring-Lightblue-200"
              onClick={() => handleSizeCategory("all")}
            >
              All Sizes
            </div>
            {allSizes.map((size: string, index: number) => (
              <div className={style.OnlyDropDown} key={index}>
                <div
                  className={`relative p-2 ${
                    selectedSize === size
                      ? "bg-Lightblue-300 ring-2 ring-Lightblue-200"
                      : "bg-Lightblue-200"
                  } rounded-[1.25rem] font-tiltneon text-md lg:text-lg text-Lightblue-950 font-normal transition-all duration-300 after:rounded hover:scale-105 hover:ring-2 hover:ring-Lightblue-200`}
                  onClick={() => handleSizeCategory(size)}
                >
                  {size}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBarFilters;
