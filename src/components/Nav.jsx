import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { GiHamburgerMenu, GiCancel, GiArrowWings } from "react-icons/gi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthHook from "../context/AuthContext";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";
import { postRequest } from "../utils/Apihelpers";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const Nav = () => {
  const [nav, setNav] = useState(false);
  const url = import.meta.env.VITE_BACKEND;
  const [category, setcategory] = useState([]);


  const [women, setwomen] = useState(false)
  const [man, setman] = useState(false)
  const [bestseller, setbestseller] = useState(false)
  const [about, setabout] = useState(false)

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

  const [showSearch, setshowSearch] = useState(false)
  const [searchSuggest, setsearchSuggest] = useState([]);
  const [search, setsearch] = useState("");

  const { getUserDetails, token, isLogedin, getlocation } = AuthHook();

  const navigate = useNavigate();

  const handle = () => {
    setNav(!nav);
  };

  const clearHader = () => {
    setman(false)
    setwomen(false)
    setbestseller(false)
    setabout(false)
  }

  const click = async (id) => {
    navigate("/products", { state: { q: search } });
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

  useEffect(() => {
    handleSearchSuggest();
  }, [search]);

  useEffect(() => {
    getlocation()
    getUserDetails();
  }, []);


  return (
    <div className=" h-[10vh] min-h-[10vh]">
      <div className="bg-gray-100 px-2 sm:px-4 h-full items-center w-full flex justify-between shadow">
        <div className={` ${showSearch ? " hidden md:flex" : ""} flex items-center gap-2 `}>
          <section onClick={handle} className="sm:hidden ">
            <GiHamburgerMenu size={23} />
          </section>
          <div onClick={() => navigate("/")} className="sm:px-2 cursor-pointer  ">
            <img src={logo} alt="logo" className="" width={110} />
          </div>
        </div>
        <div className={` ${showSearch ? "hidden" : "flex"} w-[70%] justify-end md:justify-between`}>
          <div className={`  hidden md:flex gap-10 items-center`}>
            <section className=" flex items-end relative">
              <span className=" cursor-pointer flex items-end" onClick={() => {
                setman(false)
                setbestseller(false)
                setabout(false)
                setwomen(!women)
              }}><p>Women</p><IoIosArrowDown size={20} /></span>
              {women &&
                <div className=" absolute w-56 border h-auto max-h-44 top-8 z-20 bg-white shadow rounded-md text-sm cursor-pointer overflow-y-scroll">
                  {
                    category?.map((item) => { return <p onClick={() => navigate("/products", { state: { categorys: item._id } })} className=" border-b p-1 hover:bg-gray-100">{item.name}</p> })
                  }
                </div>
              }
            </section>
            <section className=" flex items-end relative">
              <span className=" cursor-pointer flex items-end" onClick={() => {
                setman(!man)
                setbestseller(false)
                setabout(false)
                setwomen(false)
              }}><p>Man</p><IoIosArrowDown size={20} /></span>
              {man &&
                <div className=" absolute w-56 border h-auto max-h-44 top-8 z-20 bg-white shadow rounded-md text-sm cursor-pointer overflow-y-scroll">
                  {
                    category?.map((item) => { return <p onClick={() => navigate("/products", { state: { categorys: item._id } })} className=" border-b p-1 hover:bg-gray-100">{item.name}</p> })
                  }
                </div>
              }
            </section>
            <section className=" flex items-end relative">
              <span className=" cursor-pointer flex items-end" onClick={() => {
                setman(false)
                setbestseller(!bestseller)
                setabout(false)
                setwomen(false)
              }}><p>Best Seller</p><IoIosArrowDown size={20} /></span>
              {bestseller &&
                <div className=" absolute w-56 border h-auto max-h-44 top-8 z-20 bg-white shadow rounded-md text-sm cursor-pointer overflow-y-scroll">
                  {
                    category?.map((item) => { return <p onClick={() => navigate("/products", { state: { categorys: item._id } })} className=" border-b p-1 hover:bg-gray-100">{item.name}</p> })
                  }
                </div>
              }
            </section>
            <section className=" flex items-end relative">
              <span className=" cursor-pointer flex items-end" onClick={() => {
                setman(false)
                setbestseller(false)
                setabout(!about)
                setwomen(false)
              }}><p>About us</p><IoIosArrowDown size={20} /></span>
              {about &&
                <div className=" absolute w-56 border h-auto max-h-44 top-8 z-20 bg-white shadow rounded-md text-sm cursor-pointer overflow-y-scroll">
                  {
                    category?.map((item) => { return <p onClick={() => navigate("/products", { state: { categorys: item._id } })} className=" border-b p-1 hover:bg-gray-100">{item.name}</p> })
                  }
                </div>
              }
            </section>
          </div>

          <div className=" ">
            <div className="flex gap-x-6 items-center">
              <section className=" cursor-pointer" onClick={() => { setshowSearch(!showSearch) }}>
                <IoMdSearch size={23} />
              </section>
              <section
                onClick={() => navigate("/profile/favorites")}
                className="cursor-pointer"
              >
                <IoIosHeartEmpty size={23} />
              </section>
              {isLogedin ? (
                <section
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer"
                >
                  <FaUserCircle size={23} />
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
                className="cursor-pointer"
              >
                <AiOutlineShoppingCart size={25} />
              </section>
            </div>
          </div>
        </div>
        <div className={` ${showSearch ? "flex" : "hidden"} w-[100%] md:w-[70%] gap-4 items-center`}>
          <div className=" w-full md:w-[70%] h-full flex items-center relative">
            <form onSubmit={handleSearch} className=" w-full">
              <input
                type="text"
                placeholder="Search for products"
                value={search}
                onChange={(e) => {
                  setsearch(e.target.value);
                }}
                className="py-[8px] w-full outline-none px-5 rounded-3xl bg-[#ffffff] text-xs"
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
          <GiCancel className=" cursor-pointer" onClick={() => { setshowSearch(!showSearch) }} size={22} />
        </div>
      </div>

      {
        <div className={` overflow-hidden absolute left-0 top-0 h-[100svh] ${nav ? "w-[90%]" : "w-0"} transition-all duration-300 ease-in-out bg-white z-40`}>
          <section className="flex justify-between my-2 px-2">
            <RxCross2 size={27} onClick={() => {
              handle()
              clearHader()
            }} className=" cursor-pointer" />
            <img src={logo} width={70} />
          </section>
          {
            !man && !women && !bestseller && !about &&
            <div className="flex flex-col gap-3 my-5">
              <span className=" cursor-pointer flex items-end justify-between px-2 font-medium" onClick={() => {
                setman(false)
                setbestseller(false)
                setabout(false)
                setwomen(!women)
              }}><p>Women</p><MdOutlineArrowForwardIos size={20} /></span>
              <span className=" cursor-pointer flex items-end justify-between px-2 font-medium" onClick={() => {
                setman(!man)
                setbestseller(false)
                setabout(false)
                setwomen(false)
              }}><p>Man</p><MdOutlineArrowForwardIos size={20} /></span>
              <span className=" cursor-pointer flex items-end justify-between px-2 font-medium" onClick={() => {
                setman(false)
                setbestseller(!bestseller)
                setabout(false)
                setwomen(false)
              }}><p>Best Seller</p><MdOutlineArrowForwardIos size={20} /></span>
              <span className=" cursor-pointer flex items-end justify-between px-2 font-medium" onClick={() => {
                setman(false)
                setbestseller(false)
                setabout(!about)
                setwomen(false)
              }}><p>About us</p><MdOutlineArrowForwardIos size={20} /></span>
            </div>
          }
          {
            man && <div className=" px-2">
              <h1 className=" font-semibold text-xl flex gap-2 items-center" onClick={clearHader}><MdOutlineArrowBackIosNew size={20} />Man</h1>
              {category?.map((item) => {
                return <p key={item._id} className=" cursor-pointer my-[4px] hover:underline">{item.name}</p>
              })}
            </div>
          }
          {
            women && <div className=" px-2">
              <h1 className=" font-semibold text-xl flex gap-2 items-center" onClick={clearHader}><MdOutlineArrowBackIosNew size={20} />Women</h1>
              {category?.map((item) => {
                return <p key={item._id} className=" cursor-pointer my-[4px] hover:underline">{item.name}</p>
              })}
            </div>
          }
          {
            bestseller && <div className=" px-2">
              <h1 className=" font-semibold text-xl flex gap-2 items-center" onClick={clearHader}><MdOutlineArrowBackIosNew size={20} />Best Seller</h1>
              {category?.map((item) => {
                return <p key={item._id} className=" cursor-pointer my-[4px] hover:underline">{item.name}</p>
              })}
            </div>
          }
          {
            about && <div className=" px-2">
              <h1 className=" font-semibold text-xl flex gap-2 items-center" onClick={clearHader}><MdOutlineArrowBackIosNew size={20} />About</h1>
              {category?.map((item) => {
                return <p key={item._id} className=" cursor-pointer my-[4px] hover:underline">{item.name}</p>
              })}
            </div>
          }
        </div>
      }
    </div>
  );
};

export default Nav;
