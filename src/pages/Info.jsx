import React, { useEffect, useState } from "react";
import { getRequest, putRequest } from "../utils/Apihelpers";
import toast from "react-hot-toast";
import AuthHook from "../context/AuthContext";
import { IoMdLogOut } from "react-icons/io";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Info = () => {
  const [userdata, setUserData] = useState([]);
  const [username, setusername] = useState();
  const [mobileNo, setmobileNo] = useState();
  const [email, setemail] = useState();
  const [address, setaddress] = useState();
  const { setisLogedin, settoken, token, isLogedin } = AuthHook();
  const navigate = useNavigate("");
  const handlelogout = () => {
    console.log("ff");
    Cookies.remove("token");
    settoken("");
    setisLogedin(false);
    navigate("/");
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getRequest(true, "/auth/getuserdetails");
        setUserData(response.userdetails);
        setusername(response?.userdetails?.name);
        setmobileNo(response?.userdetails?.mobileNo);
        setemail(response?.userdetails?.email);
        setaddress(response?.userdetails?.address);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: username,
      email: email,
      mobileNo: mobileNo,
      address: address,
    };
    const response = await putRequest(true, `/auth/edituserDetails`, {
      data: data,
    });
    if (response.status) {
      toast.success("updated");
      window.location.reload();
    }
  };

  return (
    <div className="">
      <div>
        <p className="text-2xl font-bold mb-2">
          Persnol information {username}{" "}
        </p>
        <div className="w-full md:w-[60%] ">
          <form onSubmit={handlesubmit} className="flex flex-col gap-4">
            <div className="md:flex-row flex flex-col gap-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                className="p-2 outline-none rounded-md "
                placeholder="username"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="p-2 outline-none rounded-md"
                placeholder="Email"
              />
            </div>
            <div className="md:flex-row flex flex-col gap-4">
              <input
                value={mobileNo}
                onChange={(e) => setmobileNo(e.target.value)}
                type="mobie"
                className="p-2 outline-none rounded-md "
                placeholder="Mobile"
              />
              {/* <input
                type="email"
                className="p-2 outline-none rounded-md"
                placeholder="Email"
              /> */}
            </div>
            <div>
              <textarea
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                placeholder="Enter Address"
                className="p-2 w-full rounded-md resize-none border"
              ></textarea>
            </div>
            <div className="py-2 w-[30%]">
              <button className="bg-gold_dark w-full px-2 rounded-md py-1 text-white">
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-center py-2 items-end">
          <p
            onClick={() => handlelogout()}
            className="flex items-center gap-2 font-semibold absolute bottom-2 cursor-pointer select-none"
          >
            {" "}
            <IoMdLogOut size={20} /> Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;
