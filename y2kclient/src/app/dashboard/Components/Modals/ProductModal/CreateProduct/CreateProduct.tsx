"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/helpers/types/Types";
import { uploadImage } from "@/helpers/services/cloudinarySet";
import { useAppDispatch } from "@/lib/hooks/hooks";
import validateProduct from "@/helpers/validators/validatorProducts";
import validateColors from "@/helpers/validators/validateColors";
import { createProduct } from "@/lib/actions/AdminActions/createProduct";
import { getAllProducts } from "@/lib/actions/ProductActions/getAllProducts";
import Swal from "sweetalert2";
import LabelForm from "./Labels/LabelForm";
import CreateModalColors from "./ModalColors/ModaLColors";
import ClasificationSelector from "./Selectors/ClasificationSelector";

interface ModalProps {
  setStateAdmin: (arg: string) => void;
  stateAdmin: string;
}

interface Errors {
  name: string;
  images: string;
  price: string;
  description: string;
  clasification: string;
  colors: string;
  colorErrors: string[];
  sizeErrors: string[];
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
  const [uploading, setUploading] = useState(false);
  const [stateModal, setStateModal] = useState(false);
  const [errors, setErrors] = useState<Errors>({
    name: "",
    images: "",
    price: "",
    description: "",
    clasification: "",
    colors: "",
    colorErrors: [] as string[],
    sizeErrors: [] as string[],
  });
  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === "price" ? Number(value) : value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setUploading(true);
      const imageUrl = await uploadImage(e.target.files[0]);
      setUploading(false);
      imageUrl
        ? setProduct({ ...product, images: [...product.images, imageUrl] })
        : setErrors({ ...errors, images: "Failed to upload image" });
    }
  };

  const handleSave = () => {
    const combinedErrors = {
      ...validateProduct(product),
      ...validateColors(product.colors),
    };
    setErrors(combinedErrors);

    const hasErrors = Object.values(combinedErrors).some((error) =>
      Array.isArray(error) ? error.some((subError) => subError) : error
    );

    if (
      !hasErrors &&
      Object.values(product).every((value) =>
        Array.isArray(value) ? value.length : value
      )
    ) {
      dispatch(createProduct(product)).then((result: any) => {
        if (result?.success) {
          dispatch(getAllProducts()),
            Swal.fire("Product Created!", "", "success").then(() =>
              setProduct({
                id: 0,
                name: "",
                images: [],
                price: 0,
                colors: [],
                clasification: "",
                description: "",
              })
            );
        } else {
          Swal.fire("Something Failed!", result.message, "error");
        }
      });
    } else {
      Swal.fire("Fix the errors before uploading", "", "error");
    }
  };

  const renderLabel = <K extends keyof Omit<Errors, "colorErrors" | "sizeErrors">>(
    name: K,
    label: string ,
    type: "text" | "number" = "text"
  ) => (
    <LabelForm
      name={name}
      label={label}
      type={type}
      onChange={handleChange}
      value={product[name]?.toString() || ""}
      error={errors[name]}
    />
  );

  return (
    <div
      className={`fixed inset-0 flex z-[101] items-center justify-center bg-gray-900/[0.4] ${
        stateAdmin === "CreateProduct" ? "visible" : "invisible"
      }`}
    >
      <div
        className={`w-[40%] bg-Lightblue-200 gap-2 justify-center transition-all duration-250 flex flex-col p-6 rounded-lg shadow-lg ${
          stateAdmin === "CreateProduct"
            ? "scale-100 opacity-100"
            : "scale-125 opacity-0"
        }`}
      >
        <h2 className="flex justify-center font-titilium text-2xl font-semibold">
          Create a New Product
        </h2>
        <div className="flex flex-col items-center">
          {renderLabel("name", "Name")}
          <label
            className={`w-[50%] flex flex-col items-center py-2 m-2 font-titilium text-lg rounded ring-2 transition-all ${
              product.images.length >= 4
                ? "bg-Lightblue-300 ring-Lightblue-400 cursor-not-allowed"
                : "bg-Lightblue-400 ring-Lightblue-500 cursor-pointer hover:ring-Lightblue-700 active:bg-Lightblue-500"
            }`}
          >
            <p>Upload Image</p>
            <input
              type="file"
              className="hidden"
              disabled={product.images.length >= 4}
              onChange={handleFileChange}
            />
          </label>
          {uploading && <p>Uploading...</p>}
          {errors.images && (
            <p className="text-pink-950 font-titilium text-sm">
              {errors.images}
            </p>
          )}
          <div className="flex gap-3">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="relative p-1 bg-Lightblue-400 ring-2 ring-Lightblue-500 rounded hover:scale-105 transition-all"
              >
                <Image
                  width={400}
                  height={400}
                  src={image}
                  alt="Uploaded"
                  className="w-20 h-20 object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-0 self-center bg-Lightblue-400 text-white rounded-full px-1 hover:text-pink-950"
                  onClick={() =>
                    setProduct((prev) => ({
                      ...prev,
                      images: prev.images.filter((_, i) => i !== index),
                    }))
                  }
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          {renderLabel("price", "Price", "number")}
          <ClasificationSelector
            value={product.clasification}
            onChange={(newValue) => {
              setProduct({ ...product, clasification: newValue });
              setErrors({ ...errors, clasification: "" });
            }}
            error={errors.clasification}
          />
          {renderLabel("description", "Description")}
          <button
            type="button"
            className={`bg-Lightblue-500 text-white rounded px-4 py-2 m-1 font-titilium ring-2 ${
              errors.colors ? "ring-pink-950" : "ring-Lightblue-600"
            } transition-all hover:ring-Lightblue-700 hover:scale-105`}
            onClick={() => setStateModal(!stateModal)}
          >
            Colors, Sizes, and Quantity
          </button>
        </div>
        <div className="flex justify-center mt-2">
          <button
            type="button"
            className="bg-Lightblue-500 text-white rounded px-4 py-2 m-1 font-titilium ring-2 ring-Lightblue-600 transition-all hover:ring-Lightblue-700 hover:scale-105"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-500 text-white rounded px-4 py-2 m-1 font-titilium ring-2 ring-gray-600 transition-all hover:ring-gray-700 hover:scale-105"
            onClick={() => setStateAdmin("")}
          >
            Cancel
          </button>
        </div>
      </div>
      <CreateModalColors
        setErrors={setErrors}
        stateModal={stateModal}
        setStateModal={setStateModal}
        setStateProduct={setProduct}
        stateProduct={product}
        errors={errors}
      />
    </div>
  );
};

export default CreateModal;
