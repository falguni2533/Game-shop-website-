import React, { useState} from 'react'
import { Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

import './gameSwiper.css';

import {EffectCoverflow, Navigation , Autoplay} from 'swiper/modules';
function GameSwiper({games}) {

//  const [active, setActive] = useState(false);
 active ? "active" : undefined
 const handleToggleVideo=()=>{
  setActive(!active);
 };

  return (
    <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        navigation={true}
        slidesPerView={'auto'}
        coverflowEffect={{
            rotate: 35,
            stretch: 200,
            depth: 250,
            modifier: 1,
            slideShadows: true,
        }}
      //  autoplay={{
      //       delay: 2500,
      //       disableOnInteraction: false,
      //   }}
      
        modules={[EffectCoverflow, Navigation, Autoplay]}
        className="gameSwiper"
    >
    
       { games.map(game => ( 
            <SwiperSlide key={game.id}>
               <div className="gameSlider">
            <img src={game.img} alt={game.title} />
              <div className={`video ${active ? 'active' : undefined}`}>
                <iframe
                  width="520"
                  height="300"
                  src={game.trailer}
                  title={game.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
               </div>
              <div className="content">
                <h2>{game.title}</h2>
                <p>{game.description}</p>
                <div className="buttons">
                  <button className="orderBtn">Buy Now</button>
                  <button className={`playBtn ${active ? 'active' : undefined}`} onClick={handleToggleVideo}>
                    <span className="pause">
                      <i className="bi bi-pause-fill"></i>
                    </span>
                    <span className="play">
                      <i className="bi bi-play-fill"></i>
                    </span>
                  </button>
                </div>
                </div>
              
              </div>
              </SwiperSlide>
        ))}
    </Swiper>
  );
}

export default GameSwiper;
