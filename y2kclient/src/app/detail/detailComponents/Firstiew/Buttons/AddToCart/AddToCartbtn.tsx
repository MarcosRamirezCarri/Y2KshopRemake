import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import addToCart from "@/lib/actions/CartActions/addToCart";
import Swal from "sweetalert2";
import LoginModal from "@/app/[locale]/Components/LoginModal/LoginModal";

interface CartProps {
  selectedColor: string | null;
  selectedSize: string | null;
}

const AddToCart: React.FC<CartProps> = ({ selectedColor, selectedSize }) => {
  const param = useSearchParams();
  const searchId = param.get("id");
  const NumberId = Number(searchId);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const dispatch = useAppDispatch();

  const stateCart = useAppSelector((state) => state.cart.products);
  const [modal, setModal] = useState<boolean>(false);

  const handleAddToCart = () => {
    const productExists = stateCart.some((item) => item.productId === NumberId);
    if (token === "undefined" || token === "null" || token === null) {
      setModal(true);
    } else if (productExists === true || !selectedSize) {
      if (productExists === true) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This product is already in your cart!",
        });
      }
      if (!selectedSize) {
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
          const cartItem = {
            userId: userId,
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
    <div className="flex flex-col itemc-center">
      {modal ? (
        <button
          disabled
          title="You need login for adding to the cart"
          className="underline  px-3 py-4 rounded-xl font-tiltneon text-lg lg:text-xl text-pink-950/[0.4] bg-pink-400  transition-colors duration-200"
        >
          {" "}
          Add to cart
        </button>
      ) : (
        <button
          onClick={handleAddToCart}
          className="underline  px-3 py-4 rounded-xl font-tiltneon text-lg lg:text-xl text-pink-950 bg-pink-400 decoration-pink-400 hover:decoration-pink-900 transition-colors duration-200"
        >
          {" "}
          Add to cart
        </button>
      )}
      <LoginModal modal={modal} />
    </div>
  );
};

export default AddToCart;
