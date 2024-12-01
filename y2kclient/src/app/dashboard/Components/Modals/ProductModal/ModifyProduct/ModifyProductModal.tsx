import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { uploadImage } from "@/helpers/cloudinarySet";
import validateProduct from "@/helpers/Validators/validatorProducts";
import { Product } from "@/helpers/Types";
import modProduct from "@/lib/actions/ProductActions/modifyProduct";
import ModalColors from "./ModalColors/ModalColors";
import LabelFormMod from "./Label/LabelModify";
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
    name: "",
    images: "",
    price: "",
    description: "",
    clasification: "",
    colors: "",
    colorErrors: [] as string[],
    sizeErrors: [] as string[],
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = await uploadImage(e.target.files[0]);

      if (imageUrl) {
        setStateProduct({
          ...stateProduct,
          images: [...stateProduct.images, imageUrl],
        });
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

  const handleSave = () => {
    if (stateProduct.id > 0) {
      const errorsBackup: any = validateProduct(stateProduct);

      setErrors(errorsBackup);

      const hasErrors = Object.values(errorsBackup).some((error) => {
        if (Array.isArray(error)) {
          return error.some((subError) => subError !== "");
        }
        return error !== "";
      });

      const hasProduct = Object.values(stateProduct).some((prod) => {
        if (Array.isArray(prod)) {
          return prod.length === 0;
        }
        return prod === "";
      });
      if (!hasErrors && !hasProduct) {
        dispatch(modProduct(stateProduct)).then((result: any) => {
          if (result?.success) {
            Swal.fire("Product Modifyed!", "", "success");
            setStateProduct({
              id: 0,
              name: "",
              images: [],
              price: 0,
              colors: [],
              clasification: "",
              description: "",
            });
          }
        });
      } else {
        Swal.fire("Fix the errors before uploading", "", "error");
      }
    } else {
      Swal.fire("FIrst Select an Product", "", "error");
    }
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
        className={`w-[60%] font-titilium bg-Lightblue-200 gap-2 justify-center transition-all duration-250 grid grid-cols-2 p-6 rounded-lg shadow-lg transition-all duration-300 ${
          stateAdmin === "ModifyProduct"
            ? "scale-100 opacity-100"
            : "scale-125 opacity-0"
        }`}
      >
        <p className="text-2xl flex justify-center font-semibold col-span-2">
          Modify any Product
        </p>
        <div className=" flex flex-col gap-2">
          <p className="text-xl flex justify-center font-medium">
            Select the product{" "}
          </p>
          <div className="flex items-center justify-center flex-row overflow-y-hidden  ">
            {products.length > 0 ? (
              products.map((prod) => (
                <MiniCard
                  key={prod.id}
                  product={prod}
                  setStateProduct={setStateProduct}
                  stateProduct={stateProduct}
                />
              ))
            ) : (
              <p>There are no products</p>
            )}
          </div>
        </div>
        <div
          className={`flex flex-col items-center ${
            stateProduct.id === 0 ? "blur-sm " : ""
          }`}
        >
          {errors.images && (
            <p className="text-pink-950 font-titilium text-sm">
              {errors.images}
            </p>
          )}
          <div className={`flex w-[100%] flex-col`}>
            <p className="text-Lightblue-950 relative justify-start text-lg">
              Images:
            </p>
            <div className="flex justify-center  flex-row gap-3">
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
                    className="w-20 h-20 mb-2"
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
            <label className=" justify-center bg-Lightblue-400 flex flex-col items-center py-2 cursor-pointer m-2 font-titilium text-lg rounded ring-2 ring-Lightblue-500 hover:ring-Lightblue-700 active:bg-Lightblue-500 transition-all delay-50">
              <p>Upload Image</p>
              <input
                type="file"
                className="w-full hidden"
                disabled={stateProduct.id === 0}
                onChange={handleFileChange}
              />
            </label>
          </div>

          <LabelFormMod
            name="price"
            label="Price"
            onChange={handleChange}
            id={stateProduct.id}
            value={stateProduct.price}
            error={errors.price}
          />
          <LabelFormMod
            id={stateProduct.id}
            name="description"
            label="Description"
            onChange={handleChange}
            value={stateProduct.description}
            error={errors.price}
          />
          <button
            disabled={stateProduct.id === 0}
            onClick={() => setStateModal(!stateModal)}
            className="bg-Lightblue-500 rounded px-4 py-2 m-1 font-titilium ring-2 ring-Lightblue-600 transition-all duration-150 hover:ring-Lightblue-700 hover:scale-105 active:bg-Lightblue-700"
          >
            Change Colors
          </button>
        </div>
        <div className="col-span-2 justify-center flex flex-row">
          <button
            onClick={handleSave}
            className="bg-Lightblue-500 rounded px-4 py-2 m-1 font-titilium ring-2 ring-Lightblue-600 transition-all duration-150 hover:ring-Lightblue-700 hover:scale-105 active:bg-Lightblue-700"
          >
            Modify
          </button>

          <button
            className="bg-gray-500 self-center font-semibold w-fit rounded px-4 py-2 m-1 font-titilium ring-2 ring-gray-600 transition-all duration-150 hover:ring-gray-700 hover:scale-105 active:bg-gray-700"
            onClick={() => setStateAdmin("")}
          >
            Cancel
          </button>
        </div>
      </div>
      <ModalColors
        stateModal={stateModal}
        stateProduct={stateProduct}
        setStateModal={setStateModal}
        setErrors={setErrors}
        errors={errors}
        setStateProduct={setStateProduct}
      />
    </div>
  );
};

export default ModifyProductModal;
