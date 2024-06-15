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
  console.log("search:", q);
  const { currency } = AuthHook();

  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categorys || null);
  const [selectedColor, setSelectedColor] = useState();
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(50000);
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(false);
  const [sortOption, setSortOption] = useState("");

  const fetchProducts = async (
    category,
    color,
    pricefrom,
    priceto,
    sortOption
  ) => {
    try {
      setLoader(true);
      const link = "admin/product";
      let queryParams = q ? `&q=${q}` : "";

      if (color !== undefined && color !== null) {
        queryParams += `&colour=${color}`;
      }

      if (pricefrom !== undefined && priceto !== undefined) {
        queryParams += `&priceFrom=${pricefrom}&priceTo=${priceto}`;
      }

      if (sortOption !== undefined && sortOption !== undefined) {
        queryParams += `&sort=${sortOption}`;
      }

      const response = await axios.get(
        `${url}/${link}?category=${category}&currency=${currency}${queryParams}`
      );
      setProducts(response.data.products.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoader(false);
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
    fetchProducts(
      selectedCategory,
      selectedColor,
      priceFrom,
      priceTo,
      sortOption
    );
  }, [selectedCategory, selectedColor, priceFrom, priceTo, sortOption]);

  useEffect(() => {
    getCategories();
  }, []);

  const handleCancelPopup = () => {
    setShowPopup(false);
  };

  const handlecolorselect = (colorcode) => {
    const encodedColor = encodeURIComponent(colorcode);
    setSelectedColor(encodedColor);
    console.log("Selected color:", encodedColor);
  };

  const handlepriceselect = (pricefrom, priceto) => {
    setPriceFrom(pricefrom);
    setPriceTo(priceto);
    console.log("Selected price range:", pricefrom, priceto);
  };

  const handlesort = (value) => {
    setSortOption(value);
  };
  return (
    <div className=" h-[100svh] w-[100svw] overflow-y-hidden">
      <Nav />
      <div className="flex flex-col w-full gap-2 h-[90svh]">
        <div className="">
          {/* <h1>{categorys}</h1> */}
          <FilterCard
            oncolorselect={handlecolorselect}
            onPriceSelect={handlepriceselect}
            onSort={handlesort}
          />
        </div>
        <div className="grid h-full overflow-y-auto grid-cols-2 md:grid-cols-4 gap-2 px-3 md:px-6 md:mb-5">
          {loader ? (
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          ) : products.length == 0 ? (
            <div className=" w-[100svw]">
              <Nodata />
            </div>
          ) : (
            products.map((product, index) => (
              <ProductCard key={index} data={product} />
            ))
          )}
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
