import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";
import FilterCard from "../components/FilterCard";
import ProductCard from "../components/ProductCard";
import FilterPopup from "../components/FilterPopup";
import Mainlayout from "../components/Mainlayout";
import { useLocation } from "react-router-dom";
import { GrPowerReset } from "react-icons/gr";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton";

const Product = () => {
  const url = import.meta.env.VITE_BACKEND;
  const location = useLocation();
  const { categorys } = location.state || {};
  console.log("Selected category:", categorys);

  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categorys || null);
  const [Categories, setCategories] = useState([]);
  const [loader, setloader] = useState(false)

  const fetchProducts = async (category) => {
    try {
      setloader(true)
      const link = "admin/product";
      const response = await axios.get(
        category ? `${url}/${link}?category=${category}` : `${url}/${link}`
      );
      console.log("Fetched products:", response.data.products.data);
      setProducts(response.data.products.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setloader(false)
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${url}/admin/category`);
      setCategories(data.response.data);
      console.log("Fetched categories:", data.response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    getCategories();
  }, []);

  const handleCancelPopup = () => {
    setShowPopup(false);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div>
      <Mainlayout isNogap={true}>
        <div className="flex w-full gap-2 h-full ">
          <div className="hidden md:block md:w-[15%]">
            <FilterCard onCategorySelect={handleCategorySelect} />
          </div>
          <div className="grid md:w-[85%] h-full overflow-y-auto grid-cols-2 md:grid-cols-4 gap-2">
            {loader ? <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </> : products.map((product, index) => (
              <ProductCard key={index} data={product} />
            ))}
          </div>
        </div>
        {showPopup && (
          <div className="w-full md:hidden h-full sticky bottom-0 z-5">
            <FilterPopup iscancel={handleCancelPopup}>
              <span className="flex justify-between">
                <span className="p-2 font-bold">CATEGORIES</span>
                <span className="items-center flex px-1">
                  <GrPowerReset
                    onClick={() => handleCategorySelect("")}
                    size={20}
                  />
                </span>
              </span>

              <div className="p-2 flex gap-x-2 w-full overflow-scroll">
                {Categories.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => handleCategorySelect(item._id)}
                    onDoubleClick={() => handleCategorySelect("")}
                    className={`border-2 ${selectedCategory === item._id
                      ? "border-2 border-gold_dark"
                      : ""
                      } px-3 text-xs rounded-md w-full font-semibold bg-white`}
                  >
                    {item.name}
                  </p>
                ))}
              </div>
            </FilterPopup>
          </div>
        )}
      </Mainlayout>
      <div className="md:hidden w-full sticky bottom-0 z-5">
        <div className="flex w-full">
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
