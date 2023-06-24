import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { logoutLoginUser } from "../../auth/authAPI";
import { clearMessage } from "../../auth/authSlice";
import { useAlert } from "react-alert";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navlinks = [
  {
    lebal: "Personal info",
    to: "/profile",
  },
  {
    lebal: "My Orders",
    to: "/profile/orders",
  },
  {
    lebal: "Edit Profile",
    to: "/profile/edit",
  },
  {
    lebal: "Change Password",
    to: "/profile/change",
  },
];

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const LogoutHandler = async () => {
    await dispatch(logoutLoginUser());
    alert.success("Logged out");
    await dispatch(clearMessage());
  };

  return (
    <div className=" bg-white mx-auto  px-4 py-16 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-0">
      {!user && navigate("/")}
      {user && (
        <div className="grid grid-cols-6 gap-4 p-5 pt-1 lg:py-10 relative">
          {/* First Col */}
          <div className="col-span-6 sm:col-span-6 md:col-span-2 mx-auto">
            <div className="pt-1 sm:pt-1 ">
              <Menu
                as="div"
                className=" inline-block text-left absolute -top-10 right-0 md:hidden"
              >
                <div>
                  <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                      />
                    </svg>
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={"/orders"}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            My Orders
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={"/edit/profile"}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Edit Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={"/change/password"}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Change Password
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="submit"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full px-4 py-2 text-left text-sm text-red-500"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <div>
                <img
                  className="rounded-full h-25 w-25"
                  src={user && user.avatar.url}
                  alt="Your Company"
                />
              </div>

              <div className="hidden md:block bg-white w-full rounded-md">
                <div className="flex flex-col items-baseline mt-5">
                  {navlinks.map((item) => (
                    <Link
                      to={item.to}
                      className={
                        "text-black hover:text-gray-500 rounded-md px-2 py-2 text-md font-medium hover:bg-gray-300 w-full"
                      }
                    >
                      {item.lebal}
                    </Link>
                  ))}

                  {user && (
                    <div
                      onClick={LogoutHandler}
                      className={
                        "text-red-500 cursor-pointer hover:text-gray-500 rounded-md px-2 py-2 text-sm font-medium hover:bg-gray-300 w-full"
                      }
                    >
                      Logout
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Second Col */}
          <div className="col-span-6 sm:col-span-6 md:col-span-4">
            <Outlet></Outlet>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
