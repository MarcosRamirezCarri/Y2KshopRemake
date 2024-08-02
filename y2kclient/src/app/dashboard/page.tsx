import ViewOfAll from "./Components/ViewOfAll";
import Navbar from "../[locale]/Components/NavBar/NavBar";

const Dashboard = () =>{
    return(
        <div className="w-full h-full flex flex-row">
       <Navbar/>
        <ViewOfAll/>
        </div>
    )
}
export default Dashboard