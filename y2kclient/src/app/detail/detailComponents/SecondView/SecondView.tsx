'use client'
import { getAllProducts } from "@/lib/actions/getAllProducts";
import { Swiper, SwiperSlide } from 'swiper/react';
import Product from '@/helpers/Types'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules';
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import CardProduct from '../../../homeComponents/ShowCards/Card/Card'
import { useEffect, useState } from "react";

interface PropOfRecomned {
  id: number;
  clasification: string;
}

const SecondView: React.FC<PropOfRecomned> = ({ clasification, id,  }) => {
  const products = useAppSelector((state) => state.products.product);
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

  let AllProducts: Product[] = [];
  if (Array.isArray(products) && products.length > 0) {
    AllProducts = products.filter(
      (product) => product.clasification === clasification && product.id !== id
    );
  }

  return (
    <div className="flex flex-col items-left gap-5 m-5 w-[100%]">
      <p className="font-titilium text-lg lg:text-2xl text-pink-950 font-normal">Related Products</p>
      <div className="grid grid-cols-3 w-[90%] lg:w-[80%] gap-3 ">
        <Swiper   slidesPerView={isMobile ? 1 : 3}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        className="col-span-3 w-[95%] border-2  rounded-md border-Lightblue-800">
        {AllProducts.map((related, index) => (
          <SwiperSlide className=" p-5 "   key={index}>
            <CardProduct
            
              id={related.id}
              name={related.name}
              images={related.images}
            />
          </SwiperSlide>
        ))}
        </Swiper>
      
      </div>
    </div>
  );
};

export default SecondView;
