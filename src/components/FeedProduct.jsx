import axios from "axios";
import React, { useEffect, useState } from "react";
import RelatedProductCard from "./RelatedProductCard";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton";
import Nodata from "./Nodata";
import { getRequest } from "../utils/Apihelpers";
import AuthHook from "../context/AuthContext";

const FeedProduct = () => {
  const url = import.meta.env.VITE_BACKEND;
  const { currency, isLogedin, token } = AuthHook();

  const [products, setProducts] = useState([]);
  const [productLoader, setproductLoader] = useState(false);

  const fetchProducts = async () => {
    try {
      setproductLoader(true);
      if (isLogedin && token) {
        if (currency !== null) {
          const response = await getRequest(
            true,
            `/watchHistory/${currency ? currency : "INR"}`
          );
          setProducts(response.data);
          setproductLoader(false);
        }
      } else {
        if (currency !== null) {
          const { latestproducts } = await getRequest(
            false,
            `/admin/product/latestProducts/${currency ? currency : "INR"}`
          );
          setProducts(latestproducts);
          setproductLoader(false);
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currency, token]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 px-3 md:px-20 gap-3 md:gap-5">
      {productLoader ? (
        <>
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </>
      ) : products.length === 0 ? (
        <div className="w-[80svw]">
          <Nodata />
        </div>
      ) : isLogedin ? (
        products.map((product, index) => (
          <div key={index}>
            <RelatedProductCard data={product?.productId} />
          </div>
        ))
      ) : (
        products.map((product, index) => (
          <div key={index}>
            <RelatedProductCard data={product} />
          </div>
        ))
      )}
    </div>
  );
};

export default FeedProduct;
