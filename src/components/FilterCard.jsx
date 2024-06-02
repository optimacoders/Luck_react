import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";

const FilterCard = ({ onCategorySelect, mycategories }) => {
  const url = import.meta.env.VITE_BACKEND;
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${url}/admin/category`);
      setCategory(data.response.data);
      console.log(data.response.data);
      mycategories(data.response.data); // Corrected to use response.data
    } catch (error) {
      console.error("Error fetching :", error);
    }
  };

  const handleCategorySelect = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    onCategorySelect(selectedCategory);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="border-r p-2 w-full h-full">
      <p className="text-start font-semibold border-b pb-2 text-sm">FILTERS</p>
      <div className="my-2">
        <span className="flex justify-between">
          <p className="font-semibold text-sm font-mono">CATEGORIES</p>
          <span className="items-center flex px-1 cursor-pointer">
            <GrPowerReset onClick={() => handleCategorySelect("")} size={15} />
          </span>
        </span>

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
                  checked={selectedCategory === item._id}
                  className="p-2 cursor-pointer"
                />
                <span className="ml-2 text-xs">{item?.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterCard;
