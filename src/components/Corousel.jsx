
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Side = () => {
  const images = [
    "https://i.pinimg.com/originals/07/08/e8/0708e8c728e6a89bb2aa6e4c2a3f40e0.jpg",
    "https://www.frontierraas.com/the-voice/wp-content/uploads/2023/07/Blog-Banner-1.jpg",
  ];

  return (
    <div>
      <Carousel
        autoPlay
        infiniteLoop={true}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
        centerMode
      >
        {images.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              className="h-[25vh] md:h-[50vh] md:w-[20vh]"
              alt={`Legend ${index + 1}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Side;
