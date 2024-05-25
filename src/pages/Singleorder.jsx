import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRequest } from "../utils/Apihelpers";
import { CiDeliveryTruck } from "react-icons/ci";
import { TbPointFilled } from "react-icons/tb";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const Singleorder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [status, setstatus] = useState("");
  const navigate = useNavigate();
  const getorder = async () => {
    try {
      const response = await getRequest(true, `/order/myorder/${id}`);
      setOrder(response.order);
      setstatus(response.order?.status);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    getorder();
  }, [id]);

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#f0f0f0",
      padding: 20,
    },
    section: {
      margin: 10,
      padding: 10,
      backgroundColor: "#ffffff",
      borderRadius: 5,
    },
    header: {
      fontSize: 24,
      marginBottom: 10,
      textAlign: "center",
    },
    text: {
      fontSize: 12,
      marginBottom: 5,
    },
  });

  const InvoiceDocument = () => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.header}>Order Invoice</Text>
            <Text style={styles.text}>Order ID: {order?._id}</Text>
            <Text style={styles.text}>
              Purchase Date: {order?.orderDateTime}
            </Text>
            <Text style={styles.text}>Order Value: {order?.orderValue}</Text>
            <Text style={styles.text}>By Inaya store.</Text>
          </View>
        </Page>
      </Document>
    );
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <p>Estimated</p>
        <p className="font-bold text-2xl">Friday,15 sep</p>
        <div className="my-4">
          <p className="flex gap-1 items-center font-semibold">
            <CiDeliveryTruck size={24} /> Delivery by Lucknowi Arts
          </p>
          <div className="flex my-2">
            <section>
              <TbPointFilled
                className={`${
                  status === "Pending" ? "text-blue-800" : "text-black"
                }`}
                size={24}
              />

              <div className="px-[10px]">
                <section
                  className={`h-[10vh] ${
                    status === "Pending" ? "border-blue-500 border-l-2" : ""
                  }`}
                ></section>
              </div>
            </section>
            <section className="font-semibold">Order Received</section>
          </div>

          <div className="flex my-2">
            <section>
              <TbPointFilled
                className={`${
                  status === "Shipped" ? "text-blue-800" : "text-black"
                }`}
                size={24}
              />

              <div className="px-[10px]">
                <section
                  className={`h-[10vh] ${
                    status == "shipped"
                      ? "border-blue-500 border-l-2"
                      : "border-black border-l-2"
                  }`}
                ></section>
              </div>
            </section>
            <section className="font-semibold">Order Shipped</section>
          </div>

          <div className="flex my-2">
            <section>
              <TbPointFilled
                className={`${
                  status === "out" ? "text-blue-800" : "text-black"
                }`}
                size={24}
              />

              <div className="px-[10px]">
                <section
                  className={`h-[10vh] ${
                    status == "out"
                      ? "border-blue-500 border-l-2"
                      : "border-black border-l-2"
                  }`}
                ></section>
              </div>
            </section>
            <section className="font-semibold">Order out for delivery</section>
          </div>

          <div className="flex my-2">
            <section>
              <TbPointFilled
                className={`${
                  status === "Delivered" ? "text-blue-800" : "text-black"
                }`}
                size={24}
              />

              <div className="px-[10px]">
                <section
                  className={`h-[10vh] ${
                    status == "Delivered"
                      ? "border-blue-500 border-l-2"
                      : "border-black border-l-2"
                  }`}
                ></section>
              </div>
            </section>
            <section className="font-semibold">Order Delivered</section>
          </div>
          <div className="w-full my-2  border-b"></div>

          <div onClick={() => navigate(`/product/${order?.productId?._id}`)}>
            <p className="font-bold my-2">Product</p>
            <div className="flex flex-col md:flex-row gap-4">
              <section className="w-[10vh]">
                <img src={order?.productId?.image} alt="sss" />
              </section>
              <section className="flex flex-col gap-2">
                <p className="font-semibold">{order?.productId?.title}</p>
                <p className=" line-clamp-3">{order?.productId?.description}</p>
                <p className="font-bold">₹ {order?.productId?.selling_price}</p>
              </section>
            </div>
          </div>
          <div className="w-full my-2  border-b"></div>

          <div>
            <p className="font-bold my-2">Purchase Details</p>

            <div className="w-full md:w-[50%] border-b border-black"></div>
            <p className="font-semibold">Order ID</p>
            <p>{order?._id}</p>
            <div className="w-full md:w-[50%] border-b my-2 border-black"></div>
            <p className="font-semibold">Purchase Date</p>
            <p>{order?.orderDateTime}</p>
          </div>
          <div className="w-full my-2  border-b"></div>

          <div className="my-4">
            <p className="font-bold my-2">Payment Details</p>

            <div className="w-full md:w-[50%]border-b border-black"></div>
            <p className="font-semibold">Razorpay Payment ID</p>
            <p>{order?.razorpay_payment_id}</p>
            <div className="w-full md:w-[50%] my-2 border-b border-black"></div>

            <p className="font-semibold">Total</p>
            <p>₹ {order?.orderValue}</p>
            <div className="w-full md:w-[50%] border-b my-2 border-black"></div>
          </div>
          <div className="px-2 bg-gold_dark text-white p-2 text-center rounded-md">
            <PDFDownloadLink
              document={<InvoiceDocument />}
              fileName={"Invoice.pdf"}
            >
              {({ blob, loading, url, error }) => {
                return error
                  ? "Please, try again"
                  : loading
                  ? "Loading..."
                  : "Download Invoice";
              }}
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singleorder;
