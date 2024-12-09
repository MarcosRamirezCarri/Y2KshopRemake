import { useState, useEffect } from "react";
import ModifyProductModal from "../../Modals/ProductModal/ModifyProduct/ModifyProductModal";
import CreateModal from "../../Modals/ProductModal/CreateProduct/CreateProduct";
import DeleteModal from "../../Modals/ProductModal/DeleteProduct/DeleteModal";
import CardProductControl from "./CardProduct/CardProductControl";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { getAllProducts } from "@/lib/actions/ProductActions/getAllProducts";

const ProductsControl = () => {
  const [stateAdmin, setStateAdmin] = useState<string>("");
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.products.product);

  useEffect(() =>{
    const fetchData = async () => {
        await dispatch(getAllProducts());
      };
      fetchData();
  },[dispatch])


  return (
    <div className="relative font-titilium left-[23%] flex flex-col gap-5 top-[9.5rem] w-[75%]">
      {
        products.length > 0 ? products.map((a ,index) => <CardProductControl  id={a.id}
        name={a.name}
        description={a.description}
        images={a.images}
        clasification={a.clasification}
        price={a.price}
        colors={a.colors}/>)
      : null}
      <CreateModal setStateAdmin={setStateAdmin} stateAdmin={stateAdmin} />
      <ModifyProductModal
        setStateAdmin={setStateAdmin}
        stateAdmin={stateAdmin}
      />
      <DeleteModal setStateAdmin={setStateAdmin} stateAdmin={stateAdmin} />
    </div>
  );
};

export default ProductsControl;
