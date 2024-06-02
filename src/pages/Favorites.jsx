import React, { useEffect, useState } from "react";
import { getRequest } from "../utils/Apihelpers";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton";

function Favorites() {
  const [data, setdata] = useState();
  const [loader, setloader] = useState(false);

  const getdata = async () => {
    setloader(true);
    const res = await getRequest(true, "/liked");
    if (res.status) {
      setdata(res.favourites?.data);
    }
    setloader(false);
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className=" p-3 overflow-y-auto h-full">
      <p className=" text-lg font-medium">Your Favorites</p>
      <div className=" grid grid-cols-2 md:grid-cols-4">
        {loader ? (
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        ) : (
          data?.map((item) => {
            return (
              <div key={item._id}>
                <ProductCard data={item.product} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Favorites;
