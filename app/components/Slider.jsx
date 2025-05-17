'use client'; // Enable client-side rendering for this component
import Image from "next/image"; // Next.js optimized image component
import React, { useEffect, useState } from "react"; // Import React hooks
import { assets } from "@/assets/assets";

const Slider = () => {
  // Slide data array
  const data = [
    {
      id: 1,
      title: "Experience Next-Gen Gaming",
      offer: "13% OFF on PS5 Accessories",
      primaryBtn: "Buy Now",
      secondaryBtn: "More Info",
      image: assets.header_macbook_image,
    },
    {
      id: 2,
      title: "Feel the Game with DualSense",
      offer: "Special Bundle Deals Available",
      primaryBtn: "Shop Now",
      secondaryBtn: "Learn More",
      image: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Hear Every Detail",
      offer: "Pulse Elite Headset Out Now",
      primaryBtn: "Order Now",
      secondaryBtn: "Specs",
      image: assets.header_headphone_image,
    },
    {
      id: 4,
      title: "New Colors. New Vibe.",
      offer: "Great console covers available",
      primaryBtn: "View Colors",
      secondaryBtn: "Explore",
      image: assets.header_macbook_image,
    },
    {
      id: 5,
      title: "Bold in Crimson",
      offer: "Limited Edition Covers",
      primaryBtn: "Order Now",
      secondaryBtn: "Details",
      image: assets.header_playstation_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0); // Keep track of the current slide index

  // Automatically move to the next slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.length); // Loop back to first after last
    }, 3000);
    return () => clearInterval(interval); // Clear timer on unmount
  }, [data.length]);

  // Change slide when user clicks a dot
  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full">
      {/* Slider Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }} //Move slides horizontally
      >
        {data.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#f8f9fc] py-10 px-5 md:px-16 min-w-full rounded-xl"
          >
            {/* Text Section */}
            <div className="md:pl-8 mt-6 md:mt-0 w-full md:w-1/2">
              <p className="text-sm text-orange-600 font-semibold">{slide.offer}</p>
              <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{slide.title}</h1>
              <div className="flex gap-4 mt-4">
                <button className="px-8 py-3 bg-orange-600 text-white rounded hover:bg-orange-700 transition">
                  {slide.primaryBtn}
                </button>
                <button className="px-12 py-3 border border-orange-600 text-orange-600 rounded hover:bg-orange-50 transition">
                  {slide.secondaryBtn}
                </button>
              </div>
            </div>
            {/* Image Section */}
            <div className="flex justify-center items-center w-full md:w-1/2">
              <Image
                unoptimized
                src={slide.image}
                alt={`Slide ${index + 1}`}
                height={400}
                width={600}
                className="rounded object-contain w-[150px] "
              />
            </div>
          </div>
        ))}
      </div>
      {/* Dots Navigation */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-orange-600 scale-110" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;