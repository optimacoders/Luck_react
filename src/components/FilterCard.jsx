import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdFilterList } from "react-icons/md";

const FilterCard = ({
  oncolorselect,
  mycolor,
  onPriceSelect,
  onSort,
  category
}) => {
  const url = import.meta.env.VITE_BACKEND;
  const [color, setcolor] = useState([]);
  const [selectedcolor, setselectedcolor] = useState("");
  const [priceFilter, setpriceFilter] = useState(false);
  const [colorFilter, setcolorFilter] = useState(false);
  const [fabricFilter, setfabricFilter] = useState(false);
  const [filternav, setfilternav] = useState(false);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setpriceFilter(false);
      setcolorFilter(false);
      setfabricFilter(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clearHader = () => {
    setcolorFilter(false);
    setpriceFilter(false);
    setfabricFilter(false);
  };

  const getcolors = async () => {
    try {
      const { data } = await axios.get(`${url}/admin/color`);
      setcolor(data.response.data);
      console.log(data.response.data);
    } catch (error) {
      console.error("Error fetching :", error);
    }
  };

  const handlecolorselect = (colorCode) => {
    if (selectedcolor === colorCode) {
      setselectedcolor("");
      oncolorselect("");
    } else {
      setselectedcolor(colorCode);
      oncolorselect(colorCode);
    }
  };

  const applyPriceFilter = () => {
    onPriceSelect(priceFrom, priceTo);
  };
  const clearPriceFilter = () => {
    setPriceFrom("");
    setPriceTo("");
    onPriceSelect(priceFrom, priceTo);
  };

  const handleSortChange = (e) => {
    onSort(e.target.value);
    console.log("Selected sort option:", e.target.value);
  };
  useEffect(() => {
    getcolors();
  }, []);

  return (
    <div className="border-r p-2 w-full h-full md:px-6" ref={dropdownRef}>
      {
        category !== null && category !== undefined && category !== "" && <h1 className=" font-semibold">{category}</h1>
      }
      <div className="flex items-center justify-between">
        <section className=" flex gap-4 items-end">
          <p className=" text-start font-semibold hidden md:block ">FILTER:</p>
          <p
            onClick={() => setfilternav(!filternav)}
            className=" flex items-center gap-1 text-start font-semibold md:hidden cursor-pointer "
          >
            <MdFilterList size={18} />
            Filter & Sorts
          </p>

          <div className=" hidden md:flex items-center gap-5">
            <div className=" relative">
              <span
                onClick={() => {
                  setpriceFilter(!priceFilter);
                  setcolorFilter(false);
                  setfabricFilter(false);
                }}
                className={` cursor-pointer flex items-end text-sm ${priceFilter ? "text-black font-medium" : "text-gray-600"
                  }`}
              >
                Price
                <IoIosArrowDown size={20} />
              </span>
              {priceFilter && (
                <div className="absolute w-48 text-sm bg-gray-100 z-30 p-2 top-8">
                  <h1 className="border-b py-1">Select price range</h1>
                  <section className="flex gap-1 my-2">
                    <input
                      type="number"
                      value={priceFrom}
                      onChange={(e) => setPriceFrom(e.target.value)}
                      placeholder="From"
                      className="w-[50%] focus:outline-none focus:border p-1"
                    />
                    <input
                      type="number"
                      value={priceTo}
                      onChange={(e) => setPriceTo(e.target.value)}
                      placeholder="To"
                      className="w-[50%] focus:outline-none focus:border p-1"
                    />
                  </section>
                  <button
                    onClick={applyPriceFilter}
                    className="bg-blue-500 text-white py-1 px-2 mt-2 rounded"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
            <div className=" relative">
              <span
                onClick={() => {
                  setcolorFilter(!colorFilter);
                  setpriceFilter(false);
                  setfabricFilter(false);
                }}
                className={` cursor-pointer flex items-end text-sm ${colorFilter ? "text-black font-medium" : "text-gray-600"
                  }`}
              >
                Colour
                <IoIosArrowDown size={20} />
              </span>
              {colorFilter && (
                <div className=" absolute w-48 text-sm bg-gray-100 z-30 p-2 top-8">
                  <h1 className=" border-b py-1">select color</h1>
                  {color?.map((item, index) => (
                    <div key={index} className="flex justify-between gap-x-3">
                      <div className="flex gap-x-2">
                        <section
                          className="h-4 w-4 my-1 flex "
                          style={{ backgroundColor: item?.colorCode }}
                        ></section>
                        <p>{item?.name}</p>
                      </div>

                      <input
                        checked={selectedcolor === item?.name}
                        onChange={() => handlecolorselect(item?.name)}
                        type="checkbox"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* <div className=" relative">
              <span
                onClick={() => {
                  setcolorFilter(false);
                  setpriceFilter(false);
                  setfabricFilter(!fabricFilter);
                }}
                className={` cursor-pointer flex items-end text-sm ${
                  fabricFilter ? "text-black font-medium" : "text-gray-600"
                }`}
              >
                Fabric
                <IoIosArrowDown size={20} />
              </span>
              {fabricFilter && (
                <div className=" absolute w-48 text-sm bg-gray-100 z-30 p-2 top-8">
                  <h1 className=" border-b py-1">select Fabric</h1>
                </div>
              )}
            </div> */}
          </div>
        </section>
        <section className=" flex gap-2 items-center">
          <span className=" hidden md:flex rounded-md items-center gap-1">
            <FaFilter />
            Sort By:
            <select
              className="focus:outline-none rounded-md focus:border-black border px-2 py-[4px]"
              onChange={handleSortChange}
            >
              <option value="price_low_to_high">Price low to high</option>
              <option value="price_high_to_low">Price high to low</option>
              <option value="a_to_z">A to Z</option>
            </select>
          </span>
          {/* <p className=" text-gray-600">244 products</p> */}
        </section>
      </div>

      <div
        className={` overflow-hidden absolute right-0 top-0 h-[100svh] ${filternav ? "w-[90%]" : "w-0"
          } transition-all duration-300 ease-in-out bg-white z-40`}
      >
        <section className="flex justify-between my-2 px-2 border-b py-2 h-[7svh]">
          <p className=" font-medium">Filter And Sorts</p>
          <RxCross2
            size={23}
            onClick={() => {
              setfilternav(!filternav);
              clearHader();
            }}
            className=" cursor-pointer"
          />
        </section>
        <div className=" h-[80svh]">
          {!colorFilter && !priceFilter && !fabricFilter && (
            <div className="flex flex-col gap-3 my-5">
              <span
                className=" cursor-pointer flex items-end justify-between px-2"
                onClick={() => {
                  setcolorFilter(false);
                  setfabricFilter(false);
                  setpriceFilter(!priceFilter);
                }}
              >
                <p>Price Filter</p>
                <MdOutlineArrowForwardIos size={20} color="gray" />
              </span>
              <span
                className=" cursor-pointer flex items-end justify-between px-2 "
                onClick={() => {
                  setcolorFilter(!colorFilter);
                  setfabricFilter(false);
                  setpriceFilter(false);
                }}
              >
                <p>Color</p>
                <MdOutlineArrowForwardIos size={20} color="gray" />
              </span>
              {/* <span
                className=" cursor-pointer flex items-end justify-between px-2 "
                onClick={() => {
                  setcolorFilter(false);
                  setfabricFilter(!fabricFilter);
                  setpriceFilter(false);
                }}
              >
                <p>Fabric</p>
                <MdOutlineArrowForwardIos size={20} color="gray" />
              </span> */}
            </div>
          )}
          {priceFilter && (
            <div className=" px-2">
              <h1
                className=" font-semibold flex gap-2 items-center text-sm cursor-pointer"
                onClick={clearHader}
              >
                <MdOutlineArrowBackIosNew size={18} />
                Price Filter
              </h1>
              <section className=" flex gap-1 my-2">
                <input
                  type="number"
                  value={priceFrom}
                  onChange={(e) => setPriceFrom(e.target.value)}
                  placeholder=" from"
                  className="w-[50%] rounded focus:outline-none focus:border-black p-1 border"
                />
                <input
                  type="number"
                  value={priceTo}
                  onChange={(e) => setPriceTo(e.target.value)}
                  placeholder=" to"
                  className="w-[50%] rounded focus:outline-none focus:border-black p-1 border"
                />
              </section>
              <div className=" flex items-center sticky bottom-0 gap-6  p-2 ">
                <button
                  onClick={clearPriceFilter}
                  className=" border border-gold_dark text-gold_dark px-6 py-1 text-sm rounded"
                >
                  Clear
                </button>
                <button
                  onClick={applyPriceFilter}
                  className=" bg-gold_dark text-white px-6 text-sm py-1 rounded"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
          {colorFilter && (
            <div className=" px-2">
              <h1
                className=" font-semibold flex gap-3 my-2 items-center text-sm cursor-pointer"
                onClick={clearHader}
              >
                <MdOutlineArrowBackIosNew size={18} />
                Color {selectedcolor}
              </h1>
              {color?.map((item, index) => (
                <div key={index} className="flex justify-between gap-x-3">
                  <div className="flex gap-x-2">
                    <section
                      className="h-4 w-4 my-2 flex "
                      style={{ backgroundColor: item?.colorCode }}
                    ></section>
                    <p>{item?.name}</p>
                  </div>

                  <input
                    checked={selectedcolor === item?.name}
                    onChange={() => handlecolorselect(item?.name)}
                    type="checkbox"
                  />
                </div>
              ))}
            </div>
          )}
          {/* {fabricFilter && (
            <div className=" px-2">
              <h1
                className=" font-semibold flex gap-2 items-center text-sm cursor-pointer"
                onClick={clearHader}
              >
                <MdOutlineArrowBackIosNew size={18} />
                Fabric
              </h1>
            </div>
          )} */}
        </div>
        {/* <div className=" flex items-center justify-center gap-6 border-t p-2 ">
          <button className=" border border-gold_dark text-gold_dark px-6 py-1 text-sm rounded">
            Clear
          </button>
          <button className=" bg-gold_dark text-white px-6 text-sm py-1 rounded">
            Apply
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default FilterCard;
