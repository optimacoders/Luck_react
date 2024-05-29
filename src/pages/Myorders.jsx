import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../utils/Apihelpers";
import { LuChevronRight } from "react-icons/lu";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import moment from "moment/moment";

const Myorders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { orders } = await getRequest(true, "/order/myorders");
        setOrders(orders);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleBestClick = (productId) => {
    console.log("Mark as best:", productId);
  };

  return (
    <div className="h-full overflow-y-auto px-2 py-3 md:py-0 md:px-0">
      <p className="font-semibold text-xl">Your orders</p>
      {/* <table className="w-full overflow-x-auto my-2 border">
        <thead>
          <tr>
            <th className="text-xs sm:text-md">Product Image</th>
            <th className="text-xs md:text-md">Product Name</th>
            <th className="hidden text-xs md:text-md md:block">
              Payment Status
            </th>
            <th className="text-xs md:text-md">Actions</th>
          </tr>
        </thead>
        <tbody className="border">
          {orders.map((item, index) => (
            <tr className="border p-2" key={index}>
              <td className="">
                <PhotoProvider>
                  <PhotoView src={item?.productId?.image?.[0]}>
                    <img
                      src={item?.productId?.image?.[0]}
                      className="rounded-md flex justify-center px-3 h-14 w-18 cursor-pointer"
                      alt="Product"
                    />
                  </PhotoView>
                </PhotoProvider>
              </td>
              <td className="md:text-center text-start">
                {item?.productId?.title}
              </td>
              <td className="hidden md:block">
                <div className="flex py-2 justify-center items-center">
                  <p
                    className={`${
                      item.paymentStatus === "done"
                        ? "bg-green-600 text-white"
                        : "text-black"
                    } text-center font-semibold rounded-2xl flex justify-center w-[50%]`}
                  >
                    {item.paymentStatus}
                    <RiVerifiedBadgeLine
                      className="mt-1 px-[2px]"
                      size={20}
                      color="white"
                    />
                  </p>
                </div>
              </td>
              <td>
                <button
                  onClick={() => navigate(`/profile/myorder/${item._id}`)}
                >
                  <LuChevronRight size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <div className=" flex w-[100%] overflow-x-auto gap-2 my-2">
        <section className=" border rounded-full px-2 md:px-4 font-medium py-[3px] text-xs cursor-pointer hover:border-gold_dark hover:text-gold_dark">All</section>
        <section className=" border rounded-full px-2 md:px-4 font-medium py-[3px] text-xs cursor-pointer hover:border-gold_dark hover:text-gold_dark">In progress</section>
        <section className=" border rounded-full px-2 md:px-4 font-medium py-[3px] text-xs cursor-pointer hover:border-gold_dark hover:text-gold_dark">Pending</section>
        <section className=" border rounded-full px-2 md:px-4 font-medium py-[3px] text-xs cursor-pointer hover:border-gold_dark hover:text-gold_dark">Delivered</section>
      </div>
      <div>
        {
          orders?.map((item) => {
            return <div key={item._id} className=" rounded-lg flex border pr-0 p-2 md:px-6 md:py-4">
              <div className="w-[95%]">
                <section className=" text-xs flex gap-2 mb-3 items-center">
                  <p className=" rounded-full border px-4 font-medium py-[2px]">
                    {item?.status}</p> |
                  <p className=" font-medium">{moment(item?.orderDateTime).format('D MMMM YYYY')}</p>
                </section>
                <section className=" flex items-center gap-2 md:gap-4">
                  <img src={item?.productId?.image[0]} className=" w-20 h-20 rounded-lg" />
                  <section className="">
                    <p className=" font-semibold text-xs md:text-sm text-gold_dark my-1">Order ID:{item._id}</p>
                    <p className="text-xs">{item?.productId?.title}</p>
                    <p className="text-xs md:text-sm font-medium">{item?.orderValue}</p>
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
          })
        }
      </div>
    </div>
  );
};

export default Myorders;
