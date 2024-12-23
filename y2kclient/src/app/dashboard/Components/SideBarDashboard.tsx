interface SideBarProps {
  setStateButtons: (arg: string) => void;
  stateButtons: string;
}

const SideBarDashboard: React.FC<SideBarProps> = ({
  setStateButtons,
  stateButtons,
}) => {
  return (
    <div className="w-[20%] h-[100vh] bg-[#00080a] items-center flex flex-col py-5 gap-5 font-titilium fixed top-[4.5rem]">
      <p className="text-2xl text-orange-300 font-semibold">Dashboard</p>
      <button
        onClick={() => setStateButtons("Users")}
        className={`bg-orange-400/[0.9] w-[80%] px-4 py-2 rounded text-xl transition-all duration-200 active:bg-orange-600  ${
          stateButtons === "Users"
            ? " ring-2 ring-orange-600 bg-orange-500"
            : " hover:ring-2 ring-orange-500"
        } `}
      >
        Users
      </button>
      <button
        onClick={() => setStateButtons("Products")}
        className={`bg-orange-400/[0.9] px-4 py-2  w-[80%] rounded text-xl transition-all duration-200 active:bg-orange-600  ${
          stateButtons === "Products"
            ? " ring-2 ring-orange-600 bg-orange-500"
            : " hover:ring-2 ring-orange-500"
        } `}
      >
        Products
      </button>

      <button
        onClick={() => setStateButtons("Tasks")}
        className={`bg-orange-400/[0.9]  w-[80%] px-4 py-2 rounded text-xl transition-all duration-200 active:bg-orange-600  ${
          stateButtons === "Tasks"
            ? " ring-2 ring-orange-600 bg-orange-500"
            : " hover:ring-2 ring-orange-500"
        } `}
      >
        Tasks
      </button>

      <button
        onClick={() => setStateButtons("Flyers")}
        className={`bg-orange-400/[0.9]  w-[80%] w-[80%] px-4 py-2 rounded text-xl transition-all duration-200 active:bg-orange-600  ${
          stateButtons === "Flyers"
            ? " ring-2 ring-orange-600 bg-orange-500"
            : " hover:ring-2 ring-orange-500"
        } `}
      >
        Flyers
      </button>
    </div>
  );
};
export default SideBarDashboard;
