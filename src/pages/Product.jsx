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
import Nav from "../components/Nav";
import Nodata from "../components/Nodata";
import AuthHook from "../context/AuthContext";

const Product = () => {
  const url = import.meta.env.VITE_BACKEND;
  const location = useLocation();
  const { categorys, q } = location.state || {};
  console.log("Selected category:", categorys);
  console.log("serach:", q);
  const { currency } = AuthHook()

  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categorys || null);
  const [Categories, setCategories] = useState([]);
  const [loader, setloader] = useState(false)

  const fetchProducts = async (category) => {
    try {
      setloader(true)
      if (currency !== null) {
        const link = `admin/product/${currency ? currency : "INR"}`;
        const response = await axios.get(
          category ? `${url}/${link}?category=${category}&q=${q ? q : ""}` : `${url}/${link}?q=${q ? q : ""}`
        );
        setProducts(response.data.products.data);
        setloader(false)
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${url}/admin/category`);
      setCategories(data.response.data);
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
    <div className=" h-[100svh] w-[100svw] overflow-y-hidden">
      <Nav />
      <div className="flex flex-col w-full gap-2 h-[90svh]">
        <div className="">
          {/* <h1>{categorys}</h1> */}
          <FilterCard onCategorySelect={handleCategorySelect} />
        </div>
        <div className="grid h-full overflow-y-auto grid-cols-2 md:grid-cols-4 gap-2 px-3 md:px-6 md:mb-5">
          {loader ? <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </> : products.length == 0 ? <div className=" w-[100svw]"><Nodata /></div> : products.map((product, index) => (
            <ProductCard key={index} data={product} />
          ))}
        </div>
      </div>
      {/* <div className="md:hidden w-full h-[10svh] border">
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
      </div> */}
    </div>
  );
};

export default Product;
