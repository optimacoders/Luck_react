import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/layout";
import { Toaster } from "react-hot-toast";
import Product from "./pages/Product";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Info from "./pages/Info";
import Myorders from "./pages/Myorders";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/auth" element={<Auth />} >
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="/products" element={<Product />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/profile" element={<Profile />} /> */}

          <Route path="/profile" element={<Profile />}>
            <Route index element={<Info />} />
            <Route path="/profile/orders" element={<Myorders />} />
          </Route>
        </Routes>
        <Toaster
          position="top-right"
          reverseOrder={true}
        />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
