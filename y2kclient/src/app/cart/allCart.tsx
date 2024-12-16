"use client";
import { useAppSelector, useAppDispatch } from "../../lib/hooks/hooks";
import { useEffect, useState } from "react";
import getCartFromId from "@/lib/actions/CartActions/getCart";
import { BsFillCartXFill } from "react-icons/bs";
import { BsCartPlusFill } from "react-icons/bs";
import CartCard from "./CartCard/CartCard"
import LoginModal from "../[locale]/Components/LoginModal/LoginModal";

const AllCart = () => {
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
  const showCart = stateCart.filter((item) => item.state === 'inCart');

  console.log(showCart)

  return (
      <div className="relative top-[10rem] w-[90%] flex flex-col ">
        {logged ? (
          <div className=" grid items-center gap-[3rem] ">
            {showCart.length > 0 ? (
              showCart.map((product) => (
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
             <div className="w-[100%] justify-center items-center flex flex-col">
            <p className="relative top-[10rem] text-2xl lg:text-3xl text-Lightblue-950 font-titilium font-semibold">It seems your Cart its Empty!</p>
            <p className="relative top-[10.5rem] text-lg lg:text-xl text-Lightblue-950 font-titilium font-normal">Check your history or save something you want to buy!</p>
            <BsCartPlusFill className="relative top-[11.5rem] text-3xl lg:text-5xl text-Lightblue-950 font-titilium font-semibold"/>
          </div>
            )}
          </div>
        ) : (
          <div className="w-[100%] justify-center items-center flex flex-col">
            <p className="relative top-[10rem] text-2xl lg:text-3xl text-Lightblue-950 font-titilium font-semibold">You need to log in for see the cart</p>
            <BsFillCartXFill className="relative top-[11rem] text-3xl lg:text-5xl text-Lightblue-950 font-titilium font-semibold"/>
          </div>
        )}
             <LoginModal modal={modal} /> 
      </div>

 
  );
};
export default AllCart;
