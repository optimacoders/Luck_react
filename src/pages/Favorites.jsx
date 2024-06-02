import React, { useEffect, useState } from "react";
import { getRequest } from "../utils/Apihelpers";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton";
import Nodata from "../components/Nodata";

function Favorites() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const getData = async () => {
    setLoader(true);
    try {
      const res = await getRequest(true, "/liked");
      if (res.status && res.favourites && res.favourites.data) {
        setData(res.favourites.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
    setLoader(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-3 overflow-y-auto h-full">
      <p className="text-lg font-medium">Your Favorites</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loader ? (
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        ) : data.length === 0 ? (
          <div className="col-span-2 md:col-span-4">
            <Nodata />
          </div>
        ) : (
          data.map((item) => (
            <div key={item._id}>
              <ProductCard data={item.product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;
