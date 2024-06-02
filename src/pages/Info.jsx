import React, { useEffect, useState } from "react";
import { getRequest, putRequest } from "../utils/Apihelpers";
import toast from "react-hot-toast";
import AuthHook from "../context/AuthContext";
import { IoMdLogOut } from "react-icons/io";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import ProfileSkeleton from "../skeletons/ProfileSkeleton";

const Info = () => {
  const [userdata, setUserData] = useState([]);
  const [username, setusername] = useState();
  const [mobileNo, setmobileNo] = useState();
  const [email, setemail] = useState();
  const [address, setaddress] = useState();
  const { setisLogedin, settoken, token, isLogedin } = AuthHook();
  const navigate = useNavigate("");
  const [loader, setloader] = useState(false)

  const handlelogout = () => {
    Cookies.remove("token");
    settoken("");
    setisLogedin(false);
    navigate("/");
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setloader(true)
        const response = await getRequest(true, "/auth/getuserdetails");
        setUserData(response.userdetails);
        setusername(response?.userdetails?.name);
        setmobileNo(response?.userdetails?.mobileNo);
        setemail(response?.userdetails?.email);
        setaddress(response?.userdetails?.address);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setloader(false)
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

    <div className=" w-full">
      {
        loader ? <ProfileSkeleton /> : <div>
          <section className=" flex gap-5 items-center bg-gradient-to-b from-[#d7e394] via-[#d7e394] to-[#ffffff] p-4 rounded-md">
            <p className=" rounded-full p-2 bg-gray-50 shadow">
              <IoShieldCheckmarkSharp size={50} color="#d1bf6a" />
            </p>
            <section>
              <p className=" text-md md:text-3xl font-bold">
                Personal Information</p>
              <span className="text-sm font-medium text-gray-700">
                street sign, an arrangement of buildings on a city block, or styles of clothing.
              </span>
            </section>
          </section>
          <div className="w-full my-1 px-2 md:px-0">
            <form onSubmit={handlesubmit} className="flex flex-col gap-2 w-[100%]">
              <div className="w-[100%] flex flex-col md:flex-row items-center gap-3">
                <section className=" w-full md:w-[50%]">
                  <label className=" text-sm text-gray-600 font-medium">Name:</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    className=" px-2 my-1 py-[4px] outline-none rounded border w-[100%]"
                    placeholder="username"
                  />
                </section>
                <section className=" w-full md:w-[50%]">
                  <label className=" text-sm text-gray-600 font-medium">Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className="outline-none my-1 border rounded w-[100%] px-2 py-[4px]"
                    placeholder="Email"
                  />
                </section>
              </div>
              <div className="w-[100%] flex flex-col md:flex-row  items-center gap-3">
                <section className=" w-full md:w-[50%]">
                  <label className=" text-sm text-gray-600 font-medium">Mobile No:</label>
                  <input
                    value={mobileNo}
                    onChange={(e) => setmobileNo(e.target.value)}
                    type="mobie"
                    className="outline-none my-1 border rounded w-[100%] px-2 py-[4px]"
                    placeholder="Mobile"
                  />
                </section>

              </div>
              <div>
                <label className=" text-sm text-gray-600 font-medium">Address:</label>
                <textarea
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                  placeholder="Enter Address"
                  className="p-2 w-full rounded-md resize-none border my-1 focus:outline-none focus:border-black"
                ></textarea>
              </div>
              <div className=" w-20 flex gap-3">
                <button className="bg-gold_dark w-full text-sm px-5 rounded-md py-1 text-white">
                  Save
                </button>
                <button onClick={(e) => { e.preventDefault(); handlelogout() }} className="bg-gold_dark w-full flex items-center font-semibold text-sm px-2  rounded-md py-1 text-white">
                  <IoMdLogOut size={17} /> Logout
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  );
};

export default Info;
