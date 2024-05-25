import React, { useState } from "react";
import logo from "../Assets/logo.png";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { IoIosArrowDropright } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [nav, setNav] = useState(false);
  const [men, setMen] = useState(false);
  const [c2, setc2] = useState(false);

  const navigate = useNavigate();

  const handle = () => {
    setNav(!nav);
  };

  const handlemen = () => {
    setMen(!men);
  };

  const handlec2 = () => {
    setc2(!c2);
  };

  return (
    <div className=" h-[10vh]">
      <div className="bg-white px-2 sm:px-4 items-center w-full flex justify-between">
        <section onClick={handle} className="sm:hidden border">
          {nav ? <GiCancel size={23} /> : <GiHamburgerMenu size={23} />}
        </section>
        <div onClick={() => navigate("/")} className="sm:px-2 ">
          <img src={logo} alt="logo" className="" width={130} />
        </div>
        <div className="hidden md:block">
          <ul className="flex gap-4 font-semibold text-sm ">
            <li>MEN</li>
            <li>KIDS</li>
            <li>HOME</li>
            <li>BEAUTY</li>
          </ul>
        </div>
        <div className="w-[30%] hidden md:block">
          <input
            type="text"
            placeholder="Search for products"
            className="py-[8px] w-full outline-none px-5 rounded-3xl bg-[#f5f6f6] text-sm"
          />
        </div>
        <div className=" ">
          <div className="flex gap-x-6">
            <section
              onClick={() => navigate("/profile")}
              className="flex gap-2 font-semibold items-center"
            >
              <FaRegUser size={20} />
              <p className=" font-semibold cursor-pointer">Account</p>
            </section>
            <section
              onClick={() => navigate("/cart")}
              className="flex gap-2 font-semibold items-center"
            >
              <AiOutlineShoppingCart size={20} />
              <p className=" font-semibold">Cart</p>
            </section>
            {/* <section>
              <FaRegHeart size={28} />
            </section> */}
          </div>
        </div>
      </div>
      <div className=" sm:mx-10 border-b"></div>
      <section className="z-10 sm:hidden">
        <ul
          className={`bg-gray-300 z-10 flex flex-col absolute left-0 gap-2 h-screen shadow-sm ${
            nav ? "w-[90%] sm:w-17" : "w-0 overflow-hidden"
          } transition-all ease-linear duration-200`}
        >
          <li className="mx-2 flex justify-between my-1 font-semibold inline">
            MEN
            <span>
              <IoIosArrowDropright onClick={handlemen} size={23} />
            </span>
          </li>
          {men && (
            <div className="flex justify-start px-4 w-full">
              <ul className="gap-2 flex flex-col">
                <li>Men T-Shirts</li>
                <li>Men T-Shirts</li>
              </ul>
            </div>
          )}
          <li className="mx-2 flex justify-between my-1 font-semibold hover:border-b-2 inline">
            WOMAN
            <span>
              <IoIosArrowDropright onClick={handlec2} size={23} />
            </span>
          </li>
          {c2 && (
            <div className="flex justify-start px-4 w-full">
              <ul className="gap-2 flex flex-col">
                <li>Kurtas</li>
                <li>Tops</li>
                <li>Dupattas</li>
                <li>Bhotaras</li>
                <li>Tunics</li>
              </ul>
            </div>
          )}
          <li className="mx-2 my-1 font-semibold hover:border-b-2 inline">
            About
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Nav;
