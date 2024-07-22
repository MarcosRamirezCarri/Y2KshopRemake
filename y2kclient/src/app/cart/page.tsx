"use client";
import { useAppSelector, useAppDispatch } from "../../lib/hooks/hooks";
import getCartFromId from "@/lib/actions/CartActions/getCart";
import { useEffect, useState } from "react";
import CartCard from "./CartCard/CartCard";
import Navbar from "../[locale]/Components/NavBar/NavBar";
import LoginModal from "../[locale]/Components/LoginModal/LoginModal";
import Product from "@/helpers/Types";

const Cart = () => {

  const dispatch = useAppDispatch()
 
  const [modal, setModal] = useState<boolean>(false);
  
useEffect(() =>{
  const id = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const userId = Number(id)
  console.log(token)
  if (token === "undefined"|| token === "null" || token === null) {
    setModal(true);
  }else {
    dispatch(getCartFromId(userId))
  }
  
},[modal])
const stateCart = useAppSelector((state) => state.cart.products);

   

  return (
    <div className="flex flex-col w-full h-full items-center">
      <Navbar />
      <div className="relative top-[10rem] flex flex-col gap-[3rem] w-[90%] ">
        {stateCart.length > 0  ? (
            stateCart.map((product) => (
              <div key={product.id}>
                <CartCard
                  productId={product.productId}
                  color={product.color}
                  quantity={product.quantity}
                  size={product.size}
                  Product={product.Product}
                />
              </div>
            ))
         
        ) : (
          <p>Its empty!!</p>
        )}
      </div>
      
        <LoginModal modal={modal}/>
      
    </div>
  );
};
export default Cart;
