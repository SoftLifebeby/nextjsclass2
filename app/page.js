import React from "react";
import Navbar from "./components/NavBar";
import Slider from "./components/Slider";
import PopularProducts from "./components/PopularProducts";
import FeaturedProducts from "./components/FeaturedProducts";
import Banner from "./components/Banner";
import NewsLetter from "./components/NewsLetter";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      {/* <Loading /> */}
      <FeaturedProducts />
      <PopularProducts />
      <Banner />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
