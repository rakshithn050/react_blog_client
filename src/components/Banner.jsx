import React from "react";
import "../assets/banner.css";

function Banner() {
  return (
    <div class="shadow-lg rounded-2xl p-4 my-5 gradient">
      <div class="flex items-center">
        <div class="flex-shrink-0 ml-3">
          <span class="text-2xl font-bold leading-none text-white dark:text-white sm:text-3xl">
            Update Post
          </span>
        </div>
        <div class="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-green-500 ">
          <nav className="flex justify-end my-5" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <a
                  href="#"
                  class="inline-flex items-center text-sm font-medium text-slate-200 hover:text-white dark:text-slate-200 dark:hover:text-white"
                >
                  <svg
                    class="mr-2 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  Home
                </a>
              </li>
              <li>
                <div class="flex items-center">
                  <svg
                    class="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="ml-1 text-sm font-medium text-slate-300 md:ml-2 dark:text-slate-300">
                    Flowbite
                  </span>
                </div>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <svg
                    class="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="ml-1 text-sm font-medium text-slate-400 md:ml-2 dark:text-slate-400">
                    Flowbite
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Banner;
