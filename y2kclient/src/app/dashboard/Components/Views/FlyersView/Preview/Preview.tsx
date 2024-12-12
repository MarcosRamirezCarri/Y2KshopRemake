import { useAppSelector } from "@/lib/hooks/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import mockCarousel from "@/app/[locale]/Mocks/mock";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

const PreviewFlyers = () => {
  const flyers = useAppSelector((state) => state.flyers.allFlyers);
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        className="h-80 w-[100%]"
      >
        {mockCarousel.map((mock, index) => (
          <SwiperSlide  key={index}>
            <Image
              src={mock.img}
              className="h-[100%] w-[100%]"
              width={1980}
              height={1800}
              alt="PhCarousel"
            />
            <p className="text-orange-500  font-medium text-5xl">{mock.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PreviewFlyers;