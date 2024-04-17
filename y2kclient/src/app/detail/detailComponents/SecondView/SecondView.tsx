'use client'
import { getAllProducts } from "@/lib/actions/getAllProducts";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules';
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import CardProduct from "@/app/[locale]/Components/ShowCards/Card/Card";
import { useEffect, useState } from "react";

interface PropOfRecomned {
  id: number;
  category: string;
}

interface RecomendArrray {
  id: number;
  category: string;
  price: number;
  image: string;
  title: string;
}

const SecondView: React.FC<PropOfRecomned> = ({ category, id }) => {
  const products = useAppSelector((state) => state.shirts.shirts);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllProducts());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 ? true : false); 
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  let AllProducts: RecomendArrray[] = [];
  if (Array.isArray(products) && products.length > 0) {
    AllProducts = products.filter(
      (product) => product.category === category && product.id !== id
    );
  }

  return (
    <div className="flex flex-col items-left gap-5 m-5 w-[100%]">
      <p className="font-titilium text-lg lg:text-2xl text-pink-950 font-normal">Related Products</p>
      <div className="grid grid-cols-3 w-[90%] lg:w-[80%] gap-3 ">
        <Swiper   slidesPerView={isMobile ? 1 : 3}
        centeredSlides={true}
        navigation={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        className="col-span-3 w-[95%] border-2  rounded-md border-blue-800">
        {AllProducts.map((related, index) => (
          <SwiperSlide className=" p-5 "   key={index}>
            <CardProduct
              id={related.id}
              title={related.title}
              price={related.price}
              image={related.image}
            />
          </SwiperSlide>
        ))}
        </Swiper>
      
      </div>
    </div>
  );
};

export default SecondView;
