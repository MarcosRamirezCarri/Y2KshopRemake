import Image from "next/image";
import SelectButtons from "./Buttons/SelectButton/SelectButton";
import AddToCart from "./Buttons/AddToCart/AddToCartbtn";

interface DetailProducts {
  name: string;
  price: number;
  description: any;
  clasification: string;
  images: string[];
  colors: any;
  handleChangeSize: any;
  handleChangeColor: any;
  selectedSize: string | null;
  selectedColor: string | null;
}

const FirstView: React.FC<DetailProducts> = ({
  name,
  price,
  images,
  description,
  clasification,
  colors,
  selectedSize,
  handleChangeSize,
  handleChangeColor,
  selectedColor,
}) => {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-5 col-span-3 w-[100%] gap-3">
      <div className="col-span-1 flex flex-col relative items-center py-0 top-20 lg:top-1 lg:py-10 gap-5">
        {images.length > 1
          ? images.map((img, index) => (
              <Image
                key={index}
                src={img}
                className="rounded w-[8.25rem] lg:w-[10.25rem] ring-2 ring-pink-300 h-[8.25rem] lg:h-[10.25rem] bg-transparent hover:ring-pink-500"
                alt="no image"
                width={480}
                height={400}
              />
            ))
          : null}
      </div>
      <div className="col-span-2 flex flex-col items-center gap-3 ">
        <p className="font-tiltneon text-2xl lg:text-3xl text-pink-950 font-semibold">
          {name}
        </p>
        <Image
          width={880}
          height={800}
          src={images[0]}
          className="rounded w-[20.25rem] lg:w-[24.25rem] ring-2 ring-pink-300 h-[20.25rem] lg:h-[24.25rem] bg-transparent"
          alt="no image"
        />
      </div>

      <div className="flex flex-col p-6 justify-center items-left col-span-3 lg:col-span-2 gap-3">
        <p className="font-tiltneon text-xl text-pink-950 font-normal flex flex-row">
          Category:{" "}
          <p className="font-tiltneon text-lg text-gray-800 text-justify font-light px-2">
            - {clasification}
          </p>
        </p>

        <p className="font-tiltneon text-xl text-pink-950 font-normal flex flex-row ">
          Description:
        </p>
        <p className="font-tiltneon text-lg text-gray-800 text-justify font-light">
          - {description}
        </p>
        <p className="font-tiltneon text-xl text-pink-950 font-normal flex flex-row">
          Price:{" "}
          <p className="font-tiltneon text-lg text-gray-800 text-justify font-light px-2">
            - ${price}
          </p>
        </p>
        <p className="font-tiltneon text-xl text-pink-950 font-normal flex flex-row">
          Selected Size: {selectedSize}
        </p>
        <div className="flex flex-row items-center justify-center gap-2">
          <AddToCart
            selectedColor={selectedColor}
            selectedSize={selectedSize}
          />
          <SelectButtons
            handleChangeColor={handleChangeColor}
            handleChangeSize={handleChangeSize}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            colors={colors}
          />
        </div>
      </div>
    </div>
  );
};

export default FirstView;
