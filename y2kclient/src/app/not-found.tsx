import Link from "next/link";

export default function NotFound() {
  return (
    <div className="font-titilium select-none w-[100vw] text-gray-950 bg-gradient-to-r from-pink-200 to-Lightblue-400  h-[100vh] gap-2 flex flex-col items-center justify-center ">
      <div className="flex flex-row gap-5 divide-x-2 divide-gray-950">
      <h2 className="text-4xl font-bold">Error 404!</h2>
      <h2 className="text-3xl">Page Not Found</h2>
      </div>
     
      <p className="text-3xl">Could not find requested resource</p>
      <Link  className="text-2xl bg-Lightblue-400 px-4 py-2 rounded-[1rem]  font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-Lightblue-500" href={{ pathname: "/" }}>Return Home</Link>
    </div>
  );
}