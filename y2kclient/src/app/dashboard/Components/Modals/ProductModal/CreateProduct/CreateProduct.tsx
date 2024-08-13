"use client";
import React, { useState } from "react";
import Image from "next/image";
import Product from "@/helpers/Types";
import { uploadImage } from "@/helpers/cloudinarySet";
import validateProduct from "@/helpers/Validators/validatorProducts";
import validateColors from "@/helpers/Validators/validateColors";
import createProduct from "@/lib/actions/ProductActions/createProduct";
import LabelForm from "./Labels/LabelForm";
import LabelColors from "./Labels/LabelColors";

interface ModalProps {
  setStateAdmin: (arg: string) => void;
  stateAdmin: string;
}

const CreateModal: React.FC<ModalProps> = ({ setStateAdmin, stateAdmin }) => {
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    images: [],
    price: 0,
    colors: [],
    clasification: "",
    description: "",
  });
  const [uploading, setUploading] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    name: "",
    images: "",
    price: "",
    description: "",
    clasification: "",
    colors: "",
    colorName: "",
    sizesQuantity: "",
    sizes: "",
    duplicateSizes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newValue = name === "price" ? Number(value) : value;
    setProduct({ ...product, [name]: newValue });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      const imageUrl = await uploadImage(e.target.files[0]);
      setUploading(false);

      if (imageUrl) {
        setProduct({ ...product, images: [...product.images, imageUrl] });
      } else {
        setErrors({ ...errors, images: "Failed to upload image" });
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...product.images];
    newImages.splice(index, 1);
    setProduct({ ...product, images: newImages });
  };

  const handleAddColor = () => {
    if (product.colors.length < 3) {
      setProduct({
        ...product,
        colors: [...product.colors, { color: "", sizes: [] }],
      });
    } else {
      setErrors({ ...errors, colors: "You cannot add more than 3 colors" });
    }
  };

  const handleColorChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newColors = [...product.colors];
    newColors[index].color = e.target.value;
    setProduct({ ...product, colors: newColors });
    
  };

  const handleAddSize = (colorIndex: number) => {
    const newColors = [...product.colors];
    if (newColors[colorIndex].sizes.length < 4) {
      newColors[colorIndex].sizes.push({ size: "", quantity: 0 });
      setProduct({ ...product, colors: newColors });
    } else {
      setErrors({ ...errors, sizes: "You cannot add more than 4 sizes" });
    }
  };

  const handleSizeChange = (
    colorIndex: number,
    sizeIndex: number,
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const newColors = [...product.colors];
    newColors[colorIndex].sizes[sizeIndex][e.target.name] = e.target.value;
    setProduct({ ...product, colors: newColors });
  };

  const handleRemoveColor = (colorIndex: number) => {
    const newColors = [...product.colors];
    newColors.splice(colorIndex, 1);
    setProduct({ ...product, colors: newColors });
    setErrors({ ...errors, colors: "" });
  };

  const handleRemoveSize = (colorIndex: number, sizeIndex: number) => {
    const newColors = [...product.colors];
    newColors[colorIndex].sizes.splice(sizeIndex, 1);
    setProduct({ ...product, colors: newColors });
    setErrors({ ...errors, sizes: "" });
  };

  const handleSave = () => {
    const errorsBackup: any = validateProduct(product);
    const errorsColorsBackup = validateColors(product.colors);

    const combinedErrors = { ...errorsBackup, ...errorsColorsBackup };
    setErrors(combinedErrors);

    const hasErrors = Object.values(errors).some((error) => error !== "");
    const hasProduct = Object.values(product).some((prod) => prod === "");
    if (!hasErrors && !hasProduct) {
      alert("se creo");
      createProduct(product);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex z-[101] items-center justify-center bg-gray-900/[0.4] ${
        stateAdmin === "CreateProduct" ? "visible" : "invisible"
      }`}
    >
      <div className="w-[60%] bg-Lightblue-200 gap-2 justify-center   grid grid-cols-2 p-6 rounded-lg shadow-lg">
        <h2 className="col-span-2 flex justify-center font-titilium text-2xl font-semibold ">
          Create Product
        </h2>
        <div className="flex flex-col items-center ">
          <LabelForm
            name="name"
            label="Name"
            onChange={handleChange}
            value={product.name}
            error={errors.name}
          />
          <label className="w-[50%] bg-Lightblue-400 flex flex-col items-center py-2 cursor-pointer m-2 font-titilium text-lg rounded ring-2 ring-Lightblue-500 hover:ring-Lightblue-700 active:bg-Lightblue-500 transition-all delay-50">
            <p>Upload Image</p>
            <input
              type="file"
              className="w-full hidden"
              onChange={handleFileChange}
            />
          </label>

          {uploading && <p>Uploading...</p>}
          {errors.images && (
            <p className="text-pink-950 font-titilium text-sm">{errors.images}</p>
          )}
          <div className="flex flex-row gap-3">
            {product.images.map((image, index) => (
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

          <LabelForm
            name="price"
            label="Price"
            onChange={handleChange}
            value={product.price}
            error={errors.price}
          />
          <LabelForm
            name="clasification"
            label="Clasification"
            onChange={handleChange}
            value={product.clasification}
            error={errors.clasification}
          />
          <LabelForm
            name="description"
            label="Description"
            onChange={handleChange}
            value={product.description}
            error={errors.description}
          />
        </div>
        <LabelColors
          errors={errors}
          product={product}
          handleAddColor={handleAddColor}
          handleAddSize={handleAddSize}
          handleRemoveColor={handleRemoveColor}
          handleRemoveSize={handleRemoveSize}
          handleColorChange={handleColorChange}
          handleSizeChange={handleSizeChange}
        />
        <div className="col-span-2 flex justify-center mt-4">
          <button
            type="button"
            className="bg-green-500 text-white rounded p-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => setStateAdmin("")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
