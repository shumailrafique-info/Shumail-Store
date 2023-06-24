import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { getProuctsByFilters } from "../productAPI.js";
import ProductGrid from "./ProductGrid.jsx";

const sortOptions = [
  { name: "Best Rating", value: "ratings", order: "desc", current: false },
  { name: "Price: Low to High", value: "price", order: "asc", current: false },
  { name: "Price: High to Low", value: "price", order: "desc", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductsList = () => {
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(null);
  const [filter, setFilter] = useState(null);
  const { products, totalProducts, categories } = useSelector(
    (state) => state.product
  );
  const totalPages = Math.ceil(totalProducts / 10);

  const handleSort = (value, order) => {
    const sorting = { _sort: value, _order: order };
    setPage(1);
    setSort(sorting);
  };
  const handleCategory = (e, option, section) => {
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(e.target.value);
      } else {
        newFilter[section.id] = [e.target.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === e.target.value
      );
      newFilter[section.id].splice(index, 1);
    }
    console.log(newFilter);
    setFilter(newFilter);
  };

  useEffect(() => {
    dispatch(getProuctsByFilters(page, sort, filter));
  }, [dispatch, page, sort, filter]);

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
  ];

  return (
    <div className="bg-white ">
      <div className="realtive overflow-hidden">
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-5">
            <h1 className="font-bold tracking-tight text-gray-900 text-2xl sm:text-3xl lg:text-4xl">
              Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              onClick={(e) =>
                                handleSort(option.value, option.order)
                              }
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm cursor-pointer"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1  gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form
                className={`${
                  mobileFiltersOpen === true
                    ? "fixed top-0 right-0"
                    : "fixed top-0 -right-[400px]"
                } border-s border-gray-500  bg-white z-30 w-[300px] h-[100vh] lg:block lg:relative lg:top-0 lg:left-0 lg:border-none transition-all duration-700 overflow-y-scroll lg:h-full controlling-scroll lg:z-0 lg:w-full lg:transition-none md:transition-none`}
              >
                <div className="flex items-center justify-between px-4 lg:hidden py-5">
                  <h2 className="text-2xl font-medium text-gray-900">
                    Filters
                  </h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-12 w-12 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                  </button>
                </div>
                <h3 className="sr-only ">Categories</h3>

                {filters.map((section) => (
                  <div
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6 mx-4"
                  >
                    {
                      <>
                        <h3 className="-my-3 flow-root">
                          <div
                            onClick={() => setShowCategory(!showCategory)}
                            className="cursor-pointer flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                          >
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {showCategory ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </div>
                        </h3>
                        <div className={`pt-6 ${showCategory ? "" : "hidden"}`}>
                          <div className="space-y-4 cursor-pointer">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.name}
                                className="flex items-center"
                              >
                                <input
                                  onClick={(e) =>
                                    handleCategory(e, option, section)
                                  }
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.name}
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600 capitalize cursor-pointer"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    }
                  </div>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <ProductGrid products={products}></ProductGrid>
              </div>
            </div>
          </section>
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          ></Pagination>
        </main>
      </div>
    </div>
  );
};

export default ProductsList;

function Pagination({ page, setPage, totalPages }) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <span
          onClick={() => setPage(page <= 1 ? page : page - 1)}
          className="cursor-pointer relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </span>
        <span
          onClick={() => setPage(page < totalPages ? page + 1 : page)}
          className="cursor-pointer relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </span>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <span
              onClick={() => setPage(page <= 1 ? page : page - 1)}
              className="relative inline-flex items-center cursor-pointer rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array.from({ length: totalPages }).map((item, i) => (
              <span
                key={i}
                onClick={() => setPage(i + 1)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0  cursor-pointer ${
                  page === i + 1 && "bg-indigo-600"
                }`}
              >
                {i + 1}
              </span>
            ))}

            <span
              onClick={() => setPage(page < totalPages ? page + 1 : page)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          </nav>
        </div>
      </div>
    </div>
  );
}
