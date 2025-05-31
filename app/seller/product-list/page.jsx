"use client"; // Marks this as a Client Component in Next.js

import React, { useEffect, useState } from "react";
import { assets, productsDummyData } from "../../../assets/assets";
import Image from "next/image";
import { useAppContext } from "../../context/AppContext";
import Loading from "../../components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const page = () => {
  // Accessing necessary values from AppContext
  const { router, getToken, user } = useAppContext();

  // State for storing products and loading status
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch seller's products from the API
  const fetchSellerProduct = async () => {
    try {
      const token = await getToken(); // Get authentication token

      // Make GET request to fetch seller's product list
      const { data } = await axios.get("/api/product/seller-list", {
        headers: {
          Authorization: `Bearer ${token}`, // Include auth token
        },
      });

      if (data.success) {
        setProducts(data.products); // Update products state
        setLoading(false); // Set loading to false
      } else {
        toast.error(data.message); // Show error message
      }
    } catch (error) {
      toast.error(error.message); // Show error message if request fails
    }
  };

  // Effect to fetch products when user data is available
  useEffect(() => {
    if (user) {
      // Only fetch if user is logged in
      fetchSellerProduct();
    }
  }, [user]); // Dependency on user object

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      {/* Conditional rendering based on loading state */}
      {loading ? (
        <Loading /> // Show loading spinner while data is being fetched
      ) : (
        <div className="w-full md:p-10 p-4">
          {/* Page heading */}
          <h2 className="pb-4 text-lg font-medium">All Product</h2>

          {/* Products table container */}
          <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
            {/* Products table */}
            <table className="table-fixed w-full overflow-hidden">
              {/* Table header */}
              <thead className="text-gray-900 text-sm text-left">
                <tr>
                  {/* Column headers */}
                  <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium truncate">
                    Product
                  </th>
                  <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                    Category
                  </th>
                  <th className="px-4 py-3 font-medium truncate">Price</th>
                  <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table body with product data */}
              <tbody className="text-sm text-gray-500">
                {products.map((product, index) => (
                  <tr key={index} className="border-t border-gray-500/20">
                    {/* Product name and image */}
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                      <div className="bg-gray-500/10 rounded p-2">
                        <Image
                          src={product.image[0]} // First product image
                          unoptimized={true}
                          alt="product Image"
                          className="w-16"
                          width={1280}
                          height={720}
                        />
                      </div>
                      <span className="truncate w-full">{product.name}</span>
                    </td>

                    {/* Product category (hidden on small screens) */}
                    <td className="px-4 py-3 max-sm:hidden">
                      {product.category}
                    </td>

                    {/* Product price */}
                    <td className="px-4 py-3">${product.offerPrice}</td>

                    {/* Action button (hidden on small screens) */}
                    <td className="px-4 py-3 max-sm:hidden">
                      <button
                        onClick={() => router.push(`/product/${product._id}`)} // Navigate to product detail page
                        className="flex items-center gap-1 px-1.5 md:px-3.5 py-2 bg-orange-600 text-white rounded-md"
                      >
                        <span className="hidden md:block">Visit</span>
                        <Image
                          unoptimized={true}
                          className="h-3.5"
                          src={assets.redirect_icon}
                          alt="redirect_icon"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
