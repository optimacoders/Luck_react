import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const FeedProduct = () => {
  const url = import.meta.env.VITE_BACKEND;

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    console.log("hi outsidee fetch", url);
    try {
      const { data } = await axios.get(`${url}/admin/product`);
      setProducts(data.products.data);
      console.log("hi i am inside fetach", data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    console.log("hi i am in use effect ");
  }, []);

  return (
    <div className="grid  grid-cols-2  p-4 md:grid-cols-4 gap-2">
      {products.map((product, index) => (
        <div key={index}>
          <ProductCard data={product} />
        </div>
      ))}
    </div>
  );
};

export default FeedProduct;
