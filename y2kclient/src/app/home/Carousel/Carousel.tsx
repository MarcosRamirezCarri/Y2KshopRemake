"use client";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Carousel() {
  const flyers = useAppSelector((state) => state.flyers.allFlyers);

  const showFlyers = flyers.filter((fly) => fly.type === "bigFlyer");
  const finalFlyers = showFlyers.filter((fly) => fly.status === true);
  return (
    <div className="flex flex-col w-[95%] top-40  relative bg-gray-200">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation, Pagination]}
        className="h-80 w-[100%] "
      >
        {finalFlyers.map((fly, index) => (
          <SwiperSlide key={index}>
            <Image
              src={fly.image}
              className="w-[100%] h-[100%]"
              width={980}
              height={800}
              alt="PhCarousel"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
