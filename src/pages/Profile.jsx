import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLocationOn } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import Mainlayout from "../components/Mainlayout";
import { Outlet, useNavigate } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import Cookies from "js-cookie";
import AuthHook from "../context/AuthContext";
const Profile = () => {
  const [account, setAccount] = useState(true);
  const [address, setAddress] = useState(false);
  const [orders, setOrders] = useState(false);
  const navigate = useNavigate();
  const path = location.pathname;

  console.log(path);
  return (
    <Mainlayout isNogap={true}>
      <div className="h-[90svh]">
        <div className="md:py-4 md:p-2 p-[2px] h-full w-full bg-gray-100 shadow-lg flex flex-col md:flex-row gap-2">
          <div className="w-full md:w-[12%] h-[7vh] md:h-full">
            <p className="text-lg hidden sm:block font-semibold p-2">
              My Account
            </p>
            <div className="flex overflow-y-auto md:flex-col w-[100%] over">
              <p
                onClick={() => navigate("/profile")}
                className={`flex ${path === "/profile" ? "bg-white text-black shadow border-b-2 md:border-l-4 border-[#c9b156]" : ""
                  } font-semibold text-sm gap-x-2 w-full items-center my-1 cursor-pointer p-[7px] select-none`}
              >
                <CgProfile size={15} /> My details
              </p>
              <p
                onClick={() => navigate("/profile/orders")}
                className={`flex ${path === "/profile/orders"
                  ? "bg-white text-black shadow border-b-2 md:border-l-4 border-[#c9b156]"
                  : ""
                  } font-semibold text-sm gap-x-1 w-full my-1 items-center cursor-pointer p-[6px] select-none`}
              >
                <CiDeliveryTruck size={17} /> My orders
              </p>
              <p
                onClick={() => navigate("/profile/favorites")}
                className={`flex ${path === "/profile/favorites"
                  ? "bg-white text-black shadow border-b-2 md:border-l-4 border-[#c9b156]"
                  : ""
                  } font-semibold text-sm gap-x-1 w-full my-1 items-center cursor-pointer p-[6px] select-none`}
              >
                <MdFavoriteBorder size={17} /> Favorites
              </p>
            </div>

          </div>
          <div className="w-full h-[85vh] overflow-y-auto md:w-[88%] md:p-4 rounded-md bg-white">
            <Outlet />
          </div>
        </div>
      </div>
    </Mainlayout>
  );
};

export default Profile;
