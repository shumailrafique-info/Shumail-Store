import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../productAPI";
import { useAlert } from "react-alert";
import { clearErrorProduct } from "../productSlice";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { StarIcon } from "@heroicons/react/20/solid";
import { addItemsToCart } from "../../cart/cartAPI";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, selectedProduct } = useSelector((state) => state.product);
  console.log(error, selectedProduct);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrorProduct());
    }
  }, [alert, dispatch, error]);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  const handleAddtoCart = async () => {
    await dispatch(addItemsToCart(selectedProduct._id, quantity));
    alert.success("Item Added");
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1300 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 1300, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 670 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 670, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-6 lg:px-8">
      <div className="grid grid-cols-4 gap-4 pt-6">
        {/* first Colume */}
        <div className="col-span-4 md:col-span-2 lg:col-span-2  flex items-center justify-center">
          {selectedProduct && (
            <div className="bg-blue-500 w-[300px] h-[500px] lg:w-[350px] lg:h-[580px]">
              <Carousel responsive={responsive} className="w-100 h-100">
                {selectedProduct.images.map((image, index) => (
                  <div key={index} className="w-[300px] h-[500px] relative lg:w-[350px] lg:h-[580px]">
                    <img
                      style={{ objectFit: "cover" }}
                      className="h-[100%] w-[100%]"
                      src={image.url}
                      alt={index}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          )}
        </div>
        {/* Second Colume */}
        <div className="col-span-4 md:col-span-2 lg:col-span-2 flex items-center justify-center md:justify-start md:items-start">
          {selectedProduct && (
            <div className="mt-4 flex flex-col items-center justify-center md:justify-start md:items-start mb-5">
              <h1
                style={{ fontFamily: "Roboto" }}
                className="text-3xl font-bold text-gray-600 pb-1"
              >
                {selectedProduct.title}
              </h1>
              <p
                style={{ fontFamily: "Roboto" }}
                className=" text-gray-600 py-2 mb-2"
              >
                Product #{selectedProduct._id}
              </p>
              <hr />
              <div className="flex items-center my-2">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      selectedProduct.ratings > rating
                        ? "text-yellow-500"
                        : "text-gray-300",
                      "h-7 w-7 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
                <p className="text-sm mx-2 text-gray-500">
                  ( {selectedProduct.reviews.length} Reviews)
                </p>
              </div>
              <hr />
              <div className="my-5">
                <h1 className="text-xl line-through font-[Roboto] font-bold text-gray-500">
                  ${selectedProduct.price}
                </h1>
                <h1 className="text-3xl font-[Roboto] font-bold text-gray-600 mt-2">
                  $
                  {Math.round(
                    selectedProduct.price *
                      (1 - selectedProduct.discountPercentage / 100)
                  )}
                </h1>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex ">
                  <button
                    onClick={() =>
                      setQuantity(quantity > 1 ? quantity - 1 : quantity)
                    }
                    className="text-xl bg-blue-600 hover:bg-blue-700 text-white w-[35px] h-[35px]"
                  >
                    -
                  </button>
                  <p className="w-[35px] flex items-center justify-center">
                    {quantity}
                  </p>
                  <button
                    onClick={() =>
                      setQuantity(
                        quantity < selectedProduct.Stock
                          ? quantity + 1
                          : quantity
                      )
                    }
                    className="text-xl bg-blue-600 hover:bg-blue-700 text-white w-[35px] h-[35px]"
                  >
                    +
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleAddtoCart}
                    style={{ borderRadius: "25px" }}
                    className="text-sm bg-blue-600 hover:bg-blue-700 text-white p-1 px-2 h-[35px]"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="py-5">
                <hr />
                <hr />
                <hr />
                <p className="my-2">
                  Status :{" "}
                  {
                    <span
                      className={
                        selectedProduct.Stock > 0
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      {selectedProduct.Stock > 0 ? "InStock" : "Out of Stock"}
                    </span>
                  }
                </p>
                <hr />
                <hr />
                <hr />
              </div>
              <div className="my-2 flex flex-col justify-center items-center md:justify-start md:items-start">
                <h2>Description :</h2>
                <p className="text-sm text-gray-600 text-center md:text-start">
                  {selectedProduct.description}
                </p>
              </div>
              <div className="mt-8">
                <button
                  style={{ borderRadius: "25px" }}
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white p-1 px-4 h-[40px]"
                >
                  Submit Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
