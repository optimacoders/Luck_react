import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";
import FilterCard from "../components/FilterCard";
import ProductCard from "../components/ProductCard";
import FilterPopup from "../components/FilterPopup";
import Mainlayout from "../components/Mainlayout";

const Product = ({}) => {
  const url = import.meta.env.VITE_BACKEND;

  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [Category, setcategory] = useState(null);

  const fetchProducts = async (category) => {
    try {
      console.log(category);
      let link = "admin/product";
      const { data } = await axios.get(
        category ? `${url}/${link}?category=${category}` : `${url}/${link}`
      );
      console.log(data.products.data);
      setProducts(data.products.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCancelPopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  return (
    <div>
      <Mainlayout isNogap={true}>
        <div className="flex w-full gap-2 ">
          <div className="hidden md:block md:w-[15%]">
            <FilterCard
              onCategorySelect={setSelectedCategory}
              mycategories={setcategory}
            />
          </div>
          <div className="grid md:w-[85%] grid-cols-2 md:grid-cols-4 gap-2">
            {products.map((product, index) => (
              <ProductCard key={index} data={product} />
            ))}
          </div>
        </div>
        {showPopup && (
          <div className=" w-full md:hidden  h-full sticky bottom-0 z-5">
            <FilterPopup iscancel={handleCancelPopup}>
              <span className="p-2 font-semibold"> CATEGORIES</span>
              <div className="p-2 flex gap-x-2 w-full overflow-scroll scrollbar-none">
                {Category?.map((item, index) => (
                  <p
                    onClick={() => setSelectedCategory(item._id)}
                    className={`border-2 ${
                      selectedCategory == item._id
                        ? "border-2 border-blue-500"
                        : "border-2"
                    } p-1 px-3 border-black rounded-md`}
                  >
                    {item.name}
                  </p>
                ))}
              </div>
            </FilterPopup>
          </div>
        )}
      </Mainlayout>
      <div className="md:hidden w-full sticky bottom-0 z-5 ">
        <div className="flex w-full ">
          <section className="border-r-2 bg-[#dacd7f] gap-x-2 font-semibold text-white py-4 w-[50%] flex items-center justify-center">
            <FaCartPlus size={25} />
            Add to cart
          </section>
          <section
            onClick={() => setShowPopup(true)}
            className="border-r-2 bg-white font-semibold gap-x-2 py-4 w-[50%] flex items-center justify-center"
          >
            <MdFilterList size={25} /> FILTERS
          </section>
        </div>
      </div>
    </div>
  );
};

export default Product;
