// "use client" tells Next.js this is a **Client Component**.
// It must be declared at the top if you use:
// - React hooks (like useState, useEffect)
// - Context hooks (like useAppContext)
// - `useParams` or any navigation feature from `next/navigation`
// Without this directive, Next.js assumes the file is a Server Component.
"use client";

import { useEffect, useState } from "react";
import { assets } from "../../../assets/assets";
import ProductCard from "../../components/ProductCard";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation"; // useParams is client-only
import Loading from "../../components/Loading";
import { useAppContext } from "../../context/AppContext"; // custom hook using React context
import React from "react";
import { PaystackButton } from "react-paystack";
import dynamic from "next/dynamic";

const Product = () => {
  const PaystackButton = dynamic(
    () => import("react-paystack").then((mod) => mod.PaystackButton),
    { ssr: false }
  );
  // Get the dynamic route parameter (e.g., product ID)
  const { id } = useParams();

  // Get products, router, and addToCart function from context
  const { products, router, addToCart } = useAppContext();

  // Local state for main image and product data
  const [mainImage, setMainImage] = useState(null);
  const [productData, setProductData] = useState(null);

  // Find the product by ID and set the state
  const fetchProductData = async () => {
    const product = products.find((product) => product._id === id);
    setProductData(product);
  };

  // When the component mounts or when the ID/products change, fetch the product data
  useEffect(() => {
    fetchProductData();
  }, [id, products.length]);

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_TEST_PUBLIC_KEYS;
  const amountInNaira = productData ? productData.offerPrice * 1600 : 0;

  const paystackconfig = {
    reference: new Date().getTime().toString(),
    email: "buyeremail@gmail.com",
    amount: amountInNaira,
    publicKey,
    metadata: {
      custom_fields: [
        {
          display_name: "Product Name",
          variable_name: "product_name",
          value: productData?.name,
        },
      ],
    },
    text: "Buy Now",
    onSuccess: () => {
      toast.success("Your Payment Was successful !! 🎉");
    },
    onclose: () => toast("Payment was cancelled. 🫠❌"),
  };
  return productData ? (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
              <Image
                unoptimized={true}
                src={mainImage || productData.image[0]}
                alt="alt"
                className="w-full h-auto object-cover mix-blend-multiply"
                width={1280}
                height={720}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {productData.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(image)}
                  className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                >
                  <Image
                    unoptimized={true}
                    src={image}
                    alt="alt"
                    className="w-full h-auto object-cover mix-blend-multiply"
                    width={1280}
                    height={720}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
              {productData.name}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_dull_icon}
                  alt="star_dull_icon"
                />
              </div>
              <p>(4.5)</p>
            </div>
            <p className="text-gray-600 mt-3">{productData.description}</p>
            <p className="text-3xl font-medium mt-6">
              ${productData.offerPrice}
              <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                ${productData.price}
              </span>
            </p>
            <hr className="bg-gray-600 my-6" />
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full max-w-72">
                <tbody>
                  <tr>
                    <td className="text-gray-600 font-medium">Brand</td>
                    <td className="text-gray-800/50 ">Generic</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium">Color</td>
                    <td className="text-gray-800/50 ">Multi</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium">Category</td>
                    <td className="text-gray-800/50">{productData.category}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <PaystackButton
              className="w-full mt-4 py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition"
              {...paystackconfig}
            />
          </div>
        </div>
        x{/* Featured Products Section */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-4 mt-16">
            <p className="text-3xl font-medium">
              Featured{" "}
              <span className="font-medium text-orange-600">Products</span>
            </p>
            <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
            {products.slice(0, 5).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
            See more
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
