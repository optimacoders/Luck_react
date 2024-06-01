import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton";

const FeedProduct = () => {
  const url = import.meta.env.VITE_BACKEND;

  const [products, setProducts] = useState([]);
  const [productLoader, setproductLoader] = useState(false)

  const fetchProducts = async () => {
    try {
      setproductLoader(true)
      const { data } = await axios.get(`${url}/admin/product`);
      setProducts(data.products.data);
      setproductLoader(false)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid  grid-cols-1 md:grid-cols-4 px-3 md:px-20">
      {productLoader ? <ProductCardSkeleton /> :
        products.map((product, index) => (
          <div key={index}>
            <ProductCard data={product} />
          </div>
        ))}
    </div>
  );
};

export default FeedProduct;
