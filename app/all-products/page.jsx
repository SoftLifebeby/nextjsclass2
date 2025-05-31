"use client";
import React from "react";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";

const page = () => {
  const { products } = useAppContext();
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl flex flex-col items-start px-6 lg:px-32">
        <div className="flex p-6 flex-col items-start pt-14">
          <p className="text-2xl font-medium">All Products</p>
          <div className="w-16 h-2 rounded-2xl  bg-orange-600"></div>
          <p className="py-4 text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto
            tempore consequatur facilis assumenda possimus numquam delectus
            ipsum quod ab aut.
          </p>
        </div>
        <div className="grid p-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </>
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
