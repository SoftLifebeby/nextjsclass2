"use client";
import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Image from "next/image";
import { useAppContext } from "../context/AppContext";
import Loading from "../components/Loading";

const page = () => {
  const { router } = useAppContext();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (seconds <= 0) {
      // router.push("/my-orders");
    }

    const timer = setTimeout(() => {
      setSeconds((x) => x - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-5 h-screen">
        <div className=" border-4 rounded-full animate-bounce border-green-400">
          <Image alt="image" src={assets.checkmark} className="animate-pulse" />
          {/* <Loading /> */}
        </div>
        <div className="text-center">
          <p className="text-4xl">
            Congratulations your Order has been Placed !!
          </p>
          <p className="my-4">
            You will be moved to the Orders Page in {seconds} Seconds...
          </p>
        </div>
      </div>
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
