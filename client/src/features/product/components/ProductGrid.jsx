import React from "react";
import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/outline";

const ProductGrid = ({ products = [] }) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-3 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-4">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <Link
              key={product._id}
              to={`product/${product._id}`}
              className="group relative"
            >
              <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
                <img
                  src={product.images[0].url}
                  alt={product.imageAlt}
                  className="h-full w-full min-h-[300px] object-cover lg:h-full lg:w-full sm:min-h-[300px] image-changer"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <span>
                      <span aria-hidden="true" className="" />
                      {product.title}
                    </span>
                  </h3>
                  {product.ratings >= 1 ? (
                    <div className="flex items-center gap-1">
                      <span>
                        <StarIcon className="w-6 h-6"></StarIcon>
                      </span>
                      <span>{product.ratings}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400 line-through">
                    ${product.price}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    $
                    {Math.round(
                      product.price * (1 - product.discountPercentage / 100)
                    )}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
