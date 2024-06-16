import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../utils/Apihelpers"
import AuthHook from "../context/AuthContext";
import toast from "react-hot-toast";

const ProductCard = ({ data, fromsimilar }) => {
  const url = import.meta.env.VITE_BACKEND;
  const { currency } = AuthHook()
  const navigate = useNavigate();

  const redirect = () => {
    navigate(`/product/${data?._id}`);
  };

  return (
    <div
      className="cursor-pointer transition duration-300 ease-in-out opacity-90 p-2 hover:opacity-100 group"
      onClick={() => redirect()}
    >
      <div className="flex justify-center items-center">
        <img
          src={data?.image ? data?.image[0] : "/placeholder-image.jpg"}
          alt="Product Image"
          className="object-fill w-full aspect-square rounded"
        />
      </div>
      <div className=" flex flex-col justify-center">
        <p className="w-[100%] font-bold text-black mt-1 text-sm md:text-lg">
          {data?.title}
        </p>
        <p className="font-semibold text-sm">
          {currency} {new Intl.NumberFormat().format(data?.selling_price)}
        </p>
        <button className=" text-gold_dark rounded-xl px-4 py-[3px] font-semibold text-sm my-1 border border-gold_dark hover:bg-gold_dark hover:text-white hover:border-none">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
