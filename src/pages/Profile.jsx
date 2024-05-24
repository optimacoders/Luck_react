import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLocationOn } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import Mainlayout from "../components/Mainlayout";
import { Outlet, useNavigate } from "react-router-dom";

const Profile = () => {
  const [account, setAccount] = useState(true);
  const [address, setAddress] = useState(false);
  const [orders, setOrders] = useState(false);
  const navigate = useNavigate();

  return (
    <Mainlayout isNogap={true}>
      <div className="h-full">
        <div className="md:p-4 p-2 h-full gap-2 bg-gray-100 flex flex-col md:flex-row gap-x-6">
          <div className="w-full md:w-[15%] h-[10vh] md:h-full">
            <p className="text-2xl hidden sm:block font-semibold p-2">
              My Account
            </p>
            <div className="flex overflow-y-auto md:flex-col w-[90%] over">
              <p
                onClick={() => navigate("/profile")}
                className={`flex ${
                  account ? "bg-[#e3db94] text-white" : "text-yellow-400"
                } font-semibold rounded-lg gap-x-2 w-full items-center cursor-pointer p-2 select-none`}
              >
                <CgProfile size={20} /> My details
              </p>
              <p
                onClick={() => navigate("/")}
                className={`flex ${
                  address ? "bg-[#e3db94] text-white" : "text-[#e3db94]"
                } font-semibold rounded-lg gap-x-2 w-full items-center cursor-pointer p-2 select-none`}
              >
                <MdOutlineLocationOn size={20} /> My address
              </p>
              <p
                onClick={() => navigate("/profile/orders")}
                className={`flex ${
                  orders ? "bg-[#e3db94] text-white" : "text-[#e3db94]"
                } font-semibold rounded-lg gap-x-2 w-full items-center cursor-pointer p-2 select-none`}
              >
                <CiDeliveryTruck size={20} /> My orders
              </p>
            </div>
          </div>
          <div className="w-full md:w-[85%] md:p-4 rounded-md bg-white">
            <Outlet />
          </div>
        </div>
      </div>
    </Mainlayout>
  );
};

export default Profile;
