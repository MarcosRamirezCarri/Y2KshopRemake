"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { useParams } from "next/navigation";
import { getAllProducts } from "@/lib/actions/ProductActions/getAllProducts";
import { Product } from "@/helpers/types/Types";
import CardProductComplete from "@/app/components/Cards/CardProduct/CardProduct";

interface SecondViewProps {
  classif: string;
}

const SecondView: React.FC<SecondViewProps> = ({ classif }) => {
  const products = useAppSelector((state) => state.products.product);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useAppDispatch();
  const { page } = useParams();
  const numberId = Number(page);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch, products]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 ? true : false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const place = "Related";

  let AllProducts: Product[] = [];
  if (Array.isArray(products) && products.length > 0) {
    AllProducts = products.filter(
      (product) => product.clasification === classif && product.id !== numberId
    );
  }
  if (AllProducts.length > 0) {
    return (
      <div className="flex flex-col items-center gap-5 m-10 w-[100%]">
        <p className="font-titilium self-center text-lg lg:text-2xl text-pink-950 font-normal">
          Related Products
        </p>
        <div className="grid grid-cols-3 w-[90%] lg:w-[80%] gap-3 ">
          <Swiper
            slidesPerView={isMobile ? 1 : 3}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Navigation]}
            className="col-span-3 border-2 w-[95%] rounded-md border-Lightblue-300"
          >
            {AllProducts.map((related, index) => (
              <SwiperSlide className=" p-5 " key={index}>
                <CardProductComplete product={related} place={place} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  }
};

export default SecondView;
