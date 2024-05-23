import React from "react";

const Myaccount = () => {
  return (
    <div className="">
      <p className="font-bold">Persnal Details </p>
      <div className="w-full gap-2 ">
        <form className="">
          <section className="w-full flex gap-2 ">
            <section className="w-[30%]">
              <p className="font-semibold">Name</p>
              <input type="text" className="p-2 border-2 w-full " />
            </section>
            <section className="w-[30%]">
              <p className="font-semibold">Phone No.</p>
              <input type="text" className="p-2 border-2 w-full " />
            </section>
          </section>

          <section className="w-full flex gap-2 ">
            <section className="w-[30%]">
              <p>Email</p>
              <input type="email" className="p-2 border-2 w-full " />
            </section>
          </section>
          <button
            type="submit"
            className="bg-blue-600 my-2 cursor-pointer  text-white rounded-md p-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Myaccount;
