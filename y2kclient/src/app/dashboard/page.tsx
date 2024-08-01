import SideBarDashboard from "./Modals/modalsLauncher";
import Navbar from "../[locale]/Components/NavBar/NavBar";

const Dashboard = () =>{
    return(
        <div className="w-full h-full flex flex-row">
<Navbar/>
            <SideBarDashboard/>
        </div>
    )
}
export default Dashboard