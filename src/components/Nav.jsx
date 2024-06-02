import React, { useEffect, useState } from "react";
//import logo from "../Assets/logo.png";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { IoIosArrowDropright } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegUser, FaS } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import AuthHook from "../context/AuthContext";
import { CiLogin } from "react-icons/ci";
import { postRequest } from "../utils/Apihelpers";

const Nav = () => {
  const [nav, setNav] = useState(false);
  const [men, setMen] = useState(false);
  const [c2, setc2] = useState(false);
  const [searchSuggest, setsearchSuggest] = useState([])
  const [search, setsearch] = useState("")

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
  }

  const handleSearchSuggest = async () => {
    const res = await postRequest(false, `/admin/product/search?q=${search == "" ? null : search}`, {});
    if (res.success) {
      setsearchSuggest(res.products)
    }
  }

  const click = async (id) => {
    navigate("/products", { state: { q: search } });
  };

  useEffect(() => {
    handleSearchSuggest()
  }, [search])

  useEffect(() => {
    getUserDetails();
  }, []);

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
          <ul className="flex gap-4 font-semibold text-xs ">
            <li>MEN</li>
            <li>KIDS</li>
            <li>HOME</li>
            <li>BEAUTY</li>
          </ul>
        </div>
        <div className="w-[30%] hidden h-full md:flex items-center relative">
          <form onSubmit={handleSearch} className=" w-full">
            <input
              type="text"
              placeholder="Search for products"
              value={search}
              onChange={(e) => { setsearch(e.target.value) }}
              className="py-[8px] w-full outline-none px-5 rounded-3xl bg-[#f5f6f6] text-xs"
            />
          </form>
          {searchSuggest.length > 0 && <section className="absolute max-h-48 duration-300 transition-all ease-in-out h-auto overflow-y-auto top-14 text-xs bg-[#f5f6f6] w-full z-10 rounded-md">
            {searchSuggest?.map((item) => {
              return <p onClick={click} className=" hover:font-semibold text-gray-600 px-4 py-2 cursor-pointer capitalize hover:bg-white">{item.title}</p>
            })}
          </section>}
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
      <section className="z-10 sm:hidden">
        <ul
          className={`bg-gray-300 z-10 flex flex-col absolute left-0 gap-2 h-screen shadow-sm ${nav ? "w-[90%] sm:w-17" : "w-0 overflow-hidden"
            } transition-all ease-linear duration-200`}
        >
          <li className="mx-2 flex justify-between my-1 font-semibold">
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
          <li className="mx-2 flex justify-between my-1 font-semibold hover:border-b-2">
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
