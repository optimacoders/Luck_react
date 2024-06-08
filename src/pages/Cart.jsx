import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Mainlayout from "../components/Mainlayout";
import Cartproductcard from "../components/Cartproductcard";
import { getRequest } from "../utils/Apihelpers";
import img from "../assets/logo.png";
import CartCardSkeleton from "../skeletons/CartCardSkeleton";
import AuthHook from "../context/AuthContext";
import NoCartData from "../components/NoCartData";

const Cart = () => {
  const key = import.meta.env.VITE_PAYU_KEY;
  const backend = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);
  const [address, setaddress] = useState("");
  const url = import.meta.env.VITE_BACKEND;
  const [cartLoader, setcartLoader] = useState(false);

  const { userDetails, getuser, isLogedin, token } = AuthHook();
  console.log("tt", token);
  const getUserCart = async () => {
    try {
      setcartLoader(true);
      const cart = await getRequest(true, "/cart");
      setCart(cart.cart);
      setcartLoader(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
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

  const checkout = async (event) => {
    event.preventDefault();
    if (cart?.length === 0) {
      toast.error("cart is empty, nothing to buy.");
      return;
    }
    try {
      const txnid = `txn_${Date.now()}`;
      const formData = {
        key: key,
        txnid: txnid,
        amount: totalPrice,
        productinfo: "Product Information",
        firstname: userDetails?.name,
        email: userDetails?.email,
        phone: userDetails?.mobileNo,
        surl: `${backend}/pay/payu_success`,
      };
      console.log("Success URL:", formData.surl);
      const response = await axios.post(`${url}/pay/hash`, formData);
      formData.hash = response.data.hash;

      const form = document.getElementById("payuForm");
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = formData[key];
          form.appendChild(input);
        }
      }
      form.submit();
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  useEffect(() => {
    if (!isLogedin) {
      navigate("/loginred");
    }
  }, [isLogedin]);

  return (
    <Mainlayout>
      <div className="md:px-8">
        <form
          id="payuForm"
          action="https://test.payu.in/_payment"
          method="post"
          onSubmit={checkout}
        >
          <input type="submit" value="Submit" className="hidden" />
        </form>

        <p className="my-2 font-semibold">My Cart </p>
        <div className="flex flex-col border-r-2 gap-3 md:flex-row ">
          <div className=" w-full md:w-2/3 rounded-md md:h-[75vh] bg-gray-50 p-3 overflow-y-auto">
            {cartLoader ? (
              <>
                <CartCardSkeleton />
                <CartCardSkeleton />
                <CartCardSkeleton />
              </>
            ) : cart?.length == 0 ? (
              <NoCartData />
            ) : (
              cart?.map((item, index) => (
                <Cartproductcard key={index} data={item} />
              ))
            )}
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
                {userDetails?.address}
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
                onClick={() => navigate("/products")}
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
