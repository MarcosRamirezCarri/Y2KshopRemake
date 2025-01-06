import Navbar from "../components/layout/NavBar/NavBar";
import Footer from "../components/layout/Footer/Footer";
import FirstView from "./detailComponents/Firstiew/FirstView";
import SecondView from "./detailComponents/SecondView/SecondView";

const DetailProduct = () => {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="flex flex-col w-[90%] justify-around top-[7.5rem] relative items-center">
        <FirstView />

        <SecondView />
      </div>
      <Footer/>
    </div>
  );
};
export default DetailProduct;
