import React from "react";
import Nav from "../components/Nav";
import Side from "../components/Corousel";
import Category from "../components/Category";
import FeedProduct from "../components/FeedProduct";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom"

const Layout = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[100vh]">
      <Nav />
      <div className="h-[90vh] overflow-y-auto">
        <Side />
        <p className="p-4 font-semibold text-xl my-2 text-gray-600">Shop by Category</p>
        <div className="w-full overflow-x-auto">
          <Category />
        </div>
        <section className=" flex justify-between items-center my-6 px-4">
          <p className=" font-semibold text-xl text-gray-600">Shop Our Latest Styles!</p>
          <p className=" text-xs font-semibold text-gray-600 cursor-pointer" onClick={() => navigate("/products")}>View all products</p>
        </section>
        <div>
          <FeedProduct />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
