import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../utils/Apihelpers";

const Cartproductcard = ({ data }) => {
  const url = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(data.quantity);
  console.log("bg " - data);
  const quantityOptions = Array.from(
    { length: data?.product?.quantity },
    (_, index) => index + 1
  );

  const removeProduct = async (pid) => {
    try {
      const response = await postRequest(true, `/cart/${pid}`);
      if (response.status) {
        toast.success("Product removed successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const editCart = async (pid, quantity) => {
    try {
      const response = await postRequest(true, `/cart/${pid}`, {
        quantity: quantity,
      });
      if (response.status) {
        toast.success("updated");
        window.location.reload();
      }
    } catch (error) { }
  };

  return (
    <div className="grid my-2 h-fit w-auto grid-cols-[150px,1fr] gap-x-3 p-2 border-b rounded-lg">
      <div
        onClick={() => router.push(`/product/${data?.product._id}`)}
        className="rounded-lg"
      >
        <img
          src={data?.product?.image?.[0]}
          className="rounded-md h-[20vh] w-[15vh]"
        />
      </div>
      <div className="p-2 gap-1 ">
        <p className="text-sm ">{data?.product?.title}</p>
        <p className="text-sm font-semibold my-2  ">
          ₹ {data?.product?.selling_price}
        </p>
        <div className="flex gap-3">
          <span className="border my-2 rounded-md  px-2 py-1">
            {data?.size}
          </span>
          <span
            className="border my-2 rounded-full w-7 h-7 px-2 py-1"
            style={{ backgroundColor: data.color }}
          />
        </div>
        <div className="flex w-full flex-col md:flex-row gap-2 items-center md:justify-between">
          <section className="flex w-full md:w-[30%]">
            <p>Oty.</p>
            <select
              onChange={(e) => editCart(data?.product?._id, e.target.value)}
              value={quantity}
              className="px-4 border rounded-md"
            >
              {quantityOptions.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </section>
          <section className="flex ">
            <p className="flex gap-1 cursor-pointer  text text-[#5072A7]">
              Save <CiHeart size={20} className="mt-1" /> |
            </p>

            <p
              onClick={() => removeProduct(data?.product?._id)}
              className="flex justify-center gap-1 items-center cursor-pointer text-[#5072A7]"
            >
              Remove <IoMdRemoveCircleOutline size={17} className="" />
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cartproductcard;
