import { getAllProducts } from "@/lib/actions/getAllProducts";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import CardProduct from "@/app/[locale]/Components/ShowCards/Card/Card";
import { useEffect } from "react";

interface PropOfRecomned{
  id: number;
  category: string;
}

interface RecomendArrray {
  id: number;
  category: string;
  price: number;
  image: string;
  title: string
}


const SecondView: React.FC<PropOfRecomned> = ({ category, id }) => {
  const products = useAppSelector((state) => state.shirts.shirts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllProducts());
    };
    fetchData();
  }, [dispatch]);

  let AllProducts: RecomendArrray[] = []
    if (Array.isArray(products) && products.length > 0) {
      AllProducts = products.filter(
        (product) => product.category === category && product.id !== id
      );
    }

  return (
    <div className="grid grid-cols-3 w-[100%] gap-3 ">
      {AllProducts.map((related, index) => (
        <div key={index}>
          <CardProduct
            id={related.id}
            title={related.title}
            price={related.price}
            image={related.image}
          />
        </div>
      ))}
    </div>
  );
};

export default SecondView;
