import axios from "axios";
import React, { useEffect, useState } from "react";

const FilterCard = ({ onCategorySelect, mycategories }) => {
  const url = import.meta.env.VITE_BACKEND;
  const [category, setcategory] = useState([]);
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${url}/admin/category`);
      setcategory(data.response.data);
      console.log(data.response.data);
      mycategories(data.categories);
    } catch (error) {
      console.error("Error fetching :", error);
    }
  };

  const handleCategorySelect = (selectedCategory) => {
    onCategorySelect(selectedCategory);
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="border-r-2 p-2 w-full h-full">
      <p className="text-start font-semibold border-b pb-2">FILTERS</p>
      <div className="my-2">
        <p className="font-semibold">CATEGORIES</p>
        <ul className="p-2 flex flex-col gap-2">
          {category.map((item, index) => (
            <li key={index} className="flex">
              <label className="flex items-center">
                <input
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleCategorySelect(item._id);
                    } else {
                      handleCategorySelect("");
                    }
                  }}
                  type="checkbox"
                  className="p-2 "
                />
                <span className="ml-2 text-sm">{item?.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterCard;
