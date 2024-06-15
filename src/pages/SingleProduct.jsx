import React, { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import Mainlayout from "../components/Mainlayout";
import { getRequest, postRequest } from "../utils/Apihelpers";
import ProductCard from "../components/ProductCard";
import SingleProductSkeleton from "../skeletons/SingleProductSkeleton";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton";
import Nav from "../components/Nav";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { LuText } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { GiRolledCloth } from "react-icons/gi";
import { FaExchangeAlt } from "react-icons/fa";
import RelatedProductCard from "../components/RelatedProductCard";
import Footer from "../components/Footer";
import ReviewCard from "../components/ReviewCard";
import AuthHook from "../context/AuthContext";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { IoStar } from "react-icons/io5";

const SingleProduct = () => {
  const { id } = useParams();
  const url = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();
  const { currency, userDetails, favourites, setfavourites, isLogedin } = AuthHook();

  const [productloader, setproductloader] = useState(false);
  const [similarLoader, setsimilarLoader] = useState(false);

  const [product, setProduct] = useState("");
  const [colors, setcolors] = useState([]);
  const [sizes, setsizes] = useState([]);
  const [size, setsize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [qunatity, setquantity] = useState(1);
  const [Category, setcategory] = useState("");
  const [semilarproducts, setsemilarproducts] = useState([]);
  const [preview, setpreview] = useState("");
  const [imageIndex, setimageIndex] = useState(0);
  const [detailsOptions, setdetailsOptions] = useState("");
  const [reviewData, setreviewData] = useState([]);

  const add = () => {
    if (qunatity < product?.quantity) {
      setquantity((prevQuantity) => prevQuantity + 1);
    } else {
      toast.error(`only ${product?.quantity} Quantity available.`);
    }
  };

  const remove = () => {
    setquantity((prevQuantity) => Math.max(0, prevQuantity - 1));
  };

  const addToFavorite = async () => {
    // console.log(data._id);
    try {
      const res = await postRequest(true, `/liked`, { productId: id });
      if (res.status) {
        setfavourites((prevFavourites) => [...prevFavourites, id]);
        toast.success(res.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const removeToFavorite = async () => {
    // console.log(data._id);
    try {
      const res = await postRequest(true, `/liked/remove`, { productId: id });
      if (res.status) {
        setfavourites((prevFavourites) =>
          prevFavourites.filter((eid) => eid !== id)
        );
        toast.success(res.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const fetchProduct = async () => {
    try {
      setproductloader(true);
      if (currency !== null) {
        const { data } = await axios.get(
          `${url}/admin/product/${id}/${currency}`
        );
        setProduct(data.products);
        setcolors(data.products.color);
        setsizes(data.products.size);
        setcategory(data.products.category);
        setproductloader(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchreviews = async () => {
    try {
      setproductloader(true);
      const { data } = await axios.get(`${url}/review/${id}`);
      // console.log(data?.reviews);
      setreviewData(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const similarProducts = async () => {
    try {
      setsimilarLoader(true);
      const response = await getRequest(
        true,
        `/admin/product/getsimilarproducts?category=${product?.category}&productId=${product._id}`
      );
      console.log(response);
      setsemilarproducts(response.products);
      setsimilarLoader(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const addtoCart = async (pid, sign) => {
    if (!isLogedin) {
      toast.error('login to add in cart.....')
      return
    }
    try {
      const response = await postRequest(true, "/cart", {
        productId: pid,
        quantity: Number(1),
        size: size ? size : product?.size[0],
        color: selectedColor ? selectedColor : product?.color[0],
      });
      console.log(response);
      if (response.status) {
        if (sign === "is_buy") {
          navigate("/cart");
        } else {
          toast.success(response.message);
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const watchHistory = async () => {
    if (isLogedin) {
      const response = await postRequest(true, "/watchHistory", {
        productId: id,
      });
      console.log(response.success);
    }
  };

  const colorOptions = Array.from(
    { length: product.color },
    (_, index) => index + 1
  );

  useEffect(() => {
    fetchProduct();
    fetchreviews();
  }, []);

  useEffect(() => {
    if (product) {
      similarProducts();
    }
  }, [product]);

  useEffect(() => {
    watchHistory();
  }, []);

  const see = (url) => {
    setpreview(see);
  };

  const setDatilsDropdown = (text) => {
    if (detailsOptions == text) {
      setdetailsOptions("");
    } else {
      setdetailsOptions(text);
    }
  };

  return (
    // <Mainlayout>
    <div className="h-[100svh] w-[100svw] overflow-y-hidden">
      <Nav />
      <div className=" h-[90svh] w-full overflow-y-auto">
        <div className="">
          {productloader ? (
            <div className="grid grid-cols-1 md:grid-cols-2">
              <SingleProductSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 w-full">
              <div className=" h-[75svh] md:h-[85svh] overflow-y-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2">
                  {product?.image?.map((image, index) => (
                    <div
                      key={index}
                      className='m-2'
                    >
                      <Zoom>
                        <img
                          src={image}
                          alt={`Image ${index}`}
                          className="w-full h-full object-cover"
                        />
                      </Zoom>
                    </div>
                  ))}
                </div>
                {/* <img
                  src={preview ? preview : product?.image?.[imageIndex]}
                  alt="image"
                  className="object-fill h-[450px] w-[450px] aspect-square rounded-xl"
                /> */}
              </div>
              <div className=" py-4 w-full px-5 md:px-10">
                <p className=" font-semibold text-xl md:text-2xl ">
                  {product?.title}
                </p>
                <section className=" flex gap-2 items-center my-2 text-xl font-bold">
                  <p className="">
                    {currency}{" "}
                    {new Intl.NumberFormat().format(product?.selling_price)}
                  </p>
                  <p className="line-through text-gray-500 text-lg">
                    {currency}{" "}
                    {new Intl.NumberFormat().format(product?.original_price)}
                  </p>
                  <p className=" text-green-600 font-semibold text-lg">
                    {new Intl.NumberFormat().format(
                      product?.original_price - product?.selling_price
                    )}{" "}
                    {currency} off
                  </p>
                </section>
                <div className=" my-2">
                  <p className="font-semibold my-1 text-lg">Available Sizes</p>
                  <div className="w-full gap-2 overflow-x-auto flex cursor-pointer">
                    <div className="w-full gap-2 overflow-x-auto flex cursor-pointer">
                      {sizes?.map((item, index) => (
                        <div
                          onClick={() => setsize(item)}
                          onDoubleClick={() => setsize(null)}
                          key={index}
                          className={`px-5 rounded-3xl py-[2px] text-sm border  border-gold_medium ${size == item
                            ? " border-gold_dark bg-gold_dark text-white"
                            : ""
                            }`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="font-semibold my-1 text-lg">Quantity</p>
                <div className=" flex gap-10 justify-between md:justify-start">
                  <div className="p-1 flex bg-gray-100 rounded-3xl my-1 items-center w-fit gap-5 px-4">
                    <section className="">
                      <GoPlus onClick={() => add()} size={24} color="#d1bf6a" />
                    </section>
                    <section>{qunatity}</section>
                    <section>
                      <FiMinus
                        onClick={() => remove()}
                        size={24}
                        color="#d1bf6a"
                      />
                    </section>
                  </div>
                  <div className="p-1 flex bg-gold_medium rounded-3xl my-1 items-center w-fit gap-5 px-4">
                    {favourites?.includes(id) ? (
                      <button
                        onClick={removeToFavorite}
                        className="px-3 py-1 text-white font-medium"
                      >
                        Remove from Wishlist
                      </button>
                    ) : (
                      <button
                        onClick={addToFavorite}
                        className="px-3 py-1 text-white font-medium"
                      >
                        Add to Wishlist
                      </button>
                    )}
                  </div>
                </div>

                <div className=" flex items-center gap-2 my-2">
                  <p className="font-semibold  text-lg">Color:</p>
                  <div className="flex gap-x-3 w-full  gap-2 overflow-x-auto  cursor-pointer">
                    {colors?.map((color, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedColor(color.colorCode)}
                        onDoubleClick={() => setSelectedColor(null)}
                        className={`${color.colorCode === selectedColor ? " border-gray-500" : ""
                          } px-2 w-6 h-6 py-2 border-2 rounded-full`}
                        style={{ backgroundColor: color.colorCode }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="block my-4 px-10">
                  <div className="flex flex-col gap-2 w-full">
                    <div>
                      <button
                        onClick={() => addtoCart(product?._id)}
                        className="px-6 py-[6px] font-semibold rounded-full w-full text-gold_medium border"
                      >
                        Add to Cart
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => addtoCart(product?._id, "is_buy")}
                        className="px-6 py-[6px] font-semibold rounded-full w-full text-white bg-gold_medium"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
                <div className=" flex flex-col gap-3">
                  <section className=" flex items-end justify-between">
                    <p className=" font-medium flex items-center gap-2">
                      <LuText size={20} />
                      Description{" "}
                    </p>
                    <p
                      className=" cursor-pointer"
                      onClick={() => setDatilsDropdown("description")}
                    >
                      <IoIosArrowDown size={25} />
                    </p>
                  </section>
                  <section
                    className={` p-2 text-sm overflow-hidden ${detailsOptions == "description"
                      ? " h-auto w-auto"
                      : " hidden"
                      } transition-all duration-300 ease-in-out`}
                  >
                    <p> {product?.description}</p>
                  </section>
                  <section className=" flex items-end justify-between">
                    <p className=" font-medium flex items-center gap-2">
                      <TbTruckDelivery size={20} />
                      Delivery{" "}
                    </p>
                    <p
                      className=" cursor-pointer"
                      onClick={() => setDatilsDropdown("delivery")}
                    >
                      <IoIosArrowDown size={25} />
                    </p>
                  </section>
                  <section
                    className={` p-2 text-sm overflow-hidden ${detailsOptions == "delivery"
                      ? " h-auto w-auto"
                      : " hidden"
                      } transition-all duration-300 ease-in-out`}
                  >
                    <p>Free Delivery</p>
                  </section>
                  <section className=" flex items-end justify-between">
                    <p className=" font-medium flex items-center gap-2">
                      <GiRolledCloth size={20} />
                      Material & Wash Type{" "}
                    </p>
                    <p
                      className=" cursor-pointer"
                      onClick={() => setDatilsDropdown("material")}
                    >
                      <IoIosArrowDown size={25} />
                    </p>
                  </section>
                  <section
                    className={` p-2 text-sm overflow-hidden ${detailsOptions == "material"
                      ? " h-auto w-auto"
                      : " hidden"
                      } transition-all duration-300 ease-in-out`}
                  >
                    <p>
                      <span className=" font-medium">Material:</span>{" "}
                      {product?.material}
                    </p>
                    <p>
                      <span className=" font-medium">Wash Type:</span>{" "}
                      {product?.howToWash}
                    </p>
                  </section>
                  <section className=" flex items-end  justify-between">
                    <p className=" font-medium flex items-center gap-2">
                      <FaExchangeAlt size={20} />
                      Returns And Cancellations
                    </p>
                    <p
                      className=" cursor-pointer"
                      onClick={() => setDatilsDropdown("return")}
                    >
                      <IoIosArrowDown size={25} />
                    </p>
                  </section>
                  <section
                    className={` p-2 text-sm overflow-hidden ${detailsOptions == "return" ? " h-auto w-auto" : " hidden"
                      } transition-all duration-300 ease-in-out`}
                  >
                    <p>Not available</p>
                  </section>
                </div>
              </div>
            </div>
          )}
        </div>
        {
          semilarproducts?.length > 0 && <div className="mt-5 w-[100vsw]">
            <p className="font-semibold text-center  text-3xl">
              You may also like!
            </p>
            <div className=" flex px-3 w-[100svw] gap-5 overflow-x-auto md:px-20 my-8">
              {similarLoader ? (
                <>
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                </>
              ) : (
                semilarproducts.map((product, index) => (
                  <div key={index} className=" w-[50%] md:w-[20%]">
                    <RelatedProductCard data={product} />
                  </div>
                ))
              )}
            </div>
          </div>
        }
        <div className=" md:px-20 px-4">
          <p className=" font-semibold text-xl my-5">Product reviews ({reviewData?.totalCount})</p>
          <div className=" flex items-center mt-3 mb-7 justify-between">
            <div>
              <section className=" flex gap-2 text-[40px] items-center font-semibold text-center">
                {reviewData?.averageRating}
                <IoStar size={27} />
              </section>
              <section>
                <h1 className=" text-xl">{reviewData?.totalCount} reviews</h1>
              </section>
            </div>
            <div>
              <p className=" flex gap-3 items-center">5 <IoStar color="#d1bf6a" size={20} />
                {reviewData?.ratingDistribution?.five} reviews</p>
              <p className=" flex gap-3 items-center">4 <IoStar color="#d1bf6a" size={20} />{reviewData?.ratingDistribution?.four} reviews</p>
              <p className=" flex gap-3 items-center">3 <IoStar color="#d1bf6a" size={20} />{reviewData?.ratingDistribution?.three} reviews</p>
              <p className=" flex gap-3 items-center">2 <IoStar color="#d1bf6a" size={20} />{reviewData?.ratingDistribution?.two} reviews</p>
              <p className=" flex gap-3 items-center">1 <IoStar color="#d1bf6a" size={20} />{reviewData?.ratingDistribution?.one} reviews</p>
            </div>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviewData?.reviews?.map((item) => {
              return <div className=" border p-2 shadow">
                <section className=" text-white rounded flex w-10 items-center text-sm gap-1 bg-green-600 px-2">{item?.rating}<IoStar color="white" /></section>
                <h1 className=" font-semibold">{item.comment}</h1>
                <p className="text-sm">{item.desc}</p>
                <div className=" grid grid-cols-4 my-2 gap-2">
                  {
                    item?.productImages?.map((i) => {
                      return <Zoom>
                        <img src={i} alt="review image" className=" h-20 md:h-24 aspect-square rounded" />
                      </Zoom>
                    })
                  }
                </div>
              </div>
            })}
          </div>
        </div>
        <Footer />
      </div>
    </div>
    // </Mainlayout>
  );
};

export default SingleProduct;
