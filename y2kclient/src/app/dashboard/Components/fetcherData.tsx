import { getAllCarts } from "@/lib/actions/AdminActions/getAllCarts";
import { getAllFlyers } from "@/lib/actions/FlyerActions/getAllFlyers";
import { getAllProducts } from "@/lib/actions/ProductActions/getAllProducts";
import { getAllUsers } from "@/lib/actions/AdminActions/getAllUsers";
import { cookies } from "next/headers";
import { store } from "@/lib/store";

const DataFetcher = async () => {
  try {

    const token = cookies().get("token")?.value.trim();
    if (!token) throw new Error("No token found");



    await Promise.all([
      store.dispatch(getAllCarts()),
      store.dispatch(getAllFlyers()),
      store.dispatch(getAllProducts()),
      store.dispatch(getAllUsers()),
    ]);

    return{
        success: true
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch and populate Redux state");
  }
};

export default DataFetcher;
