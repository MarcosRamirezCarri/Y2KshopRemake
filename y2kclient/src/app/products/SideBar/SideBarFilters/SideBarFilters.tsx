import style from "../SideBar.module.css";

interface PropsFilters {
  handleFilterCategory: any;
  handleSizeCategory: any;
  allSizes: any;
  allCategories: any;
  handleFilter1: any;
  handleFilter2: any;
  statusFilter1: boolean;
  statusFilter2: boolean;
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
}) => {
  return (
    <div className="relative flex flex-col items-center gap-5">
      <div className="relative flex flex-col items-center p-2 gap-2  font-normal">
        <button
          className={`underline bg-blue-200  p-2 rounded-[1.25rem] font-tiltneon text-lg lg:text-xl text-blue-950 
      ${
        statusFilter1 === true
          ? "bg-blue-300 decoration-blue-300"
          : "bg-blue-400 decoration-blue-400 "
      } hover:decoration-blue-900 transition-colors duration-200`}
          onClick={handleFilter1}
        >
        Categories
        </button>
        {statusFilter1 ? (
          <div className="relative flex flex-col gap-2">
             <div
              className="relative caret-blue-200 p-2 bg-blue-300 rounded-[1.25rem] font-tiltneon text-lg lg:text-xl text-blue-950 font-normal transition-all duration-300 after:rounded hover:scale-105 hover:ring-2 hover:ring-blue-200"
              onClick={() => handleFilterCategory("all")}
            >
              All Categories
            </div>
            {allCategories.map((category: string, index: any) => (
              <div className={style.OnlyDropDown}>
              <div
                className="relative caret-blue-200 p-2 bg-blue-300 rounded-[1.25rem] font-tiltneon text-md lg:text-lg text-blue-950 font-normal transition-all duration-300 after:rounded hover:scale-105 hover:ring-2 hover:ring-blue-200"
                key={index}
                onClick={() => handleSizeCategory(category)}
              >
                {category}
              </div>
            </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="relative flex flex-col items-center p-2 gap-2  font-normal">
        <button
          className={`underline bg-blue-200  p-2 rounded-[1.25rem] font-tiltneon text-lg lg:text-xl text-blue-950 
      ${
        statusFilter2 === true
          ? "bg-blue-300 decoration-blue-300"
          : "bg-blue-400 decoration-blue-400 "
      } hover:decoration-blue-900 transition-colors duration-200`}
          onClick={handleFilter2}
        >
          Select Size
        </button>
        {statusFilter2 ? (
          <div className="relative flex flex-col gap-2">
            <div
              className="relative caret-blue-200 p-2 bg-blue-300 rounded-[1.25rem] font-tiltneon text-lg lg:text-xl text-blue-950 font-normal transition-all duration-300 after:rounded hover:scale-105 hover:ring-2 hover:ring-blue-200"
              onClick={() => handleSizeCategory("all")}
            >
              All Sizes
            </div>
            {allSizes.map((size: string, index: any) => (
              <div className={style.OnlyDropDown}>
                <div
                  className="relative caret-blue-200 p-2 bg-blue-300 rounded-[1.25rem] font-tiltneon text-md lg:text-lg text-blue-950 font-normal transition-all duration-300 after:rounded hover:scale-105 hover:ring-2 hover:ring-blue-200"
                  key={index}
                  onClick={() => handleSizeCategory(size)}
                >
                  {size}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SideBarFilters;
