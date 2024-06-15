import React, { useEffect, useState } from "react";
import { getRequest } from "../utils/Apihelpers";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton";
import Nodata from "../components/Nodata";
import AuthHook from "../context/AuthContext";
import RelatedProductCard from "../components/RelatedProductCard";
import InfiniteScroll from "react-infinite-scroll-component";

function Favorites() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const { currency } = AuthHook()
  const [cureentPage, setcureentPage] = useState(1)
  const [totalPages, settotalPages] = useState()
  const [hasMore, sethasMore] = useState(false)


  const getData = async () => {
    setLoader(true);
    try {
      if (currency !== null) {
        const res = await getRequest(true, `/liked/${currency ? currency : "INR"}`);
        if (res.status && res.favourites && res.favourites.data) {
          setData(res.favourites.data);
          setcureentPage(res?.favourites?.currentPage);
          settotalPages(res?.favourites?.totalPages);
          sethasMore(res?.favourites?.moreData)
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

  const fetchMore = async () => {
    try {
      if (currency !== null) {
        const res = await getRequest(true, `/liked/${currency ? currency : "INR"}?page=${cureentPage + 1}`);
        if (res.status && res.favourites && res.favourites.data) {
          setData(prev => [...prev, ...res.favourites.data]);
          setcureentPage(res?.favourites?.currentPage);
          settotalPages(res?.favourites?.totalPages);
          sethasMore(res?.favourites?.moreData)
        } else {
          setData([]);
        }
        setLoader(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-3 overflow-y-auto h-full" id="scrollContainer">
      <p className="text-lg font-medium my-2">Your Favorites</p>
      <div className="">
        {loader ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </div>
        ) : data.length === 0 ? (
          <div className="col-span-2 md:col-span-4">
            <Nodata />
          </div>
        ) : (
          <InfiniteScroll
            dataLength={data.length}
            next={fetchMore}
            hasMore={hasMore}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            loader={
              <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </>
            }
            scrollableTarget="scrollContainer"
          >
            {data.map((item) => (
              <div key={item._id}>
                <RelatedProductCard data={item.product} />
              </div>
            ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

export default Favorites;
