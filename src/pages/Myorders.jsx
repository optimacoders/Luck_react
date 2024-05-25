import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { getRequest } from "../utils/Apihelpers";

const Myorders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const orders = await getRequest(true, "/order/myorders");
        setOrders(orders.orders);
        console.log(orders);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <p className="font-semibold text-xl">Your orders</p>
      <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2">
        {orders.map((item, index) => (
          <div
            onClick={() => navigate(`/profile/myorder/${item._id}`)}
            className="w-full grid grid-cols-1 md:grid-cols "
            key={index}
          >
            <div
              key={item._id}
              className="border-spacing-1 border border-black md:justify-between my-2 h-fit flex gap-x-3 p-2  rounded-lg"
            >
              <div
                onClick={() => navigate(`/product/${item.productId._id}`)}
                className="rounded-lg flex gap-2 cursor-pointer"
              >
                <img
                  src={item?.productId?.image}
                  className="rounded-md h-[20vh] w-[15vh]"
                />
                <div className="p-2 gap-1">
                  <p className="text-sm">{item?.productId?.title}</p>
                  <p className="text-sm font-semibold my-2">
                    ₹ {item?.productId?.selling_price}
                  </p>
                  <div className="flex flex-col md:flex-row gap-0 md:gap-3">
                    <span className="border my-2 rounded-md px-2 py-1">
                      {item?.quantity} Qty.
                    </span>
                    <span
                      className="border my-2 rounded-full w-7 h-7 px-2 py-1"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-2">
                <p className="font-semibold">Address:{item?.address}</p>
                <p className="">Mobile No.:{item?.phoneNo}</p>
                <section className="px-2 text-white flex font-semibold bg-green-700 items-center justify-center rounded-2xl">
                  {item?.status}
                </section>{" "}
                <section
                  className={`px-2 text-white flex ${
                    item.paymentStatus === "pending"
                      ? "bg-red-400"
                      : "bg-green-700"
                  } font-semibold items-center justify-center rounded-2xl`}
                >
                  Payment {item?.paymentStatus}
                </section>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myorders;
