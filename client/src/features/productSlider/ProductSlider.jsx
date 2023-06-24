import React, { useEffect } from "react";
import "./slider.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeaturedProducts } from "../product/productAPI";

let products = [
  {
    id: 100,
    title: "Crystal chandelier maria theresa for 12 light",
    description: "Crystal chandelier maria theresa for 12 light",
    price: 47,
    discountPercentage: 16,
    rating: 4.74,
    stock: 133,
    brand: "YIOSI",
    category: "lighting",
    thumbnail: "https://i.dummyjson.com/data/products/100/thumbnail.jpg",
    images: [
      { url: "https://i.dummyjson.com/data/products/100/1.jpg" },
      { url: "https://i.dummyjson.com/data/products/100/2.jpg" },
    ],
  },
  {
    id: 96,
    title: "lighting ceiling kitchen",
    description:
      "Wholesale slim hanging decorative kid room lighting ceiling kitchen chandeliers pendant light modern",
    price: 30,
    discountPercentage: 14.89,
    rating: 4.83,
    stock: 96,
    brand: "lightingbrilliance",
    category: "lighting",
    thumbnail: "https://i.dummyjson.com/data/products/96/thumbnail.jpg",
    images: [
      { url: "https://i.dummyjson.com/data/products/100/1.jpg" },
      { url: "https://i.dummyjson.com/data/products/100/2.jpg" },
    ],
  },
  {
    id: 97,
    title: "Metal Ceramic Flower",
    description:
      "Metal Ceramic Flower Chandelier Home Lighting American Vintage Hanging Lighting Pendant Lamp",
    price: 35,
    discountPercentage: 10.94,
    rating: 4.93,
    stock: 146,
    brand: "Ifei Home",
    category: "lighting",
    thumbnail: "https://i.dummyjson.com/data/products/97/thumbnail.jpg",
    images: [
      { url: "https://i.dummyjson.com/data/products/100/1.jpg" },
      { url: "https://i.dummyjson.com/data/products/100/2.jpg" },
    ],
  },
  {
    id: 98,
    title: "3 lights lndenpant kitchen islang",
    description:
      "3 lights lndenpant kitchen islang dining room pendant rice paper chandelier contemporary led pendant light modern chandelier",
    price: 34,
    discountPercentage: 5.92,
    rating: 4.99,
    stock: 44,
    brand: "DADAWU",
    category: "lighting",
    thumbnail: "https://i.dummyjson.com/data/products/98/thumbnail.jpg",
    images: [
      { url: "https://i.dummyjson.com/data/products/100/1.jpg" },
      { url: "https://i.dummyjson.com/data/products/100/2.jpg" },
    ],
  },
  {
    id: 99,
    title: "American Vintage Wood Pendant Light",
    description:
      "American Vintage Wood Pendant Light Farmhouse Antique Hanging Lamp Lampara Colgante",
    price: 46,
    discountPercentage: 8.84,
    rating: 4.32,
    stock: 138,
    brand: "Ifei Home",
    category: "lighting",
    thumbnail: "https://i.dummyjson.com/data/products/99/thumbnail.jpg",
    images: [
      { url: "https://i.dummyjson.com/data/products/100/1.jpg" },
      { url: "https://i.dummyjson.com/data/products/100/2.jpg" },
    ],
  },
];

const ProductSlider = ({ type }) => {
  const dispatch = useDispatch();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1300 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1300, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 670 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 670, min: 0 },
      items: 1,
    },
  };
  const { featuredProducts } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchFeaturedProducts(type));
  }, [dispatch, type]);

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }} className="px-5 pSlide">
      {type === "featured" ? (
        <div className="flex flex-col justify-center items-center gap-2 py-10">
          <span className="text-3xl font-bold sm:text-2xl">
            Featured Products
          </span>
          <span className="text-gray-400 md:bg-transparent text-sm lg:bg-transparent text-center lg:w-[800px] lg:text-lg">
            Featured and popular products are the best-selling items for your
            product, product range, or company. However, a featured product
            could be a new product line or seasonal products instead.
          </span>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-2 py-10">
          <span className="text-3xl font-bold sm:text-2xl">
            {type} Products
          </span>
          <span className="text-gray-400 md:bg-transparent text-sm lg:bg-transparent text-center lg:w-[800px] lg:text-lg">
            Trending products are products that a large number of people are
            searching for, talking about, and buying online. This means that
            there is a large audience who would be willing to buy the product if
            you sold it.
          </span>
        </div>
      )}
      <Carousel responsive={responsive} className="mb-7">
        {type === "featured"
          ? featuredProducts.map((product, i) => (
              <div className="flex items-center justify-center" key={i}>
                <Card item={product}></Card>
              </div>
            ))
          : products.map((product, i) => (
              <div className="flex items-center justify-center" key={i}>
                <Card item={product}></Card>
              </div>
            ))}
      </Carousel>
    </div>
  );
};

export default ProductSlider;
