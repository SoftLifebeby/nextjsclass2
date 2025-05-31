"use client"; // Marks this as a Client Component in Next.js

import React, { useEffect, useState } from "react";
import { assets } from "../../../assets/assets";
import Image from "next/image";
import { useAppContext } from "../../context/AppContext";
import Loading from "../../components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const page = () => {
  // Accessing context values
  const { currency, getToken, user } = useAppContext();

  // State for storing orders and loading status
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch seller's orders from the API
  const fetchSellerOrders = async () => {
    try {
      const token = await getToken(); // Get authentication token

      // Make GET request to fetch seller's orders
      const { data } = await axios.get("/api/order/seller-orders", {
        headers: {
          Authorization: `Bearer ${token}`, // Include auth token
        },
      });

      if (data.success) {
        setOrders(data.orders); // Update orders state
        setLoading(false); // Set loading to false
      } else {
        toast.error(data.message); // Show error message
      }
    } catch (error) {
      toast.error(error.message); // Show error message if request fails
    }
  };

  // Effect to fetch orders when user data is available
  useEffect(() => {
    if (user) {
      // Only fetch if user is logged in
      fetchSellerOrders();
    }
  }, [user]); // Dependency on user object

  return (
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
      {/* Conditional rendering based on loading state */}
      {loading ? (
        <Loading /> // Show loading spinner while data is being fetched
      ) : (
        <div className="md:p-10 p-4 space-y-5">
          <h2 className="text-lg font-medium">Orders</h2>

          {/* Orders list container */}
          <div className="max-w-4xl rounded-md">
            {/* Map through orders array to render each order */}
            {orders.map((order, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300"
              >
                {/* Order items section */}
                <div className="flex-1 flex gap-5 max-w-80">
                  <Image
                    className="max-w-16 max-h-16 object-cover"
                    src={assets.box_icon}
                    alt="box_icon"
                  />
                  <p className="flex flex-col gap-3">
                    {/* Display product names and quantities */}
                    <span className="font-medium">
                      {order.items
                        .map(
                          (item) => `${item.product.name} x ${item.quantity}`
                        )
                        .join(", ")}
                    </span>
                    {/* Display total number of items */}
                    <span>Items : {order.items.length}</span>
                  </p>
                </div>

                {/* Shipping address section */}
                <div>
                  <p>
                    <span className="font-medium">
                      {order.address.fullName}
                    </span>
                    <br />
                    <span>{order.address.area}</span>
                    <br />
                    <span>{`${order.address.city}, ${order.address.state}`}</span>
                    <br />
                    <span>{order.address.phoneNumber}</span>
                  </p>
                </div>

                {/* Order amount */}
                <p className="font-medium my-auto">
                  {currency}
                  {order.amount}
                </p>

                {/* Order meta information */}
                <div>
                  <p className="flex flex-col">
                    <span>Method : COD</span> {/* Payment method */}
                    <span>
                      Date : {new Date(order.date).toLocaleDateString()}
                    </span>{" "}
                    {/* Order date */}
                    <span>Payment : Pending</span> {/* Payment status */}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
