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
    <div className=" flex flex-wrap justify-center gap-4 items-center my-7">
      {loader ? <><CategoryCardSkeleton /><CategoryCardSkeleton /><CategoryCardSkeleton /><CategoryCardSkeleton /><CategoryCardSkeleton /> </> :
        category?.map((item, index) => (
          <div
            onClick={() => click(item._id)}
            key={index}
            className=" flex flex-col items-center rounded-md w-[40%] md:w-[20%]  gap-1 cursor-pointer"
          >
            <div className=" w-28 h-28 md:w-32 md:h-32 aspect-square rounded-full relative">
              <img
                src={item?.image}
                className="object-cover aspect-square rounded-full border-2 border-gold_medium"
              />
            </div>
            <p className="flex justify-center text-center text-gray-700 text-sm font-bold">
              {item?.name}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Category;
