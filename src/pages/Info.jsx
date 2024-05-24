import React from "react";

const Info = () => {
  return (
    <div className="">
      <div>
        <p className="text-2xl font-bold mb-2">Persnol information </p>
        <div className="w-full md:w-[60%] ">
          <form className="flex flex-col gap-4">
            <div className="md:flex-row flex flex-col gap-4">
              <input
                type="text"
                className="p-2 outline-none rounded-md "
                placeholder="username"
              />
              <input
                type="email"
                className="p-2 outline-none rounded-md"
                placeholder="Email"
              />
            </div>
            <div className="md:flex-row flex flex-col gap-4">
              <input
                type="mobie"
                className="p-2 outline-none rounded-md "
                placeholder="Mobile"
              />
              <input
                type="email"
                className="p-2 outline-none rounded-md"
                placeholder="Email"
              />
            </div>
            <div>
              <textarea
                placeholder="Enter Address"
                className="p-2 w-full rounded-md resize-none border"
              ></textarea>
            </div>
            <div className="py-2 w-[30%]">
              <button className="bg-blue-600 w-full px-2 rounded-md py-1 text-white">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Info;
