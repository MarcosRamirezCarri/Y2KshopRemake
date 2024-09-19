import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/helpers/cloudinarySet";
import validateColors from "@/helpers/Validators/validateColors";
import validateProduct from "@/helpers/Validators/validatorProducts";
import LabelFormMod from "./Label/LabelModify";
import Product from "@/helpers/Types";
import MiniCard from "./MiniCard/Minicard";

interface ModifyProductModalProps {
  setStateAdmin: (arg: string) => void;
  stateAdmin: string;
}

const ModifyProductModal: React.FC<ModifyProductModalProps> = ({
  setStateAdmin,
  stateAdmin,
}) => {
  const [stateModal, setStateModal] = useState<boolean>(false);
  const [stateProduct, setStateProduct] = useState<Product>({
    id: 0,
    name: "",
    images: [],
    price: 0,
    colors: [],
    clasification: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    images: "",
    price: "",
    description: "",
    colors: "",
    colorErrors: [] as string[],
    sizeErrors: [] as string[],
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = await uploadImage(e.target.files[0]);

      if (imageUrl) {
        setStateProduct({ ...stateProduct, images: [...stateProduct.images, imageUrl] });
      } else {
        setErrors({ ...errors, images: "Failed to upload image" });
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...stateProduct.images];
    newImages.splice(index, 1);
    setStateProduct({ ...stateProduct, images: newImages });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newValue = name === "price" ? Number(value) : value;
    setStateProduct({ ...stateProduct, [name]: newValue });
    setErrors({ ...errors, [name]: "" });
  };

  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.product);
  return (
    <div
      className={`fixed inset-0 flex z-[101] items-center  justify-center bg-gray-900/[0.4] ${
        stateAdmin === "ModifyProduct" ? "visible" : "invisible"
      }`}
    >
      <div
        className={`w-[60%] font-titilium bg-Lightblue-200 gap-2 justify-center transition-all duration-250 grid grid-cols-2 p-6 rounded-lg shadow-lg transition-all duration-150 ${
          stateAdmin === "ModifyProduct"
            ? "scale-100 opacity-100"
            : "scale-125 opacity-0"
        }`}
      >
        <div className="flex items-center justify-center flex-row overflow-y-hidden overflow-x-auto">
          {products.length > 0 ? (
            products.map((prod) => (
              <MiniCard
                product={prod}
                setStateProduct={setStateProduct}
                stateProduct={stateProduct}
              />
            ))
          ) : (
            <p>There are no products</p>
          )}
        </div>
        <div className="flex flex-col items-center">
          {errors.images && (
            <p className="text-pink-950 font-titilium text-sm">
              {errors.images}
            </p>
          )}
          <div className="flex flex-row gap-3">
            {stateProduct.images.map((image, index) => (
              <div
                key={index}
                className="relative p-1 bg-Lightblue-400 ring-2 ring-Lightblue-500 flex flex-col hover:scale-105 transition-all duration-200 hover:ring-pink-950 rounded"
              >
                <Image
                  width={400}
                  height={400}
                  src={image}
                  alt="Uploaded"
                  className="w-20 h-20 object-cover mb-2"
                />
                <button
                  type="button"
                  className="absolute rounded flex bottom-0 text-xl self-center bg-Lightblue-400 text-white rounded-full px-1 hover:text-pink-950 hover:scale-105 transition-all duration-150"
                  onClick={() => handleRemoveImage(index)}
                >
                  &times;
                </button>
              </div>
            ))}
            
          </div>
          <label className="w-[50%] bg-Lightblue-400 flex flex-col items-center py-2 cursor-pointer m-2 font-titilium text-lg rounded ring-2 ring-Lightblue-500 hover:ring-Lightblue-700 active:bg-Lightblue-500 transition-all delay-50">
            <p>Upload Image</p>
            <input
              type="file"
              className="w-full hidden"
              onChange={handleFileChange}
            />
          </label>
          <LabelFormMod
            name="price"
            label="Price"
            onChange={handleChange}
            value={stateProduct.price}
            error={errors.price}
          />
          <LabelFormMod
            name="description"
            label="Description"
            onChange={handleChange}
            value={stateProduct.description}
            error={errors.price}
          />
        </div>
      </div>
    </div>
  );
};

export default ModifyProductModal;
