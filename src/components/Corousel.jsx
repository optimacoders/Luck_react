
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Side = () => {
  const images = [
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/34372c33539333.56af37b23566f.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400/264e3629894817.5609864fcd16d.png',
    'https://i.pinimg.com/originals/3c/41/ab/3c41ab736bc52789af651115e4f0a980.jpg'
  ];

  return (
    <div className=" border border-black">
      <Carousel
        autoPlay
        infiniteLoop={true}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
        // centerMode
      >
        {images.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              className="h-[25vh] md:h-[50vh] w-[100%]"
              alt={`Legend ${index + 1}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Side;
