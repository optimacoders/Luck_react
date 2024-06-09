import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { postRequest } from "../utils/Apihelpers"
import AuthHook from "../context/AuthContext";
import toast from "react-hot-toast";

const ProductCard = ({ data, fromsimilar }) => {
  const url = import.meta.env.VITE_BACKEND;
  const { userDetails, favourites, setfavourites } = AuthHook()
  const navigate = useNavigate();

  const redirect = () => {
    navigate(`/product/${data?._id}`);
  };

  const addToFavorite = async () => {
    console.log(data._id);
    try {
      const res = await postRequest(true, `/liked`, { productId: data._id });
      if (res.status) {
        setfavourites(prevFavourites => [...prevFavourites, data._id]);
        toast.success(res.message)
      }
    }
    catch (err) {
      toast.error(err.response.data.message)
    }
  }
  const removeToFavorite = async () => {
    console.log(data._id);
    try {
      const res = await postRequest(true, `/liked/remove`, { productId: data._id });
      if (res.status) {
        setfavourites(prevFavourites => prevFavourites.filter(id => id !== data._id));
        toast.success(res.message)
      }
    }
    catch (err) {
      toast.error(err.response.data.message)
    }
  }

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
      <div className=" flex flex-col justify-center items-center">
        <p className="w-[100%] font-bold text-black text-center md:text-lg">
          {data?.title}
        </p>
        <p className="font-bold">
          ₹ {data?.selling_price}
        </p>
        <button className=" text-gold_dark rounded-xl px-4 py-[3px] font-semibold text-sm my-1 border border-gold_dark hover:bg-gold_dark hover:text-white hover:border-none">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
