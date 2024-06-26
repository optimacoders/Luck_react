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
import InfiniteScroll from "react-infinite-scroll-component";
import { getRequest } from "../utils/Apihelpers";

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
  const [cureentPage, setcureentPage] = useState(1)
  const [totalPages, settotalPages] = useState()
  const [hasMore, sethasMore] = useState(false)

  const fetchProducts = async (
    category,
    color,
    pricefrom,
    priceto,
    sortOption
  ) => {
    if (currency !== null) {
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
        setProducts(response?.data?.products?.data);
        setcureentPage(response?.data?.products?.currentPage)
        settotalPages(response?.data?.products?.totalPages)
        sethasMore(response?.data?.products?.moreData)
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoader(false);
      }
    }
  };

  const fetchMore = async (category,
    color,
    pricefrom,
    priceto,
    sortOption) => {
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
        `${url}/${link}?category=${category}&currency=${currency}${queryParams}&page=${cureentPage + 1}`
      );
      setProducts(prev => [...prev, ...response?.data?.products?.data]);
      setcureentPage(response?.data?.products?.currentPage)
      settotalPages(response?.data?.products?.totalPages)
      sethasMore(response?.data?.products?.moreData)
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoader(false);
    }
  }

  const getCategories = async () => {
    if (categorys !== null && categorys !== undefined && categorys !== "") {
      console.log("category api call");
      try {
        const data = await getRequest(true, `/admin/category/${categorys}`);
        console.log(data.response, 808080080);
        setCategories(data.response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
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
  }, [selectedCategory, selectedColor, priceFrom, priceTo, sortOption, currency]);

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
            category={categories?.name}
          />
        </div>
        <div className=" h-full overflow-y-auto">
          {loader ? (
            <div className="grid  grid-cols-2 md:grid-cols-4 gap-2 px-3 md:px-6 md:mb-5">
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </div>
          ) : products.length == 0 ? (
            <div className=" w-[100svw]">
              <Nodata />
            </div>
          ) : (
            <InfiniteScroll
              dataLength={products.length}
              next={() => fetchMore(selectedCategory,
                selectedColor,
                priceFrom,
                priceTo,
                sortOption)}
              hasMore={hasMore}
              className="grid grid-cols-2 md:grid-cols-4 gap-2 px-3 md:px-6 md:mb-5"
              loader={
                <>
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                </>
              }
              scrollableTarget="scrollContainer"
            >{
                products.map((product, index) => (
                  <ProductCard key={index} data={product} />
                ))
              }
            </InfiniteScroll>
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
