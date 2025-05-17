'use client'
import Link from "next/link";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdPersonOutline } from "react-icons/md";
import { useAppContext } from "../context/AppContext";
import { UserButton, useClerk, useUser } from "@clerk/nextjs";
import { BagIcon, CartIcon } from "@/assets/assets";

const Navbar = () => {
	const { router, isSeller, user } = useAppContext()
	const { openSignIn, signOut } = useClerk();
	const { isSignedIn } = useUser();
  return (
	<div className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-200 text-gray-900">
	  <h1 onClick={() => router.push('/')} className="text-2xl font-medium">
		<span className="text-orange-500">Q</span>uickCart
	  </h1>
	  <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
		<Link href={"/"} className="hover:text-gray-700 transition">
		  Home
		</Link>
		<Link href={"/"} className="hover:text-gray-700 transition">
		  Shop
		</Link>
		<Link href={"/"} className="hover:text-gray-700 transition">
		  About Us
		</Link>
		<Link href={"/"} className="hover:text-gray-700 transition">
		  Contact
		</Link>
		{isSeller && (
		  <button className="text-xs border px-4 py-2.5 rounded">
			Seller Dashboard
		  </button>

		)}
	  </div>

	  <div className="flex items-center gap-4">
		<IoSearchOutline />
		{user ? (
			<>
				<UserButton >
				<UserButton.MenuItems>
					<UserButton.Action 
						label="Cart"
						labelIcon={<CartIcon />}
						onClick={() => router.push('/cart')} />
				</UserButton.MenuItems>
				<UserButton.MenuItems>
					<UserButton.Action
						label="My Orders"
						labelIcon={<BagIcon />}
						onClick={() => router.push('/my-orders')}
					/>
				</UserButton.MenuItems>
				</UserButton>
			</>
		) : (
			<button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
			  <MdPersonOutline />
			  Login
			</button>
		)}
	  </div>
	</div>
  );
};

export default Navbar;