import { useState } from "react";

interface ButtonProps {
  handleChangeSize: (arg: string)=>void;
  handleChangeColor: (arg: string)=>void;
  selectedSize: string | null;
  selectedColor: string | null;
  colors: any;
}

const SelectButtons: React.FC<ButtonProps> = ({
  handleChangeColor,
  colors,
  selectedColor,
  selectedSize,
  handleChangeSize,
}) => {
  const [sizesState, setSizesState] = useState<Boolean>(false);

  const handleSizes = () => {
    setSizesState(!sizesState);
  };
  return (
    <div className="relative flex flex-col items-center select-none font-normal">
      <button
        className={`underline  px-3 py-4 rounded-xl font-tiltneon text-lg lg:text-xl text-pink-950 
      ${
        sizesState === true
          ? "bg-pink-300 decoration-pink-300"
          : "bg-pink-400 decoration-pink-400 "
      } hover:decoration-pink-900 transition-colors duration-200 active:bg-pink-500 `}
        onClick={handleSizes}
      >
        Select Size
      </button>

      <div className={`absolute left-[6.5rem] flex flex-row gap-2`}>
        {colors.map((colorObj: any, colorIndex: number) => (
          <div
            key={colorIndex}
            className={`relative flex flex-row items-center gap-1 caret-blue-200 px-3 py-1 rounded-lg font-tiltneon text-lg lg:text-xl transition-all duration-300 ${
              sizesState
                ? "visible bg-pink-200 translate-y-[0.4rem] blur-none"
                : "invisible -translate-y-[2rem] blur-lg"
            } font-normal`}
          >
            <div
              className={`${
                selectedColor === colorObj.color ? "bg-pink-400" : "bg-pink- 200"
              } text-pink-950 py-1 px-2 rounded cursor-pointer`}
              onClick={() => handleChangeColor(colorObj.color)}
            >
              {colorObj.color}
            </div>
          
                { colorObj.sizes.map((sizeObj: any, sizeIndex: number) => (
                  <div
                    key={sizeIndex}
                  
                    className={`${
                      selectedSize === sizeObj.size
                        ? "bg-blue-400"
                        : "bg-blue-200"
                    } rounded-md transition-all duration-500 ${
                      selectedColor === colorObj.color
                        ? " translate-y-[0rem] visible blur-none "
                        : " -translate-y-[1rem] hidden invisible blur-lg"
                    } font-tiltneon cursor-pointer px-3 flex flex-row text-md justify-center w-[100%] lg:text-lg text-gray-950 font-semibold hover:ring-2 active:bg-pink-400 hover:bg-pink-300 hover:ring-pink-400`}
                    onClick={() => handleChangeSize(sizeObj.size)}
                  >
                    {sizeObj.size}
                  </div>
                ))}
          
  
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectButtons;
