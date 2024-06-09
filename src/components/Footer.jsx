import React from "react";
import { FaInstagram, FaTwitter, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { MdAttachEmail } from "react-icons/md";
import { TbClock24 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Footer() {
  const navigate = useNavigate();

  return (
    <div className=" bg-bg_back text-white py-8 mt-7">
      <div className=" mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo" className="mb-4 w-28 h-28 aspect-square" />
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-blue-500">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-pink-500">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-blue-400">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-green-500">
              <FaWhatsapp size={24} />
            </a>
          </div>
        </div>
        <div className=" text-center md:text-left">
          <h3 className="font-semibold mb-4">Categories</h3>
          <ul>
            <li><a href="#" className="hover:underline">Men</a></li>
            <li><a href="#" className="hover:underline">Women</a></li>
            <li><a href="#" className="hover:underline">BestSeller</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
          </ul>
        </div>
        <div className=" text-center md:text-left">
          <h3 className="font-semibold mb-4">Shopping</h3>
          <ul>
            <li><a href="#" className="hover:underline">Your Cart</a></li>
            <li><a href="#" className="hover:underline">Your Orders</a></li>
            <li><a href="#" className="hover:underline">Compared Items</a></li>
            <li><a href="#" className="hover:underline">Wishlist</a></li>
          </ul>
        </div>
        <div className=" text-center md:text-left">
          <h3 className="font-semibold mb-4">Contact Us</h3>
          <ul className=" ">
            <li className="flex items-center justify-center md:justify-start gap-2"><MdLocationOn size={20} color="white" />Geetika Fashion, Lucknow, India</li>
            <li className="flex items-center justify-center md:justify-start gap-2"><MdLocationOn size={20} color="white" />Lucknowi Handicrafts, Lucknow, India</li>
            <li className="flex items-center justify-center md:justify-start gap-2"><MdAttachEmail size={18} color="white" />abc@gmail.com</li>
            <li className="flex items-center justify-center md:justify-start gap-2"><TbClock24 size={18} color="white" />All Weeks 24/7</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>Free Shipping, Easy Exchange & Returns</p>
      </div>
    </div>
  );
}

export default Footer;
