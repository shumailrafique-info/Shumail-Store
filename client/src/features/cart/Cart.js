import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className="mx-auto mt-4 max-w-7xl px-4 bg-white sm:px-6 lg:px-8">
      <h1 className="text-4xl text-center py-3 font-bold tracking-tight text-gray-900">
        Cart
      </h1>
      {cartItems.length > 0 ? (
        <>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flow-root">
              <div role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.map((product) => (
                  <div key={product.id} className="flex py-6">
                    <div className="w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.image}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <span>{product.title}</span>
                          </h3>
                          <p className="ml-4">${product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.color}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty
                          </label>
                          <select name="cars" className="ml-4" id="cars">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>$262.00</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to={"/checkout"}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link
                  type="button"
                  to={"/"}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  &nbsp; Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="h-[70vh] w-100 flex justify-center items-center">
          <h1>No item in Cart</h1>
        </div>
      )}
    </div>
  );
}
