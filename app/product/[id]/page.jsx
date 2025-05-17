"use client"; // Declares this as a Client Component in Next.js

import React, { useEffect, useState } from "react"; // Import React and hooks
import { assets } from "@/assets/assets"; // Import assets
import ProductCard from "../../components/ProductCard"; // Import ProductCard component

import Footer from "../../components/Footer"; // Import Footer component
import Image from "next/image"; // Import Image from Next.js
import { useParams } from "next/navigation"; // Import useParams for navigation (client-only)
import Loading from "@/app/components/Loading"; // Import Loading component
import { useAppContext } from "@/app/context/AppContext"; // Custom hook for React context
import Navbar from "../../components/NavBar"; // Import Navbar component

const Product = () => {
  // Extract product ID from URL params
  const { id } = useParams();

  // Get products, router, and addToCart function from context
  const { products, router, addToCart } = useAppContext();

  // Local state for main image and product data
  const [mainImage, setMainImage] = useState(null);
  const [productData, setProductData] = useState(null);

  // Fetch product data by ID and set the state
  const fetchProductData = async () => {
    const product = products.find((product) => product._id === id);
    if (product) {
      setProductData(product);
    }
  };

  // Fetch product data when the component mounts or when ID/products change
  useEffect(() => {
      fetchProductData();
  }, [id, products.length]);

  // Render loading state if product data is not yet available
  // if (!productData) {
  //   return <Loading />;
  // }

  return productData ? (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Main Image Section */}
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
              <Image
                src={mainImage || productData.image[0]}
                alt={productData.name || "Product Image"}
                className="w-full h-auto object-cover mix-blend-multiply"
                width={1280}
                height={720}
                unoptimized={true}
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {productData.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(image)}
                  className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                >
                  <Image
                    src={image}
                    alt={productData.name || "Product Image"} 
                    className="w-full h-auto object-cover mix-blend-multiply"
                    width={1280}
                    height={720}
                    unoptimized={true}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
              {productData.name}
            </h1>
            {/* Rating Section */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <Image
                  src={assets.star_icon}
                  alt="star_icon"
                  className="h-4 w-4"
                />
                <Image
                  src={assets.star_icon}
                  alt="star_icon"
                  className="h-4 w-4"
                />
                <Image
                  src={assets.star_dull_icon}
                  alt="star_dull_icon"
                  className="h-4 w-4"
                />
                <Image
                  src={assets.star_dull_icon}
                  alt="star_dull_icon"
                  className="h-4 w-4"
                />
                <Image
                  src={assets.star_icon}
                  alt="star_dull_icon"
                  className="h-4 w-4"
                />
              </div>
              <p>(4.5)</p>
            </div>
            {/* Description */}
            <p className="text-gray-600 mt-3">{productData.description}</p>
            {/* Pricing */}
            <p className="text-3xl font-medium mt-6">
              ${productData.offerPrice}
              <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                ${productData.price}
              </span>
            </p>
            <hr className="bg-gray-600 my-6" />
            {/* Product Specifications Table */}
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full max-w-72">
                <tbody>
                  <tr>
                    <td className="text-gray-600 font-medium">Brand</td>
                    <td className="text-gray-800/50">Generic</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium">Color</td>
                    <td className="text-gray-800/50">Multi</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium">Category</td>
                    <td className="text-gray-800/50">{productData.category}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Action Buttons */}
            <div className="flex items-center mt-10 gap-4">
              <button
                onClick={() => addToCart(productData._id)}
                className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(productData._id);
                  router.push("/cart");
                }}
                className="w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-4 mt-16">
            <p className="text-3xl font-medium">
              Featured <span className="font-medium text-orange-600">Products</span>
            </p>
            <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
            {products.slice(0, 5).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
            See More
          </button>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default Product;