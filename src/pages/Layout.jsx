import React from "react";
import Nav from "../components/Nav";
import Side from "../components/Corousel";
import Category from "../components/Category";
import FeedProduct from "../components/FeedProduct";

const Layout = () => {
  return (
    <div className="h-[100vh]">
      <Nav />
      <div className="h-[90vh] overflow-y-auto">
        <Side />
        <p className="text-center p-4 font-semibold">
          Shop by <span className="font-sans text-2xl">Category</span>
        </p>
        <Category />
        <p className="text-center p-4 font-semibold">Shop Our Latest Styles!</p>
        <div>
          <FeedProduct />
        </div>
      </div>
    </div>
  );
};

export default Layout;
