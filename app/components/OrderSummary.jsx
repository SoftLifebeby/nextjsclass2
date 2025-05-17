"use client"; // Declares this as a Client Component in Next.js

import React, { useEffect, useState } from "react"; // Import React and hooks
import { addressDummyData } from "@/assets/assets"; // Import dummy address data
import { useAppContext } from "../context/AppContext"; // Custom hook for React context

const OrderSummary = () => {
  // Destructure context values
  const { currency, router, getCartCount, getCartAmount } = useAppContext();

  // State management
  const [selectedAddress, setSelectedAddress] = useState(null); // Selected address
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown visibility
  const [userAddresses, setUserAddresses] = useState([]); // List of user addresses

  // Fetch user addresses (simulated API call)
  const fetchUserAddresses = async () => {
    setUserAddresses(addressDummyData); // Using dummy data
  };

  // Handle address selection
  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  // Placeholder for order creation
  const createOrder = async () => {
    // Implement order creation logic here
  };

  // Fetch addresses on component mount
  useEffect(() => {
    fetchUserAddresses();
  }, []);

  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">Order Summary</h2>
      {/* Divider */}
      <hr className="border-gray-500/30 my-5" />
      <div className="space-y-6">
        {/* Address Selection Dropdown */}
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Select Address
          </label>
          <div className="relative inline-block w-full text-sm border">
            <button
              className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>
              {/* Down arrow icon */}
              <svg
                className={`w-5 h-5 inline float-right transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-0" : "-rotate-90"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5">
                {userAddresses.map((address, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {`${address.fullName}, ${address.area}, ${address.city}, ${address.state}`}
                  </li>
                ))}
                {/* Add New Address Link */}
                <li
                  className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-center"
                  onClick={() => router.push("/add-address")}
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Promo Code Section */}
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Promo Code
          </label>
          <div className="flex flex-col items-start gap-3">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-grow w-full outline-none p-2.5 text-gray-600 border"
            />
            <button className="bg-orange-600 text-white px-9 py-2 hover:bg-orange-700">
              Apply
            </button>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-500/30 my-5" />

        {/* Cart Price Breakdown */}
        <div className="space-y-4">
          {/* Items Count */}
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">Items {getCartCount()}</p>
            <p className="text-gray-800">{currency}{getCartAmount()}</p>
          </div>
          {/* Shipping */}
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-gray-800">Free</p>
          </div>
          {/* Tax (2%) */}
          <div className="flex justify-between">
            <p className="text-gray-600">Tax (2%)</p>
            <p className="font-medium text-gray-800">
              {currency}
              {Math.floor(getCartAmount() * 0.02)}
            </p>
          </div>
          {/* Total Price */}
          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
            <p>Total</p>
            <p>
              {currency}
              {getCartAmount() + Math.floor(getCartAmount() * 0.02)}
            </p>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={createOrder}
          className="w-full bg-orange-600 text-white py-3 mt-5 hover:bg-orange-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;