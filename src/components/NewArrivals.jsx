import React, { useEffect, useState } from "react";
import { getRequest } from "../utils/Apihelpers";
import { useNavigate } from "react-router-dom";
import NewArrivalSkeleton from "../skeletons/NewArrivalSkeleton";

function NewArrivals() {
  const [data, setdata] = useState([]);
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();

  const getdata = async () => {
    setloader(true);
    const { latestproducts } = await getRequest(
      false,
      "/admin/product/latestProducts"
    );
    setdata(latestproducts);
    // console.log(response);
    setloader(false);
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className=" px-3 md:px-20 my-3 flex flex-col justify-center items-center">
      <h1 className=" text-center font-bold text-3xl">NEW ARRIVALS</h1>
      <p className=" text-center font-medium">
        Shop our Latest collections to celebrate in Style
      </p>
      {loader ? (
        <NewArrivalSkeleton />
      ) : (
        <div className="grid grid-cols-3 grid-rows-3 gap-2 md:gap-5 my-5 md:px-36">
          <div className="bg-gold_medium aspect-square">
            <img
              onClick={() => navigate(`/product/${data[0]?._id}`)}
              src={data[0]?.image[0]}
              className="cursor-pointer w-full h-auto aspect-square object-cover "
            />
          </div>
          <div className="bg-gold_medium aspect-square">
            <img
              onClick={() => navigate(`/product/${data[1]?._id}`)}
              src={data[1]?.image[0]}
              className="cursor-pointer w-full h-auto aspect-square object-cover"
            />
          </div>
          <div className="bg-gold_medium aspect-square">
            <img
              onClick={() => navigate(`/product/${data[2]?._id}`)}
              src={data[2]?.image[0]}
              className="cursor-pointer w-full h-auto aspect-square object-cover"
            />
          </div>
          <div className="bg-gold_medium aspect-square ">
            <img
              onClick={() => navigate(`/product/${data[3]?._id}`)}
              src={data[3]?.image[0]}
              className="cursor-pointer w-full h-auto aspect-square object-cover"
            />
          </div>
          <div className="row-span-2 col-span-2 bg-gold_medium aspect-square ">
            <img
              onClick={() => navigate(`/product/${data[0]?._id}`)}
              src={data[0]?.image[2]}
              className="cursor-pointer w-full h-auto aspect-square object-cover"
            />
          </div>
          <div className="bg-gold_medium aspect-square">
            <img
              onClick={() => navigate(`/product/${data[1]?._id}`)}
              src={data[1]?.image[3]}
              className="cursor-pointer w-full h-auto aspect-square object-cover"
            />
          </div>
        </div>
      )}
      <button className=" text-center bg-gold_medium text-white px-4 py-[5px]">
        Shop Now
      </button>
    </div>
  );
}

export default NewArrivals;
