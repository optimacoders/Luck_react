import React from "react";
import Nav from "./Nav";

const Mainlayout = ({ children, bg, isNogap }) => {
  return (
    <div className="h-[100svh]">
      <div className="h-[10svh]">
        <Nav />
      </div>
      <div
        className={` h-[90svh] bg-${bg} ${isNogap ? "md:px-0  md:py-0" : " md:px-10"
          }  px-2 overflow-y-auto `}
      >
        {children}
      </div>
    </div>
  );
};

export default Mainlayout;
