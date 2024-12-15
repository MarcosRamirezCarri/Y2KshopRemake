import { useAppSelector } from "@/lib/hooks/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
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
        className="h-80 "
      >
        {flyers.map((fly, index) => (
          <SwiperSlide  key={index}>
            <Image
              src={fly.image}
              className="h-[100%] w-[100%]"
              width={980}
              height={800}
              alt="PhCarousel"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PreviewFlyers;