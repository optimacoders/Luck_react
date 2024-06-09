
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Side = () => {
  const images = [
    'https://as2.ftcdn.net/v2/jpg/07/46/79/55/1000_F_746795565_ccEv29AxtKxfrJhEu9bA5T0WhQ231JOE.jpg',
    'https://www.shutterstock.com/shutterstock/photos/1951855213/display_1500/stock-vector-woman-shopaholic-flying-among-clothes-fast-fashion-consumerism-and-overconsumption-concept-young-1951855213.jpg',
    'https://www.shutterstock.com/shutterstock/photos/1492939355/display_1500/stock-photo-promotional-sale-banner-with-smiling-cheerful-girl-running-and-holding-bags-1492939355.jpg'
  ];

  return (
    <div className=" px-3 md:px-14 py-3">
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
              className="h-[25vh] md:h-[55vh] w-[100%] rounded-lg"
              alt={`Legend ${index + 1}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Side;
