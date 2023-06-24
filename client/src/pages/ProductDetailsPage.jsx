import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductDetails from "../features/product/components/ProductDetails.jsx";

const ProductDetailsPage = () => {
  return (
    <div>
      <Navbar>
        <ProductDetails></ProductDetails>
      </Navbar>
    </div>
  );
};

export default ProductDetailsPage;
