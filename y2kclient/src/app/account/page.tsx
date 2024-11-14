import Navbar from "../[locale]/Components/NavBar/NavBar";
import AccountFirstPanel from "./FirstPanel/FirstPanel";
import AccountSecondPanel from "./SecondPanel/SecondPanel";

export default function AccountPanel() {
    return (
      <div className="flex flex-col w-full h-full items-center ">
        <Navbar/>

  <div className="relative top-[10rem] flex flex-col lg:grid lg:grid-cols-2 gap-5 p-5">
  
  <AccountFirstPanel/>
  <AccountSecondPanel/>
  </div>
      </div>
    );
  }