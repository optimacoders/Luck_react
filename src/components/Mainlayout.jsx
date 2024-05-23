import React from "react";
import Nav from "./Nav";

const Mainlayout = ({ children, bg, isNogap }) => {
  return (
    <div className="h-[100vh]">
      <div className="h-[10vh]">
        <Nav />
      </div>
      <div
        className={`bg-${bg} ${
          isNogap ? "md:px-0  md:py-0" : "md:px-16 md:py-5"
        }  px-2 h-[90vh] overflow-y-auto `}
      >
        {children}
      </div>
      ;
    </div>
  );
};

export default Mainlayout;
