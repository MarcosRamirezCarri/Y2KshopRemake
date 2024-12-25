"use client"
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import { useState, useEffect } from "react";
import {getCartFromId} from "@/lib/actions/CartActions/getCart";
import { useSearchParams } from "next/navigation";
import {addToCart} from "@/lib/actions/CartActions/addToCart";
import Swal from "sweetalert2";
import LoginModal from "@/app/[locale]/Components/LoginModal/LoginModal";

interface CartProps {
  selectedColor: string | null;
  selectedSize: string | null;
}

const AddToCart: React.FC<CartProps> = ({ selectedColor, selectedSize }) => {
  const [modal, setModal] = useState<boolean>(false);

  const param = useSearchParams();
  const searchId = param.get("id");
  const NumberId = Number(searchId);


  const userId = localStorage.getItem("userId");
  const numberUserId = userId && !isNaN(Number(userId)) ? Number(userId) : null;

  if (!numberUserId) {
    return;
  }
  const dispatch = useAppDispatch();
  const stateCart = useAppSelector((state) => state.cart.cart);

  useEffect(() => {
    if (!numberUserId) {
      setModal(true);
    } else {
      dispatch(getCartFromId(numberUserId));
    }
  }, [modal]);

  const handleAddToCart = () => {
    const productExists = stateCart.find((item) => item.productId === NumberId);
    if (!numberUserId) {
      setModal(true);
    } else if (productExists || !selectedSize) {
      let errorMessage = "";
      if (productExists?.state === 'inCart') {
        errorMessage = "This product is already in your cart!";
      }
      if (productExists?.state === 'inDispatch') {
        errorMessage = "You already bought this product, check your history to follow his state!";
      }
      if (!selectedSize) {
        errorMessage = "Select a Size!";
      }
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    } else {
      Swal.fire({
        title: "Do you want to add this product to your cart?",
        showDenyButton: true,
        confirmButtonText: "Save",
        denyButtonText: "Don't save",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
          const cartItem = {
            userId: numberUserId,
            productId: NumberId,
            quantity: 1,
            color: selectedColor,
            size: selectedSize,
          };
          dispatch(addToCart(cartItem));
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleAddToCart}
        disabled={modal}
        title={modal ? "You need login for adding to the cart" : ""}
        className={`underline px-3 py-4 rounded-xl font-tiltneon text-lg lg:text-xl ${
          modal
            ? "text-pink-950/[0.4] bg-pink-400"
            : "text-pink-950 bg-pink-400 decoration-pink-400 hover:decoration-pink-900"
        } transition-colors duration-200 active:bg-pink-500 `}
      >
        Add to cart
      </button>
      <LoginModal modal={modal} />
    </div>
  );
};

export default AddToCart;
