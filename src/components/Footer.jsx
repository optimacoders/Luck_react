import React from "react";
//import logo from "../Assets/logo.png";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

function Footer() {
  return (
    <div className=" flex border-t mt-4 px-20 W-full">
      <section className=" W-[40%]">
        <img src={logo} className=" aspect-square w-48 h-48" />
      </section>
      <section className=" w-[60%] flex flex-col items-center justify-center">
        <p className=" text-xl font-semibold">Social</p>
        <section className=" flex gap-3">
          <FaTwitter size={23} />
          <FaInstagram size={23} />
          <FaFacebook size={23} />
        </section>
      </section>
    </div>
  );
}

export default Footer;
