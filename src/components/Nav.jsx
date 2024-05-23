import React, { useState } from "react";
import logo from "../Assets/logo.png";
import { IoBagHandleOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { IoIosArrowDropright } from "react-icons/io";
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
    <div className="">
      <div className="bg-white px-4 border-b  items-center w-full flex justify-between">
        <section onClick={handle} className="sm:hidden">
          {nav ? <GiCancel size={23} /> : <GiHamburgerMenu size={23} />}
        </section>
        <div onClick={() => navigate("/")}>
          <img src={logo} alt="logo" className="" width={140} />
        </div>
        <div className="hidden md:block">
          <ul className="flex gap-x-7 font-semibold">
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
            className="py-1 w-full outline-none px-5 border bg-gray-100 "
          />
        </div>
        <div className="  ">
          <div className="flex gap-x-6">
            <section onClick={() => navigate("/profile")}>
              <CgProfile size={28} />
            </section>
            <section onClick={() => navigate("/cart")}>
              <IoBagHandleOutline size={28} />
            </section>
            <section>
              <FaRegHeart size={28} />
            </section>
          </div>
        </div>
      </div>
      <section className=" z-10 sm:hidden ">
        <ul
          className={`bg-gray-300 z-10 flex flex-col absolute left-0 gap-2 h-screen shadow-sm ${
            nav ? "w-[90%] sm:w-17" : "w-0 overflow-hidden"
          } transition-all ease-linear duration-200`}
        >
          <li className="mx-2 flex justify-between my-1 font-semibold   inline">
            MEN
            <span>
              <IoIosArrowDropright onClick={handlemen} size={23} />
            </span>
          </li>
          {men && (
            <div className=" flex justify-start px-4 w-full">
              <ul className=" gap-2 flex flex-col ">
                <li>Men T-Shirts</li>
                <li>Men T-Shirts</li>
              </ul>
            </div>
          )}
          <li className="mx-2 flex justify-between  my-1 font-semibold hover:border-b-2  inline">
            WOMAN
            <span>
              <IoIosArrowDropright onClick={handlec2} size={23} />
            </span>
          </li>
          {c2 && (
            <div className=" flex justify-start px-4 w-full">
              <ul className=" gap-2 flex flex-col ">
                <li>Kurtas</li>
                <li>Tops </li>
                <li>Dupattas </li>
                <li>Bhotaras</li>
                <li>Tunics</li>
              </ul>
            </div>
          )}
          <li className="mx-2  my-1 font-semibold hover:border-b-2  inline">
            About
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Nav;
