import AllCart from "./allCart";
import Footer from "../components/layout/Footer/Footer";
import Navbar from "../components/layout/NavBar/NavBar";

const Cart = () => {
  
  return (
    <div className="flex flex-col w-full">
      
      <Navbar />
      <div className="relative items-center w-[100%] flex flex-col">
      <AllCart />
      </div>
      <Footer/>
    </div>
  );
};
export default Cart;
