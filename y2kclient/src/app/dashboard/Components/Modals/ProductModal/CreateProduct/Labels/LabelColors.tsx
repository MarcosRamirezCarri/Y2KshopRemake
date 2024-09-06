import Product from "@/helpers/Types";

interface LabelTypes {
  errors: any;
  product: Product;
  handleRemoveColor: (colorIndex: number) => void;
  handleRemoveSize: (colorIndex: number, sizeIndex: number) => void;
  handleAddColor: any;
  handleAddSize: (colorIndex: number) => void;
  handleColorChange: (colorIndex: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSizeChange: (
    colorIndex: number,
    sizeIndex: number,
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
}

const LabelColors: React.FC<LabelTypes> = ({
  errors,
  product,
  handleAddColor,
  handleRemoveColor,
  handleRemoveSize,
  handleAddSize,
  handleColorChange,
  handleSizeChange,
}) => {
  return (
    <div className="flex flex-col w-[100%] max-h-[25rem]">
      <div className="text-Lightblue-950 flex justify-between flex-row font-titilium text-lg">
        <p>Colors and size:</p>
        {errors.colors && (
          <p className="text-pink-950 self-end text-sm">{errors.colors}</p>
        )}
      </div>
      <div className="overflow-x-hidden overflow-y-auto">
        {product.colors.map((color, colorIndex) => (
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
  );
};

export default LabelColors;