import React, { useEffect, useState } from "react";
//import logo from "../Assets/logo.png";
import { GiHamburgerMenu, GiCancel, GiArrowWings } from "react-icons/gi";
import { IoIosArrowDropright } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import AuthHook from "../context/AuthContext";
import { CiLogin } from "react-icons/ci";
import axios from "axios";

const Nav = () => {
  const [nav, setNav] = useState(false);
  const [men, setMen] = useState(false);
  const url = import.meta.env.VITE_BACKEND;
  const [c2, setc2] = useState(false);
  const [dropdown, setdropdown] = useState(false);
  const [category, setcategory] = useState([]);
  const getCategories = async () => {
    try {
      // setloader(true);
      const { data } = await axios.get(`${url}/admin/category`);
      setcategory(data.response.data);
      // setloader(false);
    } catch (error) {
      console.error("Error fetching :", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  const { getUserDetails, token, isLogedin } = AuthHook();

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
  useEffect(() => {
    getUserDetails();
  }, []);

  const handlemddrop = () => {
    setdropdown(!dropdown);
  };
  const click = async (id) => {
    navigate("/products", { state: { categorys: id } });
  };

  return (
    <div className=" h-[10vh] min-h-[10vh]">
      <div className="bg-white px-2 sm:px-4 h-full items-center w-full flex justify-between">
        <section onClick={handle} className="sm:hidden border">
          {nav ? <GiCancel size={23} /> : <GiHamburgerMenu size={23} />}
        </section>
        <div onClick={() => navigate("/")} className="sm:px-2 cursor-pointer ">
          <img src={""} alt="logo" className="" width={130} />
        </div>
        <div className="hidden md:block">
          <section onClick={() => handlemddrop()} className="flex gap-x-2 ">
            <GiHamburgerMenu className="flex h-7  items-center" />
            <p className="cursor-pointer flex items-center">Categories</p>
          </section>
        </div>
        <div className="w-[30%] hidden md:block">
          <input
            type="text"
            placeholder="Search for products"
            className="py-[8px] w-full outline-none px-5 rounded-3xl bg-[#f5f6f6] text-xs"
          />
        </div>
        <div className=" ">
          <div className="flex gap-x-6">
            {isLogedin ? (
              <section
                onClick={() => navigate("/profile")}
                className="flex gap-2 font-semibold items-center cursor-pointer"
              >
                <FaRegUser size={16} />
                <p className="font-semibold text-sm">Account</p>
              </section>
            ) : (
              <>
                <section
                  onClick={() => navigate("/auth/login")}
                  className="flex gap-2 font-semibold items-center bg-gold_medium text-white text-sm rounded-full px-3 py-[4px]"
                >
                  <p className="font-semibold cursor-pointer text-sm">Login</p>
                </section>
              </>
            )}

            <section
              onClick={() => navigate("/cart")}
              className="flex gap-2 font-semibold items-center cursor-pointer"
            >
              <AiOutlineShoppingCart size={18} />
              <p className=" font-semibold text-sm">Cart</p>
            </section>
            {/* <section>
              <FaRegHeart size={28} />
            </section> */}
          </div>
        </div>
      </div>
      <div className=" sm:mx-10 border-b"></div>
      <section className="z-10 sm:hidden h-[100svh]">
        <ul
          className={`bg-gray-100 z-10 flex flex-col absolute left-0 gap-2 h-[100svh] shadow-sm ${
            nav ? "w-[90%] sm:w-17" : "w-0 overflow-hidden"
          } transition-all ease-linear duration-200`}
        >
          <p className="flex justify-center text-md font-semibold">
            Browse Categories
          </p>
          {category?.map((item, index) => (
            <ul key={index} className="text-md px-2 py-2 ">
              <section className="flex justify-between items-center">
                <li
                  onClick={() => click(item._id)}
                  className="hover:underline-offset-2 hover:border-b-[1.5px] border-gold_dark cursor-pointer "
                >
                  {item?.name}
                </li>
                <IoIosArrowDropright
                  onClick={() => click(item._id)}
                  size={20}
                  className="items-center flex"
                />
              </section>
            </ul>
          ))}
        </ul>
      </section>
      {dropdown && (
        <div className="hidden md:block">
          <div className="absolute top-15 z-10 left-0 h-[25vh] overflow-y-auto right-0 w-1/6 mx-[20%] bg-white p-4 rounded shadow-lg">
            {category?.map((item, index) => (
              <ul key={index} className="text-md">
                <li
                  onClick={() => click(item._id)}
                  className="hover:underline-offset-2 hover:border-b-[1.5px] border-gold_dark cursor-pointer "
                >
                  {item?.name}
                </li>
              </ul>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
