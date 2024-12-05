interface SideBarProps {
  setStateAdmin: (arg: string) => void;
  setStateButtons: (arg: string) => void;
  stateButtons: string;
}

const SideBarDashboard: React.FC<SideBarProps> = ({ setStateAdmin, setStateButtons, stateButtons }) => {
  return (
    <div className="w-[20%] h-[100vh] bg-gray-950 items-center flex flex-col py-5 gap-5 font-titilium fixed top-[8rem]">
      <p className="text-2xl text-orange-300 font-semibold">Dashboard</p>
      <button onClick={() => setStateButtons("Users")}  className={`bg-orange-400/[0.9] w-[80%] px-4 py-2 rounded text-xl transition-all duration-200 active:bg-orange-600  ${
            stateButtons === 'Users' ? " ring-2 ring-orange-600 bg-orange-500" : " hover:ring-2 ring-orange-500"
        } `} >Users</button>
      <button
        onClick={() => setStateButtons("Products")}
        className={`bg-orange-400/[0.9] px-4 py-2  w-[80%] rounded text-xl transition-all duration-200 active:bg-orange-600  ${
            stateButtons === 'Products' ? " ring-2 ring-orange-600 bg-orange-500" : " hover:ring-2 ring-orange-500"
        } `}
      >
        Products
      </button>

      <div
        className={`flex flex-col gap-2    ${
          stateButtons === "Products"
            ? "visible transition-all relative translate-x-[0vw] duration-500 opacity-100"
            : "collapse duration-0 transition-all scale-0 opacity-0 absolute"
        }`}
      >
        <button
          onClick={() => setStateAdmin("CreateProduct")}
          className="bg-orange-400/[0.9] px-2 py-1 rounded "
        >
          Create Product
        </button>
        <button
          onClick={() => setStateAdmin("ModifyProduct")}
          className="bg-orange-400/[0.9] px-2 py-1 rounded "
        >
          Modify Product
        </button>
        <button
          onClick={() => setStateAdmin("DeleteProduct")}
          className="bg-orange-400/[0.9] px-2 py-1 rounded "
        >
          Delete Product
        </button>
      </div>

      <button   onClick={() => setStateButtons("Tasks")}   className={`bg-orange-400/[0.9]  w-[80%] px-4 py-2 rounded text-xl transition-all duration-200 active:bg-orange-600  ${
            stateButtons === 'Tasks' ? " ring-2 ring-orange-600 bg-orange-500" : " hover:ring-2 ring-orange-500"
        } `} >Tasks</button>
    
    <button   onClick={() => setStateButtons("Flyers")}   className={`bg-orange-400/[0.9]  w-[80%] w-[80%] px-4 py-2 rounded text-xl transition-all duration-200 active:bg-orange-600  ${
            stateButtons === 'Flyers' ? " ring-2 ring-orange-600 bg-orange-500" : " hover:ring-2 ring-orange-500"
        } `} >Flyers</button>
    </div>
  );
};
export default SideBarDashboard;
