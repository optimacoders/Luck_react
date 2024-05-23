import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/layout";
import { Toaster } from "react-hot-toast";
import Product from "./pages/Product";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/products" element={<Product />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
