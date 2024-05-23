import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ data }) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("this is also working ");
  });

  return (
    <div
      className="border rounded-lg cursor-pointer h-full transition duration-300 ease-in-out opacity-90 hover:opacity-100"
      onClick={() => navigate(`/product/${data?._id}`)}
    >
      <div className="flex border rounded-lg   justify-center items-center">
        <img
          src={data?.image ? data?.image : "/placeholder-image.jpg"}
          alt="Product Image"
          className="object-fill w-[1000px] h-[250px] md:h-[450px]"
        />
      </div>
      <p className="mt-2 px-2 font-serif">{data?.title}</p>
      <p className="p-1 font-serif">₹ {data?.selling_price}</p>
    </div>
  );
};

export default ProductCard;
