import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const FeedProduct = () => {
  const url = import.meta.env.VITE_BACKEND;

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${url}/admin/product`);
      setProducts(data.products.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid  grid-cols-1 md:grid-cols-4 px-3 md:px-20">
      {products.map((product, index) => (
        <div key={index}>
          <ProductCard data={product} />
        </div>
      ))}
    </div>
  );
};

export default FeedProduct;
