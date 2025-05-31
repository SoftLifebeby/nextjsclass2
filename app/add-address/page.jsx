"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { assets } from "../../assets/assets";

const page = () => {
  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    pinCode: "",
    area: "",
    city: "",
    state: "",
  });

  const onSubmitForm = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-16 mx-auto max-w-7xl lg:px-32 py-16 flex flex-col md:flex-row justify-between">
        <form className="w-full" onSubmit={onSubmitForm}>
          <p className="text-2xl md:text-3xl text-gray-500">
            Add Shipping{" "}
            <span className="font-semibold text-orange-600">Address</span>
          </p>
          <div className="space-y-3 max-w-sm mt-10">
            <input
              className="px-2 py-2.5 focus:border-orange-500  transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="text"
              placeholder="Full name"
              onChange={(e) =>
                setAddress({ ...address, fullName: e.target.value })
              }
              value={address.fullName}
            />
            <input
              className="px-2 py-2.5 focus:border-orange-500  transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="text"
              placeholder="Phone Number"
              onChange={(e) =>
                setAddress({ ...address, fullName: e.target.value })
              }
              value={address.pinCode}
            />
            <input
              className="px-2 py-2.5 focus:border-orange-500  transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="text"
              placeholder="Pin Code"
              onChange={(e) =>
                setAddress({ ...address, fullName: e.target.value })
              }
              value={address.area}
            />
            <input
              className="px-2 py-2.5 focus:border-orange-500  transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="text"
              placeholder="Address(Area and Street"
              onChange={(e) =>
                setAddress({ ...address, fullName: e.target.value })
              }
              value={address.city}
            />
            <input
              className="px-2 py-2.5 focus:border-orange-500  transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="text"
              placeholder="Full name"
              onChange={(e) =>
                setAddress({ ...address, fullName: e.target.value })
              }
              value={address.state}
            />
          </div>
          <button
            type="submit"
            className="max-w-sm rounded w-full mt-6 bg-orange-600 text-white py-3 hover:bg-orange-700 uppercase"
          >
            Save address
          </button>
        </form>

        <Image alt="image" className="m-6" src={assets.my_location_image} />
      </div>
      <Footer />
    </div>
  );
};

export default page;

// add-address
//all-products
// cart
// my-orders
// order-placed
// product
//seller
