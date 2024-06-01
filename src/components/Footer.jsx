import React from "react";
import logo from "../Assets/logo.png";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

function Footer() {
  return (
    <div className=" W-full bg-gray-50 px-10 py-2 mt-5">
      <div className=" flex flex-col md:flex-row justify-between items-center border-b p-2 md:p-0 gap-2 md:gap-0">
        <section>
          <img src={logo} className="" width={100} />
        </section>
        <section className=" flex text-xs font-medium gap-3 items-center text-gray-600">
          <p className=" hover:border-b-2 border-gold_dark px-2 py-[4px] cursor-pointer">MEN</p>
          <p className=" hover:border-b-2 border-gold_dark px-2 py-[4px] cursor-pointer">KIDS</p>
          <p className=" hover:border-b-2 border-gold_dark px-2 py-[4px] cursor-pointer">HOME</p>
          <p className=" hover:border-b-2 border-gold_dark px-2 py-[4px] cursor-pointer">BEAUTY</p>
        </section>
        <section className=" flex gap-3">
          <section className=" bg-gray-200 rounded-full p-[6px] cursor-pointer">
            <FaInstagram size={17} color="gray" />
          </section>
          <section className=" bg-gray-200 rounded-full p-[6px] cursor-pointer">
            <FaFacebook size={17} color="gray" />
          </section>
          <section className=" bg-gray-200 rounded-full p-[6px] cursor-pointer">
            <FaTwitter size={17} color="gray" />
          </section>
        </section>
      </div>
      <div className=" flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0 py-2 px-5">
        <p className=" text-xs text-gray-500 font-medium">&copy; 2024 INAYA, all rights are reserved</p>
        <p className=" text-xs text-gray-500 font-medium">Terms and conditions, privacy policy</p>
      </div>
    </div>
  );
}

export default Footer;
