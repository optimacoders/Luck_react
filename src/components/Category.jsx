import axios from "axios";
import React, { useEffect, useState } from "react";

const Category = () => {
  const [category, setcategory] = useState([]);
  const url = import.meta.env.VITE_BACKEND;

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${url}/admin/category`);
      setcategory(data.response.data);
    } catch (error) {
      console.error("Error fetching :", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);


  return (
    <div className=" grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-5 flex-wrap md:px-36 justify-center items-center">
      {category?.map((item, index) => (
        <div key={index} className=" flex flex-col items-center rounded-md gap-2">
          <div className="  w-24 h-24 aspect-square rounded-full relative overflow-hidden">
            <img src={item?.image} className="object-cover aspect-square rounded-md" />
          </div>
          <p className="flex justify-center text-center text-black text-sm font-semibold">
            {item?.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Category;
