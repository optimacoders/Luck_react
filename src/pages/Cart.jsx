import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Mainlayout from "../components/Mainlayout";
import Cartproductcard from "../components/Cartproductcard";
import { getRequest, postRequest } from "../utils/Apihelpers";
import img from "../assets/logo.png";

const Cart = () => {
  const key = import.meta.env.VITE_RAZORPAY_KEY;
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);
  const [address, setaddress] = useState("");
  const url = import.meta.env.VITE_BACKEND;

  const getUserCart = async () => {
    try {
      const cart = await getRequest(true, "/cart");
      setCart(cart.cart);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const loadRazorpayScript = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.id = "razorpay-checkout-js";
      document.body.appendChild(script);
    };

    loadRazorpayScript();

    getUserCart();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  const calculateTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item?.product?.selling_price * item.quantity;
    });
    setTotalPrice(total);
  };

  const checkout = async () => {
    try {
      const { data } = await axios.post(`${url}/payment/checkout`, {
        amount: totalPrice,
      });
      console.log(data.order);
      const options = {
        key: key,
        amount: data.order.amount,
        currency: "INR",
        name: "optima",
        description: "Test Transaction",
        image: img,
        order_id: data.order.id,
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id } = response;
          try {
            const response = await postRequest(true, "/order/create", {
              address: "dd",
              phoneNo: "7894561234",
              orderValue: totalPrice,
              razorpay_order_id,
              razorpay_payment_id,
              paymentStatus: "done",
            });
            if (response.status) {
              toast.success("Order successfully created");
              getUserCart();
            }
          } catch (error) {
            console.error("Error creating order:", error);
          }
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#E30B5C",
        },
      };
      const rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <Mainlayout >
      <script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="md:px-8">
        <p className="my-2 font-semibold">My Cart </p>
        <div className="flex flex-col border-r-2 gap-3 md:flex-row ">
          <div className=" w-full md:w-2/3 rounded-md md:h-[75vh] bg-gray-50 p-3 overflow-y-auto">
            {cart.map((item, index) => (
              <Cartproductcard key={index} data={item} />
            ))}
          </div>
          <div className="w-full md:w-1/3 rounded-md bg-gray-50 p-4  ">
            <p className="font-semibold my-2 pb-2 border-b-2 border-dashed">
              Delivery
            </p>
            <div className="flex flex-col gap-y-2 pb-2 border-b-2 border-dashed">
              <section className="flex justify-between">
                <p>Subtotal</p>
                <p>₹ {totalPrice}</p>
              </section>
              <section className="flex justify-between">
                <p>Delivery</p>
                <p>₹ 000</p>
              </section>
              <section className="flex justify-between">
                <p>Tax</p>
                <p>₹ 000</p>
              </section>
            </div>
            <section className="flex my-2 justify-between">
              <p className="text-lg">Total</p>
              <p>₹ {totalPrice}</p>
            </section>
            <div className="py-2">
              <section className="flex justify-between">
                <p className=" font-semibold py-1">Address</p>
                <p
                  onClick={() => navigate("/profile")}
                  className=" font-semibold py-1 cursor-pointer text-blue-600"
                >
                  Change
                </p>
              </section>
              <section className="p-2 w-full border-2 rounded-md">
                sdsf ada
              </section>
            </div>
            <div>
              <button
                onClick={checkout}
                className="bg-gold_dark w-full text-white px-3 py-3 font-semibold rounded-lg"
              >
                Proceed to checkout
              </button>
              <button
                onClick={() => router.push("/")}
                className=" mt-2 w-full border px-3 py-3 font-semibold rounded-lg"
              >
                Continue shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </Mainlayout>
  );
};

export default Cart;
