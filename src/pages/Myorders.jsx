import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../utils/Apihelpers";
import { LuChevronRight } from "react-icons/lu";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

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
    <div className="h-[90vh] overflow-y-auto">
      <p className="font-semibold text-xl">Your orders</p>
      <table className="w-full overflow-x-auto my-2 border">
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
      </table>
    </div>
  );
};

export default Myorders;
