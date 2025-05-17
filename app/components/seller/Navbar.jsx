'use client'
import { useAppContext } from "@/app/context/AppContext";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { router } = useAppContext()
  return (
	<div className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-200 text-gray-900">
	  <h1 onClick={() => router.push('/')} className="text-2xl font-medium cursor-pointer font-bold">
		<span className="text-orange-500">Q</span>uickCart
	  </h1>
	  
	  <div className="flex items-center gap-4">
      <button className="flex bg-gray-500 hover:bg-gray-400 py-2 px-12 rounded-4xl">Logout</button>
	  </div>
	</div>
  );
};

export default Navbar;