"use client";
import React, { useState } from "react";
import Product from "@/helpers/Types";
import { uploadImage } from "@/helpers/cloudinarySet";
import validateProduct from "@/helpers/Validators/validatorProducts";
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
    colors: [],
    clasification: "",
    description: "",
  });
  const [uploading, setUploading] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    name: "",
    images: "",
    price: "",
    clasification: "",
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

  const handleSave = () => {
    createProduct(product);
    setStateAdmin('');
  };


  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-500/[0.4] ${
        stateAdmin === "CreateProduct" ? "visible" : "invisible"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
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
          <img
            key={index}
            src={image}
            alt="Uploaded"
            className="w-20 h-20 object-cover"
          />
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
