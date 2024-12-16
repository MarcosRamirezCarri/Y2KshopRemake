import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ModifyProductModal from "../../Modals/ProductModal/ModifyProduct/ModifyProductModal";
import CreateModal from "../../Modals/ProductModal/CreateProduct/CreateProduct";
import CardProductControl from "./CardProduct/CardProductControl";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { Product } from "@/helpers/types/Types";
import deleteProduct from "@/lib/actions/AdminActions/deleteProduct";
import { getAllProducts } from "@/lib/actions/ProductActions/getAllProducts";

const ProductsControl = () => {
  const [stateAdmin, setStateAdmin] = useState<string>("");
  const [stateProduct, setStateProduct] = useState<Product>({
    id: 0,
    name: "",
    images: [],
    price: 0,
    colors: [],
    clasification: "",
    description: "",
  });
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.products.product);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllProducts());
    };
    fetchData();
  }, [dispatch]);

  const handleModify = (product: Product) => {
    setStateProduct(product);
    setStateAdmin("ModifyProduct");
  };

  const handleDelete = (id: number, name: string) => {
    if (id > 0) {
      Swal.fire({
        title: `Do you want to delete the product ${name} ?`,
        showDenyButton: true,
        confirmButtonText: "Delete",
        denyButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteProduct(id)).then((response: any) => {
            if (response.success) {
              Swal.fire("Deleted!", "", "success");
            } else {
              Swal.fire("Something went wrong!", "", "error");
            }
          });
        }
      });
    } else {
      Swal.fire("Please First select an product", "", "error");
    }
  };

  return (
    <div
      className={`relative font-titilium left-[23%] grid grid-cols-2 gap-5 top-[9.5rem] w-[75%]`}
    >
      <div className="flex flex-row justify-center  col-span-2">
        <button onClick={() => setStateAdmin("CreateProduct")} className="relative bg-orange-300 px-4 py-2 w-[40%] rounded-xl text-2xl text-orange-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-orange-200">
          Create New Product
        </button>
      </div>
      {products.length > 0
        ? products.map((a, index) => (
            <CardProductControl
              key={index}
              product={a}
              handleModify={handleModify}
              handleDelete={handleDelete}
            />
          ))
        : null}
      <CreateModal setStateAdmin={setStateAdmin} stateAdmin={stateAdmin} />
      <ModifyProductModal
        setStateProduct={setStateProduct}
        stateProduct={stateProduct}
        setStateAdmin={setStateAdmin}
        stateAdmin={stateAdmin}
      />
    </div>
  );
};

export default ProductsControl;
