import React, { useEffect, useState } from "react";
//import logo from "../Assets/logo.png";
import { GiHamburgerMenu, GiCancel, GiArrowWings } from "react-icons/gi";
import { IoIosArrowDropright } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegUser, FaS } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import AuthHook from "../context/AuthContext";
import { CiLogin } from "react-icons/ci";
import { BiSolidCategory } from "react-icons/bi";
import axios from "axios";
import { postRequest } from "../utils/Apihelpers";

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
  const [searchSuggest, setsearchSuggest] = useState([]);
  const [search, setsearch] = useState("");

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

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/products", { state: { q: search } });
  };

  const handleSearchSuggest = async () => {
    const res = await postRequest(
      false,
      `/admin/product/search?q=${search == "" ? null : search}`,
      {}
    );
    if (res.success) {
      setsearchSuggest(res.products);
    }
  };

  const click = async (id) => {
    navigate("/products", { state: { q: search } });
  };

  useEffect(() => {
    setdropdown(false)
    handleSearchSuggest();
  }, [search]);

  useEffect(() => {
    getUserDetails();
  }, []);

  const handlemddrop = () => {
    setdropdown(!dropdown);
  };

  return (
    <div className=" h-[10vh] min-h-[10vh] ">
      <div className="bg-white px-2 sm:px-4 h-full items-center w-full flex justify-between">
        <section onClick={handle} className="sm:hidden">
          {nav ? <GiCancel size={23} /> : <GiHamburgerMenu size={23} />}
        </section>
        <section className=" flex gap-2 h-full items-center">
          <div onClick={() => navigate("/")} className="sm:px-2 cursor-pointer  ">
            <img src={""} alt="logo" className="" width={100} />
          </div>
          <div className={`hidden relative h-full md:flex items-center ${dropdown ? " border-b-2 border-gold_dark" : ""}`}>
            <section onClick={() => handlemddrop()} className="flex gap-x-1 items-center text-gray-700 ">
              <BiSolidCategory className="flex h-7  items-center" />
              <p className={`cursor-pointer flex items-center text-sm font-semibold`}>Categories</p>
            </section>
            {dropdown && (
              <div onBlur={(e) => setdropdown(false)} className="absolute max-h-48 duration-300 w-[50vw] transition-all ease-in-out h-auto overflow-y-auto top-[59px] text-xs bg-[#f5f6f6]  z-10">
                {category?.map((item, index) => (
                  <ul key={index} className="text-md">
                    <li
                      onClick={() => click(item._id)}
                      className="hover:font-semibold text-gray-600 px-4 py-2 cursor-pointer capitalize hover:bg-white"
                    >
                      {item?.name}
                    </li>
                  </ul>
                ))}
              </div>
            )}
          </div>
        </section>
        <div className="w-[30%] hidden h-full md:flex items-center relative">
          <form onSubmit={handleSearch} className=" w-full">
            <input
              type="text"
              placeholder="Search for products"
              value={search}
              onChange={(e) => {
                setsearch(e.target.value);
              }}
              className="py-[8px] w-full outline-none px-5 rounded-3xl bg-[#f5f6f6] text-xs"
            />
          </form>
          {searchSuggest.length > 0 && (
            <section className="absolute max-h-48 duration-300 transition-all ease-in-out h-auto overflow-y-auto top-14 text-xs bg-[#f5f6f6] w-full z-10 rounded-md">
              {searchSuggest?.map((item) => {
                return (
                  <p
                    onClick={click}
                    className=" hover:font-semibold text-gray-600 px-4 py-2 cursor-pointer capitalize hover:bg-white"
                  >
                    {item.title}
                  </p>
                );
              })}
            </section>
          )}
        </div>
        <div className=" ">
          <div className="flex gap-x-6">
            {isLogedin ? (
              <section
                onClick={() => navigate("/profile")}
                className="flex flex-col font-semibold items-center cursor-pointer"
              >
                <FaRegUser size={18} />
                <p className="font-bold text-xs">Account</p>
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
              className="flex flex-col font-semibold items-center cursor-pointer"
            >
              <AiOutlineShoppingCart size={18} />
              <p className=" font-bold text-xs">Cart</p>
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
          className={`bg-gray-100 z-10 flex flex-col absolute left-0 gap-2 h-[100svh] shadow-sm ${nav ? "w-[90%] sm:w-17" : "w-0 overflow-hidden"
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
    </div>
  );
};

export default Nav;
