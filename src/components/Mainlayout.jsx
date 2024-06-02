import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

const Mainlayout = ({ children, bg, isNogap }) => {
  return (
    <div className="h-[100svh] w-[100svw] overflow-y-hidden">
      <div className="h-[10svh]">
        <Nav />
      </div>
      <div
        className={`  h-[90svh] bg-${bg} ${isNogap ? "md:px-0  md:py-0" : " md:px-10"
          }  px-2 overflow-y-auto `}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Mainlayout;
