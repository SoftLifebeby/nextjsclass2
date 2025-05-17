'use client'

import { useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/NavBar"
import Image from "next/image"
import { assets } from "../../assets/assets"

const page = () => {
  const [address, setAddAddress] = useState({
    fullName: "",
    phoneNumber: "",
    pinCode: "",
    address: "",
    city: "",
    state: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setAddAddress((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your form submission logic here
    console.log("Address added:", address)
  }
  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-16 mx-auto max-w-7xl flex flex-col lg:flex-row items-start">
        <form className="w-full" onSubmit={handleSubmit}>
          <p>
            Add Shipping{" "}
            <span className="font-semibold">Address</span>
          </p>
          <div className="space-y-3 max-w-sm mt-10">
            <input type="text" className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500" placeholder="Full Name" onChange={handleChange} name="fullName" value={address.fullName}/> 
            <input type="text" className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500" placeholder="Phone Number" onChange={handleChange} name="phoneNumber" value={address.phoneNumber}/> 
            <input type="text" className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500" placeholder="Pin Code" onChange={handleChange} name="pinCode" value={address.pinCode}/> 
            <input type="text" className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500" placeholder="Address" onChange={handleChange} name="address" value={address.address}/> 
            <input type="text" className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500" placeholder="City" onChange={handleChange} name="city" value={address.city}/> 
            <button type="submit" className="mt-4 px-4 py-2 bg-orange-500 text-white rounded">Submit</button>
          </div>
        </form>
        <Image alt="image" className="m-6" src={assets.my_location_image}/>
      </div>
      <Footer />
    </div>
  )
}

export default page
