import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "../utils/Apihelpers";
import { CiDeliveryTruck } from "react-icons/ci";
import { TbPointFilled } from "react-icons/tb";

const Singleorder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState();

  const getorder = async () => {
    try {
      const response = await getRequest(true, `/order/myorder/${id}`);
      setOrder(response.order);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    getorder();
  }, [id]);

  return (
    <div>
      {order?.userId}
      <div className="p-4">
        <p>Estimated</p>
        <p className="font-bold text-2xl">Friday,15 sep</p>
        <div className="my-4">
          <p className="flex gap-1 items-center font-semibold">
            <CiDeliveryTruck size={24} /> Delivery by Lucknowi Arts
          </p>
          <div className="flex my-2">
            <section>
              <TbPointFilled color="blue" size={24} />
              <div className="px-[10px]">
                <section className="h-[10vh] border-l-2 border-blue-500"></section>
              </div>    
            </section>
            <section className="font-semibold">
                Order Recived
            </section>
          </div>

          <div>
            <TbPointFilled color="blue" size={24} />
            <div className="px-[10px]">
              <section className="h-[10vh] border-l-2 border-blue-500"></section>
            </div>
          </div>

          <div>
            <TbPointFilled color="blue" size={24} />
            <div className="px-[10px]">
              <section className="h-[10vh] border-l-2 border-blue-500"></section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singleorder;
