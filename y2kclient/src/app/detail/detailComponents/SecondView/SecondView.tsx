"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import fetchProduct from "@/lib/actions/ProductActions/getDetail";
import { useSearchParams } from "next/navigation";
import { getAllProducts } from "@/lib/actions/ProductActions/getAllProducts";
import { Product } from "@/helpers/types/Types";
import CardProductComplete from "@/app/components/Cards/CardProduct/CardProduct";

const SecondView: React.FC = () => {
  const products = useAppSelector((state) => state.products.product);
  const [isMobile, setIsMobile] = useState(false);
  const [classif, setClassif] = useState<string>("none");
  const dispatch = useAppDispatch();
  const param = useSearchParams();
  const searchId = param.get("id");
  const numberId = Number(searchId);

  useEffect(() => {
    const fetchDetail = async () => {
      const DetailProduct: any = await fetchProduct(numberId);
      setClassif(DetailProduct[0].clasification);
    };
    fetchDetail();
  }, []);

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
        <p className="font-titilium self-start text-lg lg:text-2xl text-pink-950 font-normal">
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
            className="col-span-3 w-[95%] rounded-md border-Lightblue-800"
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
