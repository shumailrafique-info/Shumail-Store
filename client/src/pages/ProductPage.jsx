import React from "react";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/footer/Footer";
import ProductsList from "../features/product/components/ProductsList";

const Product = () => {
  return (
    <>
      <div>
        <Navbar>
          <ProductsList></ProductsList>
        </Navbar>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Product;
