import AllCart from "./allCart";
import Navbar from "../components/layout/NavBar/NavBar";

const Cart = () => {
  
  return (
    <div className="flex flex-col w-full h-full items-center">
      <Navbar />
      <AllCart />
    </div>
  );
};
export default Cart;
