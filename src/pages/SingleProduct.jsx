import React, { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import Mainlayout from "../components/Mainlayout";

const SingleProduct = () => {
  const id = useParams();
  const url = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();

  console.log(id);
  const [product, setProduct] = useState([]);
  const [colors, setcolors] = useState([]);
  const [sizes, setsizes] = useState([]);
  const [size, setsize] = useState("");
  const [color, setcolor] = useState("");
  const [qunatity, setquantity] = useState(1);

  const add = () => {
    setquantity(qunatity + 1);
  };
  const remove = () => {
    setquantity((quantity) => quantity - 1);
  };
  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`${url}/admin/product/${id.id}`);
      setProduct(data.products);
      setcolors(data.products.color);
      setsizes(data.products.size);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addtoCart = async (sign, pid) => {
    console.log(pid);
    try {
      const { data } = await axios.post(`${url}/cart`, {
        userId: "662b7dd174655c5c359f478e",
        productId: pid,
        quantity: qunatity,
        size: size,
        color: color,
      });
      if (data.status) {
        if (sign === "isbuy") {
          navigate("/cart");
        } else {
          toast.success(data.message);
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const colorOptions = Array.from(
    { length: product.color },
    (_, index) => index + 1
  );

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div>
      <Mainlayout>
        <div className=" grid pb-5 grid-cols-1 md:grid-cols-2">
          <div className=" p-4 flex justify-center w-full  grid-cols-2">
            <img
              src={product?.image}
              alt="image"
              className=" object-fill h-[500px] w-[500px] rounded-xl  "
            />
          </div>
          <div className=" py-4 w-full px-10">
            <p className=" font-semibold text-xl md:text-2xl ">
              {product?.title}
            </p>
            <p className="py-2 border-b-2  ">{product?.description}</p>
            <p className="font-eemibold border-b-1 py-2 text-md font-semibold line-clamp-4">
              Rs. {product?.selling_price}
            </p>
            <div className=" py-4 border-b-2 ">
              <p className="font-semibold my-1 text-lg">Choose a Size</p>
              <div className="w-full border-b-1  gap-2 overflow-x-auto flex cursor-pointer">
                <div className="w-full gap-2 overflow-x-auto flex cursor-pointer">
                  {sizes?.map((item, index) => (
                    <div
                      onClick={() => setsize(item)}
                      onDoubleClick={() => setsize(null)}
                      key={index}
                      className={`px-3 rounded-md py-1 border-2 ${size == item ? "border-blue-500" : ""
                        }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="py-4 border-b-2">
              <p className="font-semibold  text-lg">Choose a Color</p>
              <div className="flex gap-x-3 w-full  gap-2 overflow-x-auto  cursor-pointer">
                {colors?.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => setcolor(color)}
                    onDoubleClick={() => setcolor(null)}
                    className={`${color == color ? "border-blue-500" : ""
                      }px-2 w-8 h-8  py-2 border-2 rounded-full`}
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>

            <div className="p-2 flex bg-gray-100 rounded-3xl my-4 items-center w-fit gap-5 px-4">
              <section className="">
                <GoPlus onClick={() => add()} size={24} />
              </section>
              <section>{qunatity}</section>
              <section>
                <FiMinus onClick={() => remove()} size={24} />
              </section>
            </div>

            <div className="hidden md:block my-2 ">
              <div className="flex gap-2  ">
                <div>
                  <button
                    onClick={() => addtoCart("isbuy", product?._id)}
                    className="px-6 py-2 font-semibold rounded-full text-white bg-gold_medium"
                  >
                    Buy Now
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => addtoCart(product?._id)}
                    className="px-6 py-2 font-semibold rounded-full text-gold_medium border"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <span className="py-4">
              <p className="text-lg my-4 ">Share</p>
              <FaLink size={23} color="pink" className=" cursor-pointer" />
            </span>

            <div className="mt-4">
              <p className="font-semibold ">PRODUCT DETAILS </p>
              <p>Mirror work detail</p>
              <p></p>
            </div>
          </div>
        </div>
      </Mainlayout>
      <div className=" md:hidden w-full sticky bottom-0 z-5 ">
        <div className="flex w-full ">
          <section
            onClick={() => addtoCart(product?._id)}
            className=" border-r-2 bg-[#dacd7f]  gap-x-2 font-semibold text-white  py-4 w-[50%] flex items-center justify-center"
          >
            <FaCartPlus size={25} />
            Add to Cart
          </section>
          <section
            onClick={() => addtoCart("isbuy", product?._id)}
            className=" border-r-2  bg-white font-semibold  gap-x-2  py-4 w-[50%] flex items-center justify-center"
          >
            {" "}
            <FaRegHeart size={25} />
            Buy Now
          </section>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
