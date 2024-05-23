"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const Category = () => {
  const [category, setcategory] = useState([]);
  const url = import.meta.env.VITE_BACKEND;

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${url}/admin/category`);
      setcategory(data.categories);
    } catch (error) {
      console.error("Error fetching :", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  const img =
    "https://theindianethnicco.com/cdn/shop/files/NEW_IN_STORE_45e52d13-f247-4e3a-814f-aabeab995a9b.jpg?v=1713504901";
  return (
    <div className="flex justify-center p-4 w-full">
      <div className="grid gap-x-7 md:gap-x-14 gap-y-4 grid-cols-3 md:grid-cols-4">
        {category.map((item, index) => (
          <div className="  flex flex-col md:justify-center ">
            <img
              src={item?.image}
              className=" h-[10vh] shadow-2xl md:h-[20vh] w-[10vh] md:w-[20vh] border rounded-full "
            />
            <p className="flex justify-center items-center font-semibold">
              {item?.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
