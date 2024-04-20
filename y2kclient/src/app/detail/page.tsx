"use client";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../lib/hooks/hooks";
import { Server } from "@/helpers/server";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import FirstView from "./detailComponents/Firstiew/FirstView";
import SecondView from "./detailComponents/SecondView/SecondView";
import Navbar from "../[locale]/Components/NavBar/NavBar";
import addToCart from "@/lib/actions/CartActions/addToCart";

interface DetailProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const DetailProduct = () => {
  const [stateDetail, setStateDetail] = useState<DetailProductProps[]>([]);
  const stateCart: DetailProductProps[] = useAppSelector(
    (state) => state.cart.products
  );
  const param = useSearchParams();
  const dispatch = useAppDispatch();
  const searchId = param.get("id");

  useEffect(() => {
    const fetchProduct = async (productId: any) => {
      try {
        const { data } = await axios.get<DetailProductProps[]>(
          `${Server}/products/${productId}`
        );
        let arrayData: DetailProductProps[] = [];
        arrayData.push(data);
        const shirtsWithShortenedTitles = arrayData.map((shirt) => ({
          ...shirt,
          title:
            shirt.title.length > 20
              ? `${shirt.title.substring(0, 20)}...`
              : shirt.title,
        }));
        setStateDetail(shirtsWithShortenedTitles);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProduct(searchId);
  }, [searchId]);



  const handleAddToCart = () => {
    const productExists = stateCart.some(
      (item) => item.id === stateDetail[0]?.id
    );

    if (productExists) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This product is already in your cart!",
      });
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
          dispatch(addToCart(stateDetail[0]));
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
                  
                  image={i.image}
                  title={i.title}
                  price={i.price}
                  description={i.description}
                  category={i.category}
                  handleAddToCart={handleAddToCart}
                />
                <SecondView category={i.category} id={i.id} />
              </div>
            ))}
      </div>
    </div>
  );
};
export default DetailProduct;
