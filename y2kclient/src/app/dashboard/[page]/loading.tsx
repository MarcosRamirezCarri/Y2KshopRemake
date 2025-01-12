export default function Loader (){
    return (
        <div className="font-titilium w-[70%] relative top-[15rem] left-[25%] items-center gap-2 flex flex-col">
                <div className="w-full animate-pulse">
      <div className="w-full h-6 bg-gray-300 mb-4"></div>
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-4 gap-4 mb-2 items-center"
        >
          <div className="h-4 bg-gray-300 rounded-md"></div>
          <div className="h-4 bg-gray-300 rounded-md"></div>
          <div className="h-4 bg-gray-300 rounded-md"></div>
          <div className="h-4 bg-gray-300 rounded-md"></div>
        </div>
      ))}
    </div>
        </div>
    )
}