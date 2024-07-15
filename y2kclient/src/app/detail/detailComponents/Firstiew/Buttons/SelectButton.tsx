import Color from "@/helpers/Types";
import style from "./SelectButtons.module.css";
import { useState } from "react";

interface ButtonProps {
  handleChangeSize: any;
  handleChangeColor: any;
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
    <div className="relative self-end flex flex-col items-center p-2  font-normal">
      <button
        className={`underline  px-3 py-4 rounded-[1.25rem] font-tiltneon text-lg lg:text-xl text-pink-950 
      ${
        sizesState === true
          ? "bg-pink-300 decoration-pink-300"
          : "bg-pink-400 decoration-pink-400 "
      } hover:decoration-pink-900 transition-colors duration-200`}
        onClick={handleSizes}
      >
        Select Size
      </button>

      <div className={`absolute top-[4.50rem] flex flex-row lg:flex-col gap-2`}>
        {colors.map((colorObj: Color, colorIndex: number) => (
          <div
            key={colorIndex}
            className={`relative caret-blue-200 px-3 py-1 rounded-[1.25rem] font-tiltneon text-md lg:text-lg transition-all duration-300 ${
              sizesState ? "visible bg-pink-200 blur-none" : "invisible blur-lg"
            } font-normal transition-all duration-300 after:rounded hover:scale-105 hover:ring-2 hover:ring-pink-200`}
          >
            <div
              className={`${
                selectedColor === colorObj.color ? "bg-pink-400" : "bg-pink-300"
              } text-pink-950`}
              onClick={() => handleChangeColor(colorObj.color)}
            >
              {colorObj.color}
            </div>
            {selectedColor === colorObj.color && (
              <div className="flex flex-col gap-2 mt-2">
                {colorObj.sizes.map((sizeObj: any, sizeIndex: number) => (
                  <div
                    key={sizeIndex}
                    className={`${
                      selectedSize === sizeObj.size
                        ? "bg-blue-400"
                        : "bg-blue-300"
                    } rounded-[1.25rem] transition-all duration-500 ${sizesState ? 'visible translate-y-2 blur-none': 'invisible -translate-y-2 blur-lg'} font-tiltneon text-md lg:text-lg text-blue-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-blue-200`}
                    onClick={() => handleChangeSize(sizeObj.size)}
                  >
                    {sizeObj.size}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectButtons;
