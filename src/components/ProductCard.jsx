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
    window.location.reload();
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
      className="cursor-pointer h-full transition duration-300 ease-in-out opacity-90 p-2 hover:opacity-100 rounded-lg group"
      onClick={() => redirect()}
    >
      <div className="flex justify-center items-center relative">
        <img
          src={data?.image ? data?.image[0] : "/placeholder-image.jpg"}
          alt="Product Image"
          className="object-fill w-full aspect-square rounded-lg"
        />
        <section className=" bg-white rounded-full p-1 absolute top-4 right-5 md:right-2 md:top-2 hidden group-hover:block">
          {favourites?.includes(data._id) ? (
            <MdFavorite
              size={20}
              onClick={(e) => {
                e.stopPropagation();
                removeToFavorite();
              }}
            />
          ) : (
            <MdFavoriteBorder
              size={20}
              onClick={(e) => {
                e.stopPropagation();
                addToFavorite();
              }}
            />
          )}

        </section>
      </div>
      <div>
        <p className="w-[100%] text-sm font-semibold flex justify-start line-clamp-1 text-black mt-2">
          {data?.title}
        </p>
        <section className="flex my-1 justify-between items-center">
          <p className="text-sm text-gray-700 font-semibold">
            ₹ {data?.selling_price}
          </p>
          <p className=" text-xs text-gray-700 font-semibold">
            {data?.category?.name}
          </p>
        </section>
        <button className=" text-gray-600 rounded-full px-4 py-[3px] font-semibold text-xs my-1 border border-gray-500 hover:bg-gold_dark hover:text-white hover:border-none">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
