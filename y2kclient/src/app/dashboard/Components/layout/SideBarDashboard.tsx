"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SideBarDashboard: React.FC = () => {
  const path = usePathname();
  return (
    <div className="w-[20%] h-[100vh] bg-[#00080a] items-center flex flex-col py-5 gap-5 font-titilium fixed top-[4.5rem]">
      <p className="text-2xl text-orange-300 font-semibold">Dashboard</p>
      <Link
        href={"/dashboard/users"}
        className={`bg-orange-400/[0.9] w-[80%] px-4 py-2 rounded text-xl transition-all duration-200 active:bg-orange-600  ${
          path === "/dashboard/users"
            ? " ring-2 ring-orange-600 bg-orange-500"
            : " hover:ring-2 ring-orange-500"
        } `}
      >
        Users
      </Link>
      <Link
        href={"/dashboard/products"}
        className={`bg-orange-400/[0.9] px-4 py-2  w-[80%] rounded text-xl transition-all duration-200 active:bg-orange-600  ${
          path === "/dashboard/products"
            ? " ring-2 ring-orange-600 bg-orange-500"
            : " hover:ring-2 ring-orange-500"
        } `}
      >
        Products
      </Link>

      <Link
              href={"/dashboard/tasks"}
        className={`bg-orange-400/[0.9]  w-[80%] px-4 py-2 rounded text-xl transition-all duration-200 active:bg-orange-600  ${
          path === "/dashboard/tasks"
            ? " ring-2 ring-orange-600 bg-orange-500"
            : " hover:ring-2 ring-orange-500"
        } `}
      >
        Tasks
      </Link>

      <Link
        href={"/dashboard/flyers"}
        className={`bg-orange-400/[0.9]  w-[80%] w-[80%] px-4 py-2 rounded text-xl transition-all duration-200 active:bg-orange-600  ${
          path === "/dashboard/flyers"
            ? " ring-2 ring-orange-600 bg-orange-500"
            : " hover:ring-2 ring-orange-500"
        } `}
      >
        Flyers
      </Link>
    </div>
  );
};
export default SideBarDashboard;
