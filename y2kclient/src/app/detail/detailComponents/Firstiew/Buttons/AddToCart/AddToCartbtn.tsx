"use client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import { useState, useEffect, useCallback } from "react";
import { getCartFromId } from "@/lib/actions/CartActions/getCart";
import { useSearchParams } from "next/navigation";
import { addToCart } from "@/lib/actions/CartActions/addToCart";
import Swal from "sweetalert2";
import LoginModal from "@/app/[locale]/Components/LoginModal/LoginModal";

interface CartProps {
  selectedColor: string | null;
  selectedSize: string | null;
}

const AddToCart: React.FC<CartProps> = ({ selectedColor, selectedSize }) => {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState<number | null>(null);

  const param = useSearchParams();
  const productId = Number(param.get("id") || 0);

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cart);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const numberUserId =
      userId && !isNaN(Number(userId)) ? Number(userId) : null;

    if (!numberUserId) {
      setModal(true);
    } else {
      dispatch(getCartFromId(numberUserId)).then((response: any) => {
        if (response?.success) setUser(numberUserId);
      });
    }
  }, [dispatch]);

  const showAlert = useCallback(
    (icon: "error" | "success" | "info", title: string, text?: string) => {
      Swal.fire({ icon, title, text });
    },
    []
  );

  const handleAddToCart = () => {
    if (user === null) {
      setModal(true);
      return;
    }

    const existingItem = cartItems.find((item) => item.productId === productId);

    if (existingItem) {
      const messages: Record<string, string> = {
        inCart: "This product is already in your cart!",
        inDispatch:
          "You already bought this product, check your history to follow its state!",
      };

      showAlert("error", "Oops...", messages[existingItem.state] || "");
      return;
    }

    if (!selectedSize) {
      showAlert("error", "Oops...", "Select a Size!");
      return;
    }

    Swal.fire({
      title: "Do you want to add this product to your cart?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: "Don't save",
    }).then((result) => {
      if (result.isConfirmed) {
        const cartItem = {
          userId: user,
          productId,
          quantity: 1,
          color: selectedColor,
          size: selectedSize,
        };
        dispatch(addToCart(cartItem));
        showAlert("success", "Saved!");
      } else if (result.isDenied) {
        showAlert("info", "Changes are not saved");
      }
    });
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleAddToCart}
        disabled={user === null}
        title={
          user === null ? "You need to login to add items to the cart" : ""
        }
        className={`underline px-3 py-4 rounded-xl font-tiltneon text-lg lg:text-xl ${
          modal
            ? "text-pink-950/[0.4] bg-pink-400"
            : "text-pink-950 bg-pink-400 decoration-pink-400 hover:decoration-pink-900"
        } transition-colors duration-200 active:bg-pink-500`}
      >
        Add to cart
      </button>
      <LoginModal modal={modal} />
    </div>
  );
};

export default AddToCart;
