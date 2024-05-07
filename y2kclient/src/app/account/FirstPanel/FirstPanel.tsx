export default function AccountFirstPanel() {
  return (
    <div className="bg-pink-300 flex flex-col items-center p-[2rem] gap-5 ">
      <p>My account</p>
      <div className="grid w-[100%]  grid-cols-3  gap-5">
        <div className="row-span-2 flex flex-col col-span-1 gap-10 p-2 font-titilium text-pink-950 font-semibold text-2xl">
          <p>Fotto</p>
          <p>Name:</p>
          <p>Email:</p>
          <p>Celular</p>
        </div>
        <div className="row-span-3 col-span-2">a</div>
        <button className="relative self-center col-start-2 col-end-2 bg-pink-400 px-6 py-4 rounded-[1.25rem] font-tiltneon text-xl text-pink-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-pink-200">
          Modify
        </button>
      </div>
    </div>
  );
}
