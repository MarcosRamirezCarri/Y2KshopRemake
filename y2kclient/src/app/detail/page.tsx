"use client";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../lib/hooks/hooks";
import addDescription from "@/helpers/functions";
import { Server } from "@/helpers/server";
import Product from "@/helpers/Types";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import FirstView from "./detailComponents/Firstiew/FirstView";
import SecondView from "./detailComponents/SecondView/SecondView";
import Navbar from "../[locale]/Components/NavBar/NavBar";
import addToCart from "@/lib/actions/CartActions/addToCart";

const DetailProduct = () => {
  const [stateDetail, setStateDetail] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>("");
  const stateCart: Product[] = useAppSelector((state) => state.cart.products);
  console.log(stateDetail);
  const param = useSearchParams();
  const dispatch = useAppDispatch();
  const searchId = param.get("id");

  useEffect(() => {
    const fetchProduct = async (productId: any) => {
      try {
        const { data } = await axios.get<Product>(
          `${Server}/product/${productId}`
        );

        const formatedProduct = [];
        formatedProduct.push(data);
        const descProduct = addDescription(formatedProduct);

        setStateDetail(descProduct);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProduct(searchId);
  }, [searchId]);

const handleChangeColor = (color: string) => {
  setSelectedColor(color);
  setSelectedSize(null); 
};
const handleChangeSize = (size: string) => {
  setSelectedSize(size);
};

  const handleAddToCart = () => {
    const productExists = stateCart.some(
      (item) => item.id === stateDetail[0]?.id
    );
    console.log(productExists);

    if (productExists === true || selectedSize === "") {
      if (productExists === true) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This product is already in your cart!",
        });
      }
      if (selectedSize === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Select a Size!",
        });
      }
    } else {
      Swal.fire({
        title: "Do you want to add this product to your cart?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
          const updatedProduct = stateDetail.map((product) => ({
            ...product,
            sizes: [selectedSize],
          }));
          dispatch(addToCart(updatedProduct[0]));
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };

  return (
    <div className="flex flex-col w-full h-full items-center">
      <Navbar />
      <div className="grid grid-rows-2 w-[90%] top-[10rem] relative justify-around items-center">
        {stateDetail.length === 0
          ? null
          : stateDetail.map((i, index) => (
              <div key={index}>
                <FirstView
                  images={i.images}
                  name={i.name}
                  price={i.price}
                  description={i.description}
                  clasification={i.clasification}
                  handleAddToCart={handleAddToCart}
                  colors={i.colors}
                  selectedSize={selectedSize}
                  handleChangeSize={handleChangeSize}
                  handleChangeColor={handleChangeColor}
                  selectedColor={selectedColor}
                />
                {/*<SecondView clasification={i.clasification} id={i.id} />*/}
              </div>
            ))}
      </div>
    </div>
  );
};
export default DetailProduct;
