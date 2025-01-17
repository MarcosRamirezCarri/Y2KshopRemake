import Image from "next/image";
import Swal from "sweetalert2";
import { CartItem } from "@/helpers/types/CartItem";
import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { deleteCartItem } from "@/lib/actions/CartActions/deleteCart";
import { getAllProducts } from "@/lib/actions/ProductActions/getAllProducts";
import { changeCartState } from "@/lib/actions/CartActions/changeCartState";
import { getCartFromId } from "@/lib/actions/CartActions/getCart";
import ModalModify from "./ModalModify/ModalModify";


const CartCard: React.FC<CartItem> = ({
  id,
  color,
  size,
  Product,
  userId,
  lastUpdate
}) => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState<boolean>(false);

  const state = "pending";

  const handleBuy = () => {
    Swal.fire({
      background: "#d3f5f5",
      title: `Confirm your purchase of ${Product.name}`,
      text: `Size: ${size}, Color: ${color}`,
      showDenyButton: true,
      confirmButtonText: "Buy",
      denyButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(changeCartState(userId, id, state)).then((response: any) => {
          if (response?.success) {
            dispatch(getAllProducts())
            dispatch(getCartFromId(userId));
            Swal.fire(
              `Buyed for ${Product.price}`,
              "Redirects to Pay Method",
              "success"
            );
          } else {
            Swal.fire("An error Occurried in the purchase", response.message , "info");
          }
        });
      } else {
        Swal.fire("Purchase Canceled", "", "info");
      }
    });
  };

  const handleModify = () => {
    Swal.fire({
      title: "Do you want Modify this product from your cart?",
      showDenyButton: true,
      confirmButtonText: "Modify",
      denyButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setModal(!modal);
      } 
    });
  };
  const handleDelete = () => {
    Swal.fire({
      title: "Do you want delete this product from your cart?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "", "success");
        dispatch(deleteCartItem(userId, id));
      }
    });
  };
  const buttonStyles =
    "relative bg-pink-300 px-4 py-2 rounded-[1.25rem] text-lg lg:text-xl text-pink-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-pink-200";
  const buttonStylesPhone =
    "relative self-end bg-pink-300 px-2  py-1 rounded-[1.25rem]  text-md text-pink-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-pink-200";

  return (
    <div>
      <div className="grid grid-cols-6 p-5 font-tiltneon w-[100%] rounded-md gap-[0.5rem] bg-Lightblue-100 border-2 border-Lightblue-800">
        <div className="flex flex-col col-span-2">
        <p className="text-[0.62rem] text-Lightblue-950 absolute lg:text-base self-start font-medium">
            {lastUpdate}
          </p>
          <Image
            width={680}
            height={680}
            src={Product?.images[0]}
            className="rounded w-[10.25rem] ring-2 ring-Lightblue-200 h-[10.25rem] bg-transparent"
            alt="no image"
          />
        </div>
        <div className="col-span-4 lg:col-span-2 flex flex-col gap-3">
          <p className=" text-md lg:text-xl text-Lightblue-950 font-semibold">
            {Product?.name}
          </p>
          <p className=" text-md lg:text-xl text-Lightblue-950 font-semibold">
            {Product?.clasification}
          </p>
          <p className=" text-md lg:text-xl text-Lightblue-950 font-semibold">
            {color}, {size}
          </p>
          <p className=" text-md lg:text-xl text-Lightblue-950 font-semibold">
            ${Product?.price}
          </p>
          <div className="flex flex-row gap-2 lg:hidden">
          <p className="text-[0.62rem] lg:text-base self-end font-medium">
            {lastUpdate}
          </p>
            <button onClick={handleBuy} className={buttonStylesPhone}>
              Buy
            </button>
            <button onClick={handleDelete} className={buttonStylesPhone}>
              Discard
            </button>
            <button onClick={handleModify} className={buttonStylesPhone}>
              Modify
            </button>
          </div>
        </div>

        <div className="lg:col-span-2  gap-3 hidden lg:flex lg:flex-col">
       
          <button onClick={handleBuy} className={buttonStyles}>
            Buy
          </button>
          <button onClick={handleDelete} className={buttonStyles}>
            Discard
          </button>
          <button onClick={handleModify} className={buttonStyles}>
            Modify
          </button>
        </div>
      </div>
      <ModalModify
        modal={modal}
        setModal={setModal}
        Product={Product}
        size={size}
        color={color}
        id={id}
        userId={userId}
      />
    </div>
  );
};

export default CartCard;
