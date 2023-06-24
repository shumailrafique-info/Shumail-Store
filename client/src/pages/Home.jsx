import React from "react";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/footer/Footer";
import Slider from "../features/slider/Slider";
import ProductSlider from "../features/productSlider/ProductSlider";
import Categories from "../features/homeCategories/Categories";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Slider></Slider>
      <ProductSlider type={"featured"}></ProductSlider>
      <Categories></Categories>
      <ProductSlider type={"tranding"}></ProductSlider>
      <Footer></Footer>
    </div>
  );
};

export default Home;
