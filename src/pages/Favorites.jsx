import React, { useEffect, useState } from "react";
import { getRequest } from "../utils/Apihelpers";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton";
import Nodata from "../components/Nodata";
import AuthHook from "../context/AuthContext";
import RelatedProductCard from "../components/RelatedProductCard";

function Favorites() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const { currency } = AuthHook()

  const getData = async () => {
    setLoader(true);
    try {
      if (currency !== null) {
        const res = await getRequest(true, `/liked/${currency ? currency : "INR"}`);
        if (res.status && res.favourites && res.favourites.data) {
          setData(res.favourites.data);
        } else {
          setData([]);
        }
        setLoader(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
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
              <RelatedProductCard data={item.product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;
