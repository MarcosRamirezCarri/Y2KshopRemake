"use client";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import CartCard from "./CartCard/CartCard";
import Navbar from "../[locale]/Components/NavBar/NavBar";

interface CartProducts {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function Cart() {
  const stateCart: CartProducts[] = useAppSelector(
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
            title={product.title}
            image={product.image}
            category={product.category}
            price={product.price}
            />

          </div>)
        )}
      </div>
    </div>
  );
}
