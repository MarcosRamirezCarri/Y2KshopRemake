"use client";
import { useAppSelector, useAppDispatch } from "../../lib/hooks/hooks";
import CartCard from "./CartCard/CartCard";
import Navbar from "../[locale]/Components/NavBar/NavBar";
import Product from "@/helpers/Types";



export default function Cart() {
  const stateCart: Product[] = useAppSelector(
    (state) => state.cart.products
  );

  return (
    <div className="flex flex-col w-full h-full items-center">
      <Navbar />
      <div className="relative top-[10rem] flex flex-col gap-[3rem] w-[90%] ">
        {stateCart.length === 0 ? (
          <p>Its empty!!</p>
        ) : (
          stateCart.map((product) => <div>
            <CartCard
            id={product.id}
            name={product.name}
            images={product.images}
            colors={product.colors}
            clasification={product.clasification}
            price={product.price}
            />

          </div>)
        )}
      </div>
    </div>
  );
}
