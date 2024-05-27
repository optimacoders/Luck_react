import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLocationOn } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import Mainlayout from "../components/Mainlayout";
import { Outlet, useNavigate } from "react-router-dom";
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
        <div className="md:p-4 p-2 h-full gap-2 bg-gray-100 flex flex-col md:flex-row gap-x-4">
          <div className="w-full md:w-[12%] h-[10vh] md:h-full">
            <p className="text-lg hidden sm:block font-semibold p-2">
              My Account
            </p>
            <div className="flex overflow-y-auto md:flex-col w-[90%] over">
              <p
                onClick={() => navigate("/profile")}
                className={`flex ${path === "/profile" ? "bg-gold_primary text-white rounded-md" : ""
                  } font-semibold gap-x-1 text-sm w-full items-center cursor-pointer p-[6px] select-none`}
              >
                <CgProfile size={15} /> My details
              </p>
              <p
                onClick={() => navigate("/profile/orders")}
                className={`flex ${path === "/profile/orders"
                  ? "border-b "
                  : ""
                  } font-semibold text-sm gap-x-1 w-full items-center cursor-pointer p-[6px] select-none`}
              >
                <CiDeliveryTruck size={17} /> My orders
              </p>
            </div>

          </div>
          <div className="w-full h-[85vh] overflow-y-auto md:w-[85%] md:p-4 rounded-md bg-white border">
            <Outlet />
          </div>
        </div>
      </div>
    </Mainlayout>
  );
};

export default Profile;
