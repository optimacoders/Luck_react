import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCardSkeleton from "../skeletons/CategoryCardSkeleton";

const Category = () => {
  const [category, setcategory] = useState([]);
  const [rcat, setrcat] = useState("");
  const url = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();
  const [loader, setloader] = useState(false)

  const getCategories = async () => {
    try {
      setloader(true)
      const { data } = await axios.get(`${url}/admin/category`);
      setcategory(data.response.data);
      setloader(false)
    } catch (error) {
      console.error("Error fetching :", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const click = async (id) => {
    setrcat(id);
    navigate("/products", { state: { categorys: id } });
  };

  return (
    <div className=" grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-5 flex-wrap md:px-36 justify-center items-center">
      {loader ? <><CategoryCardSkeleton /><CategoryCardSkeleton /><CategoryCardSkeleton /><CategoryCardSkeleton /><CategoryCardSkeleton /> </> :
        category?.map((item, index) => (
          <div
            onClick={() => click(item._id)}
            key={index}
            className=" flex flex-col items-center rounded-md gap-2 cursor-pointer"
          >
            <div className="  w-24 h-24 aspect-square rounded-full relative overflow-hidden">
              <img
                src={item?.image}
                className="object-cover aspect-square rounded-md"
              />
            </div>
            <p className="flex justify-center text-center text-gray-700 text-xs font-semibold">
              {item?.name}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Category;
