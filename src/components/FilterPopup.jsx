import React from "react";
import { MdOutlineCancel } from "react-icons/md";

const FilterPopup = ({ iscancel, children }) => {
  return (
    <div className="bg-gray-300 h-[50%] z-10 absolute w-full rounded-lg top-1/2 ">
      <section className="items-center p-2 ">
        <MdOutlineCancel
          className="justify-end flex "
          size={23}
          onClick={() => iscancel(true)}
        />
      </section>

      {children}
    </div>
  );
};

export default FilterPopup;
