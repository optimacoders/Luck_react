import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ data }) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("this is also working", data);
  }, []);

  const redirect = () => {
    navigate(`/product/${data?._id}`);
    window.location.reload();
  };

  return (
    <div
      className="cursor-pointer h-full transition duration-300 ease-in-out opacity-90 p-2 hover:opacity-100 rounded-lg"
      onClick={() => redirect()}
    >
      <div className="flex justify-center items-center">
        <img
          src={data?.image ? data?.image : "/placeholder-image.jpg"}
          alt="Product Image"
          className="object-fill aspect-square rounded-lg"
        />
      </div>
      <div>
        <p className="w-[100%] font-semibold flex justify-start line-clamp-1 text-black mt-2">
          {data?.title}
        </p>
        <section className="flex my-1 justify-between items-center">
          <p className="text-sm text-gray-800 font-semibold">
            ₹ {data?.selling_price}
          </p>
          <p className=" text-sm text-gray-800 font-semibold">
            {data?.category?.name}
          </p>
        </section>
        <button className=" rounded-full px-4 py-[3px] font-semibold text-sm my-1 border-gray-500 hover:bg-gold_dark hover:text-white hover:border-none">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
