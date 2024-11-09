"use client";
import { useAppSelector, useAppDispatch } from "../../lib/hooks/hooks";
import { useEffect, useState } from "react";
import getCartFromId from "@/lib/actions/CartActions/getCart";
import { BsFillCartXFill } from "react-icons/bs";
import Navbar from "../[locale]/Components/NavBar/NavBar";
import CartCard from "./CartCard/CartCard"
import LoginModal from "../[locale]/Components/LoginModal/LoginModal";

const Cart = () => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState<boolean>(false);
  const [logged, setLogged] = useState<boolean>(false);
  const [userId, setUserId] = useState(0)

  useEffect(() => {
    const id = localStorage.getItem("userId");

    const token = localStorage.getItem("token");
    const userId = Number(id);
    if (token === "undefined" || token === "null" || token === null) {
      setModal(true);
    } else {
      setUserId(userId)
      setLogged(!logged);
      dispatch(getCartFromId(userId));
    }
  }, [modal]);
  const stateCart = useAppSelector((state) => state.cart.cart);

  

  return (
    <div className="flex flex-col w-full h-full items-center">
      <Navbar />
      <div className="relative top-[10rem] w-[90%] flex flex-col ">
        {logged ? (
          <div className=" grid items-center gap-[3rem] ">
            {stateCart.length > 0 ? (
              stateCart.map((product) => (
                <div key={product.id}>
                  <CartCard
                   id={product.id}
                    userId={userId}
                    productId={product.productId}
                    color={product.color}
                    quantity={product.quantity}
                    size={product.size}
                    Product={product.Product}
                  />
                </div>
              ))
            ) : (
              <div>
                <p>Its empty!!</p>
              </div>
            )}
          </div>
        ) : (
          <div className="w-[100%] justify-center items-center flex flex-col">
            <p className="relative top-[10rem] text-2xl lg:text-3xl text-Lightblue-950 font-titilium font-semibold">You need to log in for see the cart</p>
            <BsFillCartXFill className="relative top-[11rem] text-3xl lg:text-5xl text-Lightblue-950 font-titilium font-semibold"/>
          </div>
        )}
      </div>

      <LoginModal modal={modal} /> 
    </div>
  );
};
export default Cart;
