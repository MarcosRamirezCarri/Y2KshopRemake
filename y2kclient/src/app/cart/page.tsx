"use client";
import { useAppSelector } from "../../lib/hooks/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartCard from "./CartCard/CartCard";
import Navbar from "../[locale]/Components/NavBar/NavBar";
import LoginModal from "../[locale]/Components/LoginModal/LoginModal";
import Product from "@/helpers/Types";

const Cart = () => {
  const stateCart: Product[] = useAppSelector((state) => state.cart.products);
  const [modal, setModal] = useState<boolean>(false);

useEffect(() =>{
  const token = localStorage.getItem('token');
  console.log(token)
  if (token === "undefined" || token === null) {
    setModal(true);
  }
},[])
   

  return (
    <div className="flex flex-col w-full h-full items-center">
      <Navbar />
      <div className="relative top-[10rem] flex flex-col gap-[3rem] w-[90%] ">
        {stateCart.length === 0 ? (
          <p>Its empty!!</p>
        ) : (
          stateCart.map((product) => (
            <div>
              <CartCard
                id={product.id}
                name={product.name}
                images={product.images}
                colors={product.colors}
                clasification={product.clasification}
                price={product.price}
              />
            </div>
          ))
        )}
      </div>
      
        <LoginModal modal={modal}/>
      
    </div>
  );
};
export default Cart;
