import axios from "axios";
import React, { useEffect, useState } from "react";
import RelatedProductCard from "./RelatedProductCard";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton";
import Nodata from "./Nodata";

const FeedProduct = () => {
  const url = import.meta.env.VITE_BACKEND;

  const [products, setProducts] = useState([]);
  const [productLoader, setproductLoader] = useState(false);

  const fetchProducts = async () => {
    try {
      setproductLoader(true);
      const { data } = await axios.get(`${url}/admin/product`);
      setProducts(data.products.data);
      setproductLoader(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid  grid-cols-2 md:grid-cols-4 px-3 md:px-20 gap-5">
      {productLoader ? (
        <>
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </>
      ) : products.length == 0 ? <div className=" w-[80svw]"><Nodata /></div> : (
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
