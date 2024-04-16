import { getAllProducts } from "@/lib/actions/getAllProducts";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import CardProduct from "@/app/[locale]/Components/ShowCards/Card/Card";
import { useEffect } from "react";



const SecondView = ({ category, id }) => {
  const products = useAppSelector((state) => state.shirts.shirts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllProducts());
    };
    fetchData();
  }, [dispatch]);

  const AllProducts = [];
  if (Array.isArray(products) && products.length > 0)
    AllProducts.push(
      products.filter(
        (product) => product.category === category && product.id !== id
      )
    );
  console.log(AllProducts);

  return (
    <div className="grid grid-cols-3 w-[100%] gap-3 ">
      {AllProducts.map((a, index) => (
        <CardProduct
          id={a.id}
          title={a.title}
          price={a.price}
          image={a.image}
        />
      ))}
    </div>
  );
};

export default SecondView;
