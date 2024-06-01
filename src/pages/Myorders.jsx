import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../utils/Apihelpers";
import { LuChevronRight } from "react-icons/lu";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import moment from "moment/moment";
import MyorderCardSkeleton from "../skeletons/MyorderCardSkeleton";

const Myorders = () => {
  const [orders, setOrders] = useState([]);
  const [status, setstatus] = useState("");
  const [loader, setloader] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setloader(true)
      try {
        const { orders } = await getRequest(
          true,
          `/order/myorders?filter=${status}`
        );
        setOrders(orders);
        setloader(false)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [status]);

  const handleBestClick = (productId) => {
    console.log("Mark as best:", productId);
  };

  return (
    <div className="h-full overflow-y-auto px-2 py-3 md:py-0 md:px-0">
      <p className="font-semibold text-xl">Your orders</p>

      <div className=" flex w-[100%] overflow-x-auto gap-2 my-2">
        <section
          onClick={() => setstatus("")}
          className={`border ${status === "" ? "border-gold_dark text-gold_dark" : ""
            } rounded-full px-2 md:px-4 font-medium py-[3px] text-xs cursor-pointer`}
        >
          All
        </section>
        <section
          onClick={() => setstatus("Pending")}
          className={`border ${status === "Pending" ? "border-gold_dark text-gold_dark" : ""
            } rounded-full px-2 md:px-4 font-medium py-[3px] text-xs cursor-pointer hover:border-gold_dark hover:text-gold_dark`}
        >
          Pending
        </section>
        <section
          onClick={() => setstatus("Shipped")}
          className={`border ${status === "Shipped" ? "border-gold_dark text-gold_dark" : ""
            } rounded-full px-2 md:px-4 font-medium py-[3px] text-xs cursor-pointer hover:border-gold_dark hover:text-gold_dark`}
        >
          Shipped
        </section>
        <section
          onClick={() => setstatus("out")}
          className={`border ${status === "out" ? "border-gold_dark text-gold_dark" : ""
            } rounded-full px-2 md:px-4 font-medium py-[3px] text-xs cursor-pointer hover:border-gold_dark hover:text-gold_dark`}
        >
          out for Delivery
        </section>
        <section
          onClick={() => setstatus("Delivered")}
          className={`border ${status === "Delivered" ? "border-gold_dark text-gold_dark" : ""
            } rounded-full px-2 md:px-4 font-medium py-[3px] text-xs cursor-pointer hover:border-gold_dark hover:text-gold_dark`}
        >
          Delivered
        </section>
        <section
          onClick={() => setstatus("cancelled")}
          className={`border ${status === "cancelled" ? "border-gold_dark text-gold_dark" : ""
            } rounded-full px-2 md:px-4 font-medium py-[3px] text-xs cursor-pointer hover:border-gold_dark hover:text-gold_dark`}
        >
          cancelled
        </section>
      </div>
      <div>
        {loader ? <>
          <MyorderCardSkeleton />
          <MyorderCardSkeleton />
          <MyorderCardSkeleton />
          <MyorderCardSkeleton />
        </> : orders?.map((item) => {
          return (
            <div
              key={item._id}
              className=" rounded-lg flex border pr-0 p-2 md:px-6 md:py-4"
            >
              <div className="w-[95%]">
                <section className=" text-xs flex gap-2 mb-3 items-center">
                  <p className=" rounded-full border px-4 font-medium py-[2px]">
                    {item?.status}
                  </p>{" "}
                  |
                  <p className=" font-medium">
                    {moment(item?.orderDateTime).format("D MMMM YYYY")}
                  </p>
                </section>
                <section className=" flex items-center gap-2 md:gap-4">
                  <img
                    src={item?.productId?.image[0]}
                    className=" w-20 h-20 rounded-lg"
                  />
                  <section className="">
                    <p className=" font-semibold text-xs md:text-sm text-gold_dark my-1">
                      Order ID:{item._id}
                    </p>
                    <p className="text-xs">{item?.productId?.title}</p>
                    <p className="text-xs md:text-sm font-medium">
                      {item?.orderValue}
                    </p>
                  </section>
                </section>
              </div>
              <div className="w-[5%] flex items-center justify-end">
                <button
                  onClick={() => navigate(`/profile/myorder/${item._id}`)}
                >
                  <LuChevronRight size={24} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Myorders;
