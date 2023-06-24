import { Fragment } from "react";
import "./navbar.scss";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutLoginUser } from "../auth/authAPI";
import { useAlert } from "react-alert";
import { clearMessage } from "../auth/authSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ children }) {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);


  const LogoutHandler = async () => {
    await dispatch(logoutLoginUser());
    alert.success("Logged out");
    await dispatch(clearMessage());
  };
  return (
    <>
      <div className="min-h-full navbar sticky top-0 z-50">
        <Disclosure
          style={{ borderBottom: "1px solid rgba(0,0,0,.2)" }}
          as="nav"
          className="bg-white sticky top-0 z-50"
        >
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 flex items-center">
                      <Link to={"/"}>
                        <img
                          className="rounded-full h-10 w-10 "
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEX///8BAQEAAAChoaGSkpLY2NhFRUVzc3Pm5ub09PSbm5uwsLCFhYWKiorR0dEKCgrBwcErKys3Nzerq6t9fX1ZWVnHx8e5ubkwMDBOTk5AQEBiYmJqamry8vJTU1NwcHASEhIgICAfXgZ8AAAD9klEQVR4nO3d63baMBCFUVdAQ+KEXLiFNrTN+79kgZULELBnZM2cMTnf/7C0F2AbyXKqijHGGGOMMcYYY4wxxhhjjDHGGGvpejn7lRTdP83vHtCDVjT6rdF99jJCj1zWer4Z7I+MNn/2Z40evaCHPN47cooef2vDLsAtcYYWtHTXybczXqENjXUHBieWAIYmlgEGJpYChiWWAwYllgSGJJYFBiSWBoYjlgcGI1oAQxFtgIGIVsAwRDtgEKIlMATRFhiAaA2EE+2BYKIHEEr0AQKJXkAY0Q+4IdaXDrwlkEACj7u5dOCi29pEfOC1Cti2aBgQWP3VAZfjhibNRAxwrHkLU2pZvB41vRoGWM1KAhuJIGCleAsFwAYiCjgpDDxLRAEV50Ih8AwRBpQfScXAk0QcsFoJhQrgCSIQWD3LhCrgFyISWD2KhErgEREKlAnVwAMiFigSZgD3iGCgRJjSIueV34hooEy4zHrpHREOFH5K8+bGNkQ8UHqkySXigeKzRR5xXHi0OYnP+IhJ3CLJr9r6SlRcefeUOFD8euonUfULuJ9E1SxGL4m3qpmoPhLXutnEPhI104nbHRQjQeNrtOqgorP6n3uC8i7XTWqZis9qh7wN805ObdaeNsYBmvae1QJiSis07b0bqyXE9C/KJ9WOeE+iWyReBtFGSKJnJF4G8RscbkgkkcQIfYsjKokk9oL4DQ43JJJIYoR4RL0E4vTyiZPMp7X1iFjNjIzpFS37aH0nf5KgivgbLdtrNLha/RT0qiMGWkQV96RbT0YPNycdMf5jFU+kIaZH9GizUhEj3J6pT0GMs9CvS05ML+ixZiYmpif0UHOTEvt5vtglJCKF00m3v5cRgcI6pY7PqhYRccJ6exXtQIQJ691+nq5EwS8NlLB+25PVjSi5bxUkrD/21XUhim7MxQjrvb2R+UTZnccQYb3/9ckmCm+tRgjrw+NDJlF67zhAWB8fALOI4pvj/X8gfgFmEeV3/6e5haKhE8AMomJ7QxraQM51Eqgmqh4H0/HqV9kZoJKoe96NneZEZ4Eqom4HjuuHtAGoICq3GHkuXTQCt4MZSnrRzXl7voUtQPF+JxXQ82TYCjQoeU6WYoCOZwoCCQwONLsXIQqw0p3CegisqitvojfQnegPdCYigK5EDNCRiAK6EXFAJyIS6ELEAh2IaKA5EQ80JkYAmhJjAA2JUYBmxDhAI2IkoAkxFtCAGA1YnBgPWJgYEViUGBO4JRYyRgVu/z9SEWLnO8cMWxTYC5TSPMzeplMNtatlx7z0nPWkc8/qlXzD09dmUb+Bh42W00FG9aKfGykYY4wxxhhjjDHGGGOMMcYYY4wxxj77Dy4PSeZ9ts6OAAAAAElFTkSuQmCC"
                          alt="Your Company"
                        />
                      </Link>
                      <span className="text-2xl -ml-1">HumailStore</span>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-2">
                        <Link
                          to={"/about"}
                          className={classNames(
                            "text-black hover:text-gray-500 rounded-md px-2 py-2 text-sm font-medium"
                          )}
                        >
                          About
                        </Link>
                        <Link
                          to={"/about"}
                          className={classNames(
                            "text-black hover:text-gray-500 rounded-md px-2 py-2 text-sm font-medium"
                          )}
                        >
                          Contact
                        </Link>
                        <Link
                          to={"/products"}
                          className={classNames(
                            "text-black hover:text-gray-500 rounded-md px-2 py-2 text-sm font-medium"
                          )}
                        >
                          Products
                        </Link>
                        {!user && (
                          <Link
                            to={"/login"}
                            className={classNames(
                              "text-black hover:text-gray-500 rounded-md px-2 py-2 text-sm font-medium"
                            )}
                          >
                            Login
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <Link
                        to={"/cart"}
                        type="button"
                        className="rounded-full p-1 text-gray-400 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-500"
                      >
                        <ShoppingCartIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </Link>
                      <span className="inline-flex items-center rounded-md mb-5 -ml-3 bg-green-300 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {cartItems.length}
                      </span>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          {user && (
                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="sr-only">Open user menu</span>
                              {user && (
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={user.avatar.url}
                                  alt=""
                                />
                              )}
                            </Menu.Button>
                          )}
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {/* {userNavigation.map((item) => (
                              
                            ))} */}
                            <Menu.Item>
                              <Link
                                to={"/profile"}
                                className={classNames(
                                  "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                                )}
                              >
                                Profile
                              </Link>
                            </Menu.Item>
                            <Menu.Item>
                              <Link
                                onClick={LogoutHandler}
                                className={classNames(
                                  "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                                )}
                              >
                                Logout
                              </Link>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-70 focus:outline-none focus:ring-2 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-10 w-10"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-10 w-10"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  <hr />
                  <Link
                    as="a"
                    to={"/about"}
                    className={classNames(
                      "text-gray-700 hover:bg-gray-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    About
                  </Link>
                  <hr />
                  <Link
                    as="a"
                    to={"/contact"}
                    className={classNames(
                      "text-gray-700 hover:bg-gray-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    Contact
                  </Link>
                  <hr />
                  <Link
                    as="a"
                    to={"/products"}
                    className={classNames(
                      "text-gray-700 hover:bg-gray-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    Products
                  </Link>
                  {!user && (
                    <>
                      <hr />

                      <Link
                        to={"/login"}
                        className={classNames(
                          "text-gray-700 hover:bg-gray-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                        )}
                      >
                        Login
                      </Link>
                    </>
                  )}
                  {!user && (
                    <>
                      <hr />

                      <Link
                        to={"/cart"}
                        className={classNames(
                          "text-gray-700 hover:bg-gray-400 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                        )}
                      >
                        Cart
                      </Link>
                    </>
                  )}
                </div>
                {user && (
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      {user && (
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.avatar.url}
                            alt=""
                          />
                        </div>
                      )}
                      {user && (
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-black pb-1">
                            {user.name}
                          </div>
                          <div className="text-sm font-medium leading-none text-gray-400">
                            {user.email}
                          </div>
                        </div>
                      )}
                      <Link
                        type="button"
                        to={"/cart"}
                        className={`${
                          user ? "ml-auto" : ""
                        } flex-shrink-0 rounded-full p-1 text-gray-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}
                      >
                        <ShoppingCartIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </Link>
                      <span className="inline-flex items-center rounded-md mb-5 -ml-3 bg-green-300 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {cartItems.length}
                      </span>
                    </div>
                    {user && (
                      <div className="mt-3 space-y-1 px-2">
                        <hr />
                        <Disclosure.Button
                          as="a"
                          to={"/profile"}
                          className="block rounded-md px-3 py-1 text-base font-medium text-gray-700 hover:bg-gray-700 hover:text-white"
                        >
                          Profile
                        </Disclosure.Button>
                        <hr />
                        <Disclosure.Button
                          as="a"
                          to={"/Logout"}
                          className="block rounded-md px-3 py-1 text-base font-medium text-gray-700 hover:bg-gray-700 hover:text-white"
                        >
                          Logout
                        </Disclosure.Button>
                        <hr />
                      </div>
                    )}
                  </div>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              E-Commerce
            </h1>
          </div>
        </header> */}
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
}
