import Navbar from "../components/layout/NavBar/NavBar";
import FirstView from "./detailComponents/Firstiew/FirstView";
import SecondView from "./detailComponents/SecondView/SecondView";

const DetailProduct = () => {
  return (
    <div className="flex flex-col w-full items-center">
      <Navbar />
      <div className="flex flex-col w-[90%] top-[7.5rem] relative items-center">
        <FirstView />

        <SecondView />
      </div>
    </div>
  );
};
export default DetailProduct;
