import Product from "@/helpers/Types";

interface ModalColorsProps {
  setStateModal: (arg: boolean) => void;
  stateModal: string;
  stateProduct: Product;
  setStateProduct: (arg:any) => void;
  setErrors: (arg: any) => void;
  errors: any
}

const ModalColors: React.FC<ModalColorsProps> = ({
  stateModal,
  setStateModal,
  stateProduct,
  setStateProduct,
  setErrors,
  errors
}) => {
  const handleAddColor = () => {
    if (stateProduct.colors.length < 3) {
      setStateProduct({
        ...stateProduct,
        colors: [...stateProduct.colors, { color: "", sizes: [] }],
      });
    } else {
      setErrors({ ...errors, colors: "You cannot add more than 3 colors" });
    }
  };

  const handleColorChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newColors = [...stateProduct.colors];
    newColors[index].color = e.target.value;
    setStateProduct({ ...stateProduct, colors: newColors });
  };

  const handleAddSize = (colorIndex: number) => {
    const newColors = [...stateProduct.colors];
    if (newColors[colorIndex].sizes.length < 4) {
      newColors[colorIndex].sizes.push({ size: "", quantity: 0 });
      setStateProduct({ ...stateProduct, colors: newColors });
    } else {
      setErrors({ ...errors, colors: "You cannot add more than 4 sizes" });
    }
  };

  const handleSizeChange = (
    colorIndex: number,
    sizeIndex: number,
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const newColors = [...stateProduct.colors];
    newColors[colorIndex].sizes[sizeIndex][e.target.name] = e.target.value;
    setStateProduct({ ...stateProduct, colors: newColors });
  };

  const handleRemoveColor = (colorIndex: number) => {
    const newColors = [...stateProduct.colors];
    newColors.splice(colorIndex, 1);
    setStateProduct({ ...stateProduct, colors: newColors });
    setErrors({ ...errors, colors: "" });
  };

  const handleRemoveSize = (colorIndex: number, sizeIndex: number) => {
    const newColors = [...stateProduct.colors];
    newColors[colorIndex].sizes.splice(sizeIndex, 1);
    setStateProduct({ ...stateProduct, colors: newColors });
    setErrors({ ...errors, sizeErrors: [] });
  };
  return (
    <div
      className={`${
        stateModal ? "visible" : "invisible"
      } justify-center bg-gray-900/[0.4] z-[105] fixed inset-0 flex `}
    >
      <div
        className={`w-[60%] font-titilium bg-Lightblue-200 gap-2 justify-center transition-all duration-250 grid grid-cols-2 p-6 rounded-lg shadow-lg transition-all duration-150 ${
          stateModal ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <div className="flex flex-col w-[100%] max-h-[25rem]">
      <div className="text-Lightblue-950 flex justify-between flex-row font-titilium text-lg">
        <p>Colors and size:</p>
        {errors.colors && (
          <p className="text-pink-950 self-end text-sm">{errors.colors}</p>
        )}
      </div>
      <div className="overflow-x-hidden overflow-y-auto">
        {stateProduct.colors.map((color, colorIndex) => (
          <div key={colorIndex}>
            <div className="flex items-center mb-1">
              <input
                className={`w-full p-2 border ${
                  errors.colorErrors && errors.colorErrors[colorIndex]
                    ? "border-pink-950"
                    : "border-Lightblue-300"
                } rounded focus:outline-Lightblue-400`}
                type="text"
                placeholder="Color"
                value={color.color}
                onChange={(e) => handleColorChange(colorIndex, e)}
              />
              <button
                type="button"
                className="ml-2 bg-Lightblue-400 text-xl rounded transition-all duration-150 p-1 hover:ring-2 hover:ring-Lightblue-500 active:bg-Lightblue-600"
                onClick={() => handleRemoveColor(colorIndex)}
              >
                &times;
              </button>
            </div>
            {errors.colorErrors && errors.colorErrors[colorIndex] && (
              <p className="text-pink-950 font-titilium text-sm">{errors.colorErrors[colorIndex]}</p>
            )}
            {color.sizes.map((size, sizeIndex) => (
              <div key={sizeIndex} className="flex items-center mb-2">
                <select
                  className="w-1/2 p-2 border border-Lightblue-300 focus:outline-Lightblue-400 rounded mr-2"
                  name="size"
                  value={size.size}
                  onChange={(e) => handleSizeChange(colorIndex, sizeIndex, e)}
                >
                  <option value="">Select Size</option>
                  <option value="XL">XL</option>
                  <option value="L">L</option>
                  <option value="M">M</option>
                  <option value="S">S</option>
                </select>
                <input
                  className="w-1/2 p-2 border rounded border-Lightblue-300 focus:outline-Lightblue-400"
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={size.quantity}
                  onChange={(e) => handleSizeChange(colorIndex, sizeIndex, e)}
                />
                <button
                  type="button"
                  className="ml-2 bg-Lightblue-300 text-md rounded transition-all duration-150 p-1 hover:ring-2 hover:ring-Lightblue-400 active:bg-Lightblue-400"
                  onClick={() => handleRemoveSize(colorIndex, sizeIndex)}
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-white rounded p-1 bg-Lightblue-300"
              onClick={() => handleAddSize(colorIndex)}
            >
              Add Size
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="w-[50%] bg-Lightblue-400 flex flex-col self-center items-center cursor-pointer font-titilium text-lg rounded ring-2 ring-Lightblue-500 hover:ring-Lightblue-700 active:bg-Lightblue-500 transition-all delay-50"
        onClick={handleAddColor}
      >
        Add Color
      </button>
    </div>
      </div>
    </div>
  );
};
