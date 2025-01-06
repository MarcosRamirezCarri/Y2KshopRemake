import Navbar from "../components/layout/NavBar/NavBar";
import AccountFirstPanel from "./FirstPanel/FirstPanel";
import AccountSecondPanel from "./SecondPanel/SecondPanel";
import Footer from "../components/layout/Footer/Footer";

export default function AccountPanel() {
  return (
    <div className="flex flex-col w-full ">
      <Navbar />

      <div className="relative top-[7.5rem] flex flex-col lg:grid lg:grid-cols-2 gap-5 p-5">
        <AccountFirstPanel />
        <AccountSecondPanel />
      </div>
      <Footer/>
    </div>
  );
}
