import React, { useState, useEffect } from "react";
import "./Slider.css"; // Assuming you have a CSS file for styling
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Slider.css";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

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
        className="mySwiper "
      >
        <SwiperSlide className=" position-relative ">
          <img src="\src\Images\heart1.jpg" alt="image" />{" "}
          <div
            className=" position-absolute top-0 h-100 w-100 d-flex flex-column  align-items-start justify-content-center  "
            style={{ background: "rgba(36, 35, 35, 0.301)", zIndex: "999" }}
          >
            <h1 className="text-white">Welcome To <span >HeartFelt</span></h1>
         <h5 className="text-white">
              Beating of my heart is a Drum. Looking for a Rhythm like AI
            </h5>
         </div>
      
        </SwiperSlide>
        <SwiperSlide className=" position-relative ">
          <img src="\src\Images\heart2.jpg" alt="image" />
          <div
            className=" position-absolute top-0 h-100 w-100 d-flex flex-column  align-items-start justify-content-center  "
            style={{ background: "rgba(36, 35, 35, 0.301)", zIndex: "999" }}
          >
            <h1 className="text-white">Welcome To <span >HeartFelt</span></h1>
         <h5 className="text-white">
              Beating of my heart is a Drum. Looking for a Rhythm like AI
            </h5>
         </div>
        </SwiperSlide>
        <SwiperSlide className=" position-relative ">
          <img src="\src\Images\heart3.jpg" alt="image" />
          <div
            className=" position-absolute top-0 h-100 w-100 d-flex flex-column  align-items-start justify-content-center  "
            style={{ background: "rgba(36, 35, 35, 0.301)", zIndex: "999" }}
          >
            <h1 className="text-white">Welcome To <span >HeartFelt</span></h1>
         <h5 className="text-white">
              Beating of my heart is a Drum. Looking for a Rhythm like AI
            </h5>
         </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Slider;
