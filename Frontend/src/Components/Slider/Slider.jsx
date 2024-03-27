import React, { useState, useEffect } from 'react';
import './Slider.css'; // Assuming you have a CSS file for styling
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Slider.css';

// import required modules
import { Autoplay, Pagination} from 'swiper/modules';

function Slider() {
 
 

    return (
        <>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
      
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide><img src="\src\Images\heart1.jpg" alt="image" /></SwiperSlide>
          <SwiperSlide><img src="\src\Images\heart2.jpg" alt="image" /></SwiperSlide>
          <SwiperSlide><img src="\src\Images\heart3.jpg" alt="image" /></SwiperSlide>
        </Swiper>
      </>
    );
}

export default Slider;
