/* eslint-disable @next/next/no-img-element */
// /components/Hero.tsx

import React from "react";
import Link from "next/link";
import { FaCode, FaDatabase, FaLink, FaRocket } from "react-icons/fa";

const Hero: React.FC = () => {
  return (
    <section>
      <div className="max-w-screen-xl flex px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
            The Ultimate API for Vehicles Data
          </h1>
          <p className="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl text-gray-400">
            Access comprehensive vehicle information from around the globe.
            Simplify your automotive data needs with our powerful API.
          </p>
          <Link href="/register/" passHref>
            <button className="inline-flex border-image items-center justify-center px-5 py-3 mr-3 text-base font-medium hover:text-yellow-100 text-white border">
              Get started
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </Link>
          <Link href="/documentation" passHref>
            <button className="inline-flex border-image items-center justify-center px-5 py-3 hover:text-yellow-100 text-base font-medium text-white border">
              Learn more
            </button>
          </Link>
        </div>
        <div className="hidden lg:flex lg:max-w-36 lg:max-h-36 xl:max-w-52 xl:max-h-52">
          <img src="/favicon.png" alt="favicon" />
        </div>
      </div>
      <div className="relative overflow-hidden w-full h-full">
        <div className="animate-swipe">
          <div className="relative flex">
            <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-10">
              <div className="flex items-start w-1/2 space-x-3">
                <FaCode className="text-3xl text-blue-300" />
                <div className="">
                  <h3 className="text-xl font-semibold text-blue-400">
                    Developer-Friendly
                  </h3>
                  <p className="text-sm md:text-lg text-gray-100">
                    We’ve crafted our API with simplicity in mind. With
                    straightforward, clear documentation, you’ll be up and
                    running in no time, focusing on building rather than
                    troubleshooting. fast.
                  </p>
                </div>
              </div>
            </div>
            <img
              src="/hero1.jpg"
              alt="Hero 1"
              className="w-screen max-h-96 object-cover"
            />
          </div>
          <div className="relative flex">
            <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-10">
              <div className="flex items-start w-1/2 space-x-3">
                <FaDatabase className="text-3xl text-green-300" />
                <div>
                  <h3 className="text-xl font-semibold text-green-400">
                    Comprehensive Data
                  </h3>
                  <p className="text-sm md:text-lg text-gray-100">
                    Gain instant access to a wealth of detailed vehicle
                    specifications, from performance metrics to technical
                    features, ensuring you have all the information you need in
                    one place.
                  </p>
                </div>
              </div>
            </div>
            <img
              src="/hero2.jpg"
              alt="Hero 2"
              className="w-screen max-h-96 object-cover"
            />
          </div>
          <div className="relative flex">
            <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-10">
              <div className="flex items-start w-1/2 space-x-3">
                <FaLink className="text-3xl text-purple-300" />
                <div>
                  <h3 className="text-xl font-semibold text-purple-400">
                    Effortless Integration
                  </h3>
                  <p className="text-sm md:text-lg text-gray-100">
                    Seamlessly integrate Vehix API into your application with
                    just a few lines of code, making it quick and easy to start
                    utilizing powerful vehicle data.
                  </p>
                </div>
              </div>
            </div>
            <img
              src="/hero3.jpg"
              alt="Hero 3"
              className="w-screen max-h-96 object-cover"
            />
          </div>
          <div className="relative flex">
            <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-10">
              <div className="flex items-start w-1/2 space-x-3">
                <FaRocket className="text-3xl text-red-300" />
                <div>
                  <h3 className="text-xl font-semibold text-red-400">
                    High Performance
                  </h3>
                  <p className="text-sm md:text-lg text-gray-100">
                    Experience fast response times, thanks to our highly
                    optimized infrastructure, ensuring your applications run
                    smoothly and efficiently.
                  </p>
                </div>
              </div>
            </div>
            <img
              src="/hero4.jpeg"
              alt="Hero 4"
              className="w-screen max-h-96 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
