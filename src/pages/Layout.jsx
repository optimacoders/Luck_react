import React from "react";
import Nav from "../components/Nav";
import Side from "../components/Corousel";
import Category from "../components/Category";
import FeedProduct from "../components/FeedProduct";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="h-[100vh]">
      <Nav />
      <div className="h-[90vh] overflow-y-auto">
        <Side />
        <p className="p-4 font-bold text-xl my-2">Shop by Category</p>
        <div className="w-full overflow-x-auto">
          <Category />
        </div>
        <p className="p-4 font-bold text-xl my-2">Shop Our Latest Styles!</p>
        <div>
          <FeedProduct />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
