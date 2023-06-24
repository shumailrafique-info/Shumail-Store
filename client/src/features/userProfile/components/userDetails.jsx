import React from "react";
import { useSelector } from "react-redux";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const UserDetails = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="mt-6 border-t border-gray-100">
      <dl className="divide-y divide-gray-100">
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Full name
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
            {user && user.name}
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Email address
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
            {user && user.email}
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Total purchase
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            $120,000
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">Role</dt>
          <dd
            className={` mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0 capitalize ${
              user && user.role === "admin" && "text-green-500"
            }`}
          >
            {user && user.role}
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <div className="text-sm font-medium leading-6 text-gray-900">
            Addresses
          </div>
          <div className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <div
              role="list"
              className="divide-y divide-gray-100 rounded-md border border-gray-200"
            >
              <div className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                <div className="flex w-0 flex-1 items-center">
                  <PaperClipIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <div className="ml-4 flex min-w-0 flex-1 gap-2">
                    <span className="truncate font-medium">
                      resume_back_end_developer.pdf
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <Link
                    to={"/profile"}
                    className="font-medium text-red-600 hover:text-red-500"
                  >
                    Delete
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                <div className="flex w-0 flex-1 items-center">
                  <PaperClipIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <div className="ml-4 flex min-w-0 flex-1 gap-2">
                    <span className="truncate font-medium">
                      coverletter_back_end_developer.pdf
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <Link
                    to={"/profile"}
                    className="font-medium text-red-600 hover:text-red-500"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dl>
    </div>
  );
};

export default UserDetails;
