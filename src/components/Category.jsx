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
  const img =
    "https://theindianethnicco.com/cdn/shop/files/NEW_IN_STORE_45e52d13-f247-4e3a-814f-aabeab995a9b.jpg?v=1713504901";
  return (
    <div className="grid grid-cols-2 sm:flex w-full sm:overflow-x-auto gap-3 sm:gap-5 px-1 sm:px-10">
      {category?.map((item, index) => (
        <div key={index} className=" relative rounded-md  ">
          <div className=" w-24 h-24 aspect-square rounded-full relative overflow-hidden">
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
