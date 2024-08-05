"use client";
import React, { useState } from "react";
import Product from "@/helpers/Types";
import { uploadImage } from "@/helpers/cloudinarySet";
import createProduct from "@/lib/actions/ProductActions/createProduct";

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
    colors: [
    ],
    clasification: "",
    description: "",
  });
  const [uploading, setUploading] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    name: "",
    images: "",
    price: "",
    clasification: "",
    colors: "",
    sizes:"",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
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
    if(product.colors.length < 3){
      setProduct({
        ...product,
        colors: [...product.colors, { color: "", sizes: [] }],
      });
    }else{
      setErrors({ ...errors, colors: "You cannot add more than 3 colors" })
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
      setErrors({ ...errors, sizes: "You cannot add more than 4 sizes" })
    }

  };

  const handleSizeChange = (
    colorIndex: number,
    sizeIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newColors = [...product.colors];
    newColors[colorIndex].sizes[sizeIndex][e.target.name] =
      e.target.value;
    setProduct({ ...product, colors: newColors });
  };

  const handleRemoveColor = (colorIndex: number) => {
    const newColors = [...product.colors];
    newColors.splice(colorIndex, 1);
    setProduct({ ...product, colors: newColors });
  };

  const handleRemoveSize = (colorIndex: number, sizeIndex: number) => {
    const newColors = [...product.colors];
    newColors[colorIndex].sizes.splice(sizeIndex, 1);
    setProduct({ ...product, colors: newColors });
  };

  const handleSave = () => {
    createProduct(product);
    setStateAdmin('');
  };

  return (
    <div
      className={`fixed inset-0 flex z-[101] items-center justify-center bg-gray-900/[0.4] ${
        stateAdmin === "CreateProduct" ? "visible" : "invisible"
      }`}
    >
      <div className="w-[50%] bg-Lightblue-200 gap-2  grid grid-cols-2 p-6 rounded-lg shadow-lg w-96">
        
<div className="flex flex-col items-center ">
<h2 className="text-xl font-bold mb-4">Create Product</h2>
        <input
          className={`w-full mb-3 p-2 border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } rounded`}
          type="text"
          name="name"
          placeholder="Name"
          value={product.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          type="file"
          className="w-full mb-3"
          onChange={handleFileChange}
        />
        {uploading && <p>Uploading...</p>}
        {errors.images && (
          <p className="text-red-500 text-sm">{errors.images}</p>
        )}
        {product.images.map((image, index) => (
          <div key={index} className="relative inline-block">
            <img
              src={image}
              alt="Uploaded"
              className="w-20 h-20 object-cover mb-2"
            />
            <button
              type="button"
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              onClick={() => handleRemoveImage(index)}
            >
              &times;
            </button>
          </div>
        ))}

        <input
          className={`w-full mb-3 p-2 border ${
            errors.price ? "border-red-500" : "border-gray-300"
          } rounded`}
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

        <input
          className={`w-full mb-3 p-2 border ${
            errors.clasification ? "border-red-500" : "border-gray-300"
          } rounded`}
          type="text"
          name="clasification"
          placeholder="Clasification"
          value={product.clasification}
          onChange={handleChange}
        />
        {errors.clasification && (
          <p className="text-red-500 text-sm">{errors.clasification}</p>
        )}

        <textarea
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />
</div>
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-bold">Colors and Sizes</h3>
          {product.colors.map((color, colorIndex) => (
            <div key={colorIndex}>
              <div className="flex items-center mb-1">
              {errors.colors && <p className="text-red-500 text-sm">{errors.colors}</p>}
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  placeholder="Color"
                  value={color.color}
                  onChange={(e) => handleColorChange(colorIndex, e)}
                />
                <button
                  type="button"
                  className="ml-2 bg-red-500 text-white rounded p-2"
                  onClick={() => handleRemoveColor(colorIndex)}
                >
                  &times;
                </button>
              </div>
              {errors.sizes && <p className="text-red-500 text-sm">{errors.sizes}</p>}
              {color.sizes.map((size, sizeIndex) => (
                <div key={sizeIndex} className="flex items-center mb-2">
                  <input
                    className="w-1/2 p-2 border border-gray-300 rounded mr-2"
                    type="text"
                    name="size"
                    placeholder="Size"
                    value={size.size}
                    onChange={(e) => handleSizeChange(colorIndex, sizeIndex, e)}
                  />
                  <input
                    className="w-1/2 p-2 border border-gray-300 rounded"
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={size.quantity}
                    onChange={(e) => handleSizeChange(colorIndex, sizeIndex, e)}
                  />
                  <button
                    type="button"
                    className="ml-2 bg-red-500 text-white rounded p-2"
                    onClick={() => handleRemoveSize(colorIndex, sizeIndex)}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="bg-blue-500 text-white rounded p-2 mt-2"
                onClick={() => handleAddSize(colorIndex)}
              >
                Add Size
              </button>
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-500 text-white rounded p-2"
            onClick={handleAddColor}
          >
            Add Color
          </button>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => setStateAdmin('')}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;