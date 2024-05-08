'use client';
import Image from "next/image";
import mockCarousel from "../../[locale]/Mocks/mock";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Carousel() {
  return (
    <div className="flex flex-col h-[60vw] w-[40vh] lg:h-[40vh] top-40 lg:w-[60vw] relative items-center bg-gray-200">
        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        className='h-80 w-[100%]'
      >
        {mockCarousel.map((mock, index) => <SwiperSlide key={index} className=' flex flex-col p-2 '>
          <Image  src={mock.img} className='h-[100%] w-[100%]' width={980} height={800} alt='PhCarousel' />
        </SwiperSlide>
)}  
      </Swiper>
    </div>
  );
}