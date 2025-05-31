"use client";
import Image from "next/image";
import { assets } from "../../assets/assets";
import React from "react";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, router } = useAppContext();

  return (
    <div
      className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
      onClick={() => {
        router.push("/product/" + product._id), { scroll: true };
      }}
    >
      <div className="bg-gray-500/10 relative group cursor-pointer rounded w-full h-52 flex items-center justify-center">
        <Image
          className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
          src={product.image[0]}
          unoptimized={true}
          width={800}
          height={800}
          alt={product.name}
        />
        <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
          <Image className="h-3 w-3" src={assets.heart_icon} alt="heart_icon" />
        </button>
      </div>
      <p>{product.name}</p>
      <p className="truncate w-full text-sm text-gray-500">
        {product.description}
      </p>
      <div className="flex items-end justify-between w-full mt-1">
        <p className="text-base font-medium">
          {currency}
          {product.offerPrice}
        </p>
        <button className=" max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded text-xs hover:bg-slate-50 transition">
          Buy now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
