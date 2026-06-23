import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

import 'gameSwiper/css';

import {EffectCoverflow, Navigation , Autoplay} from 'swiper/modules';
function GameSwiper() {
  return (
    <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loops={true}
        slidesPerView={'auto'}
        coverflowEffect={{
            rotate: 35,
            stretch: 200,
            depth: 250,
            modifier: 1,
            slideShadows: true,
        }}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Navigation, Autoplay]}
        className="gameSwiper"
    >
    </Swiper>
  );
}

export default GameSwiper;
