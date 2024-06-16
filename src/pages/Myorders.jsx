import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest, postRequest } from "../utils/Apihelpers";
import { LuChevronRight } from "react-icons/lu";
import "react-photo-view/dist/react-photo-view.css";
import moment from "moment/moment";
import MyorderCardSkeleton from "../skeletons/MyorderCardSkeleton";
import Nodata from "../components/Nodata";
import toast from "react-hot-toast";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import AuthHook from "../context/AuthContext";
import InfiniteScroll from "react-infinite-scroll-component";

const Myorders = () => {
  const [orders, setOrders] = useState([]);
  const [status, setstatus] = useState("");
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();
  const { currency } = AuthHook();

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(1);
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [reviewLoader, setreviewLoader] = useState(false);
  const [cureentPage, setcureentPage] = useState(1);
  const [totalPages, settotalPages] = useState();
  const [hasMore, sethasMore] = useState(false);

  const handleImageUpload = (e) => {
    const files = e.target.files[0];
    setImages(files);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setloader(true);
      try {
        if (currency !== null) {
          const { orders } = await getRequest(
            true,
            `/order/myorders/${currency ? currency : "INR"}?filter=${status}`
          );
          setOrders(orders?.data);
          setcureentPage(orders?.currentPage);
          settotalPages(orders?.totalPages);
          sethasMore(orders?.moreData);
          setloader(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [status]);

  const fetchMore = async () => {
    try {
      if (currency !== null) {
        const { orders } = await getRequest(
          true,
          `/order/myorders/${
            currency ? currency : "INR"
          }?filter=${status}&page=${cureentPage + 1}`
        );
        setcureentPage(orders?.currentPage);
        settotalPages(orders?.totalPages);
        sethasMore(orders?.moreData);
        setOrders((prev) => [...prev, ...orders?.data]);
        setloader(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleAddReviewClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const handleSubmit = async () => {
    try {
      setreviewLoader(true);
      const ImgData = new FormData();
      ImgData.append("file", images);
      ImgData.append("upload_preset", "Categorys");
      const Res = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        ImgData
      );
      const imgUrl = Res.data.secure_url;

      const response = await postRequest(true, "/review", {
        productId: selectedOrder?.productId?._id,
        rating: rating,
        comment: comment,
        productImages: [imgUrl],
        desc: description,
      });

      if (response.status) {
        toast.success("Review addded sucessfully..");
        handleCloseModal();
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
    setreviewLoader(false);
  };

  return (
    <div
      className="h-full overflow-y-auto px-2 py-3 md:py-0 md:px-0"
      id="scrollContainer"
    >
      <p className="font-semibold text-xl">Your orders</p>

      <div className=" flex w-[100%] text-nowrap overflow-x-auto gap-2 my-2">
        <section
          onClick={() => setstatus("")}
          className={`border ${
            status === "" ? "border-gold_dark text-gold_dark" : ""
          } rounded-full px-2 md:px-4 font-medium py-[3px] text-xs cursor-pointer`}
        >
          All
        </section>
        <section
          onClick={() => setstatus("Pending")}
          className={`border ${
            status === "Pending" ? "border-gold_dark text-gold_dark" : ""
          } rounded-full px-2 md:px-4 font-medium py-[3px] text-xs cursor-pointer hover:border-gold_dark hover:text-gold_dark`}
        >
          Pending
        </section>
        <section
          onClick={() => setstatus("Shipped")}
          className={`border ${
            status === "Shipped" ? "border-gold_dark text-gold_dark" : ""
          } rounded-full px-2 md:px-4 font-medium py-[3px] text-xs cursor-pointer hover:border-gold_dark hover:text-gold_dark`}
        >
          Shipped
        </section>
        <section
          onClick={() => setstatus("out")}
          className={`border ${
            status === "out" ? "border-gold_dark text-gold_dark" : ""
          } rounded-full px-2 md:px-4 font-medium py-[3px] text-xs cursor-pointer hover:border-gold_dark hover:text-gold_dark`}
        >
          out for Delivery
        </section>
        <section
          onClick={() => setstatus("Delivered")}
          className={`border ${
            status === "Delivered" ? "border-gold_dark text-gold_dark" : ""
          } rounded-full px-2 md:px-4 font-medium py-[3px] text-xs cursor-pointer hover:border-gold_dark hover:text-gold_dark`}
        >
          Delivered
        </section>
        <section
          onClick={() => setstatus("cancelled")}
          className={`border ${
            status === "cancelled" ? "border-gold_dark text-gold_dark" : ""
          } rounded-full px-2 md:px-4 font-medium py-[3px] text-xs cursor-pointer hover:border-gold_dark hover:text-gold_dark`}
        >
          cancelled
        </section>
      </div>
      <div>
        {loader ? (
          <>
            <MyorderCardSkeleton />
            <MyorderCardSkeleton />
            <MyorderCardSkeleton />
            <MyorderCardSkeleton />
          </>
        ) : orders?.length === 0 ? (
          <div>
            <Nodata />
          </div>
        ) : (
          <InfiniteScroll
            dataLength={orders.length}
            next={fetchMore}
            hasMore={hasMore}
            className="my-2 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
            loader={
              <>
                <MyorderCardSkeleton />
                <MyorderCardSkeleton />
              </>
            }
            scrollableTarget="scrollContainer"
          >
            {orders?.map((item) => (
              <div
                key={item._id}
                className="rounded-lg flex border pr-0 p-2 md:px-6 md:py-4"
              >
                <div className="w-[95%]">
                  <section className="text-xs flex mb-3 items-center justify-between">
                    <section className="text-xs flex gap-2 items-center h-full">
                      <p className="rounded-full border px-4 font-medium py-1">
                        {item?.status}
                      </p>{" "}
                      |
                      <p className="font-medium">
                        {moment(item?.orderDateTime).format("D MMMM YYYY")}
                      </p>
                    </section>
                    <button
                      onClick={() => handleAddReviewClick(item)}
                      className="bg-gold_dark text-white px-2 md:px-4 py-1 rounded-md text-semibold"
                    >
                      Add Review
                    </button>
                  </section>
                  <section className="flex items-center gap-2 md:gap-4">
                    <img
                      src={item?.productId?.image[0]}
                      className="w-20 h-20 rounded-lg"
                      alt={item?.productId?.title}
                    />
                    <section>
                      <p className="font-semibold text-xs md:text-sm text-gold_dark my-1">
                        Order ID: {item._id}
                      </p>
                      <p className="text-xs">{item?.productId?.title}</p>
                      <p className="text-xs md:text-sm font-medium">
                        {new Intl.NumberFormat().format(item?.orderValue)}
                      </p>
                    </section>
                  </section>
                </div>
                <div className="w-[5%] flex items-center justify-end">
                  <button
                    onClick={() => navigate(`/profile/myorder/${item._id}`)}
                  >
                    <LuChevronRight size={24} />
                  </button>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-full max-w-md">
            <h2 className="font-semibold mb-2">Add Review</h2>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full border px-3 py-[6px] rounded-md focus:outline-none focus:border-black"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border px-3 py-[6px] rounded-md focus:outline-none focus:border-black"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Comment
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border px-3 py-[6px] rounded-md focus:outline-none focus:border-black"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Images
              </label>
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="w-full border px-3 py-[6px] rounded-md focus:outline-none focus:border-black"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className=" border bg-gray-100 font-medium text-sm px-3 py-[4px] rounded-md mr-2 "
                disabled={reviewLoader}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className=" bg-gold_dark font-medium text-sm text-white px-3 py-[4px] rounded-md"
              >
                {reviewLoader ? (
                  <PulseLoader color="white" size={8} />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Myorders;
