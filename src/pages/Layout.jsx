import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Side from "../components/Corousel";
import Category from "../components/Category";
import FeedProduct from "../components/FeedProduct";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom"
import NewArrivals from "../components/NewArrivals";
import ReviewCard from "../components/ReviewCard";
import axios from "axios";
import { getRequest } from "../utils/Apihelpers";

const Layout = () => {
  const [reviews, setreviews] = useState([])
  const navigate = useNavigate();

  const fetchreviews = async () => {
    try {
      const response = await getRequest(false, "/review/websiteReviews");
      // console.log(response);
      setreviews(response)

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchreviews()
  }, [])


  return (
    <div className="h-[100vh]">
      <Nav />
      <div className="h-[90vh]">
        <Side />
        <div className="w-full">
          <Category />
        </div>
        <section className=" w-full">
          <NewArrivals />
        </section>
        <section className=" my-5">
          <p className=" text-3xl font-bold text-center">Recently Viewed</p>
          <p className=" text-center font-semibold mb-8">We saw you Liked it!</p>
          <FeedProduct />
        </section>
        <section className=" mb-5 mt-10">
          <p className=" text-center text-3xl font-bold my-5">Testimonials</p>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 px-2 md:px-20">
            {
              reviews?.map((item) => {
                return <ReviewCard key={item._id} data={item} />
              })
            }
          </div>
        </section>
        <section>

          <div className="flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center">Join Our Newsletter</h2>
            <p className="mt-2 text-center">Sign up to get best deals, first look and more!</p>
            <div className="mt-6 flex w-full max-w-md mx-auto">
              <input type="email" placeholder="Enter Your Email" className="flex-grow px-3 py-2 rounded-l-lg border  focus:outline-none focus:ring-1 focus:ring-gold_medium" />
              <button className="px-3 py-2 bg-gold_medium text-white rounded-r-lg hover:bg-gold_dark focus:outline-none focus:ring-1 focus:ring-gold_medium">Subscribe</button>
            </div>
          </div>

        </section>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
