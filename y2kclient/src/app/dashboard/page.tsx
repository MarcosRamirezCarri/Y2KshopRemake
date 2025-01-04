import ViewOfAll from "./Components/ViewOfAll";
import Navbar from "../components/layout/NavBar/NavBar";

const Dashboard = () =>{
    return(
        <div className="w-full h-full flex flex-row">
       <Navbar/>
        <ViewOfAll/>
        </div>
    )
}
export default Dashboard