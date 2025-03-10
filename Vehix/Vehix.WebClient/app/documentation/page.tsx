/* eslint-disable react/no-unescaped-entities */
// /app/documentation/page.tsx
"use client";

import React from "react";
import { FaCode, FaDatabase, FaLink, FaRocket } from "react-icons/fa";

const Documentation: React.FC = () => {
  return (
    <div className="text-gray-300 text-base min-w-fit md:m-5">
      {/* Page Header */}
      <h1 className="text-3xl text-gray-200 mb-4 font-medium">
        Welcome to Vehix API Documentation
      </h1>
      <p className="text-xl mb-8 leading-relaxed">
        Welcome! Step into the world of vehicles with Vehix API. Our simple,
        powerful, and flexible API allows you to access comprehensive data on
        vehicle makes and models quickly and securely. If you're unsure where to
        begin, don’t worry! Start exploring through the sidebar and experience
        the power of the Vehix API. We’re here to guide you every step of the
        way.
      </p>

      {/* Highlight Section */}
      <div className="md:p-9">
        <h2 className="text-2xl font-medium text-gray-200 mb-4">
          Why choose Vehix API?
        </h2>
        <p className="mb-4">
          Unlock a world of real-time data on every vehicle ever manufactured.
          From brand and model to year, engine power, fuel type, and beyond,
          Vehix API delivers the detailed insights you need. Whether you're
          building a project or making data-driven decisions, our API ensures
          you have the most up-to-date and accurate vehicle information at your
          fingertips.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
          <div className="flex items-start space-x-3">
            <FaCode className="text-3xl text-blue-300" />
            <div>
              <h3 className="text-xl font-semibold text-blue-400 group-hover:text-blue-300">
                Developer-Friendly
              </h3>
              <p className="text-lg">
                We’ve crafted our API with simplicity in mind. With
                straightforward, clear documentation, you’ll be up and running
                in no time, focusing on building rather than troubleshooting.
                fast.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <FaDatabase className="text-3xl text-green-300" />
            <div>
              <h3 className="text-xl font-semibold text-green-400 group-hover:text-green-300">
                Comprehensive Data
              </h3>
              <p className="text-lg">
                Gain instant access to a wealth of detailed vehicle
                specifications, from performance metrics to technical features,
                ensuring you have all the information you need in one place.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <FaLink className="text-3xl text-purple-300" />
            <div>
              <h3 className="text-xl font-semibold text-purple-400 group-hover:text-purple-300">
                Effortless Integration
              </h3>
              <p className="">
                Seamlessly integrate Vehix API into your application with just a
                few lines of code, making it quick and easy to start utilizing
                powerful vehicle data.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <FaRocket className="text-3xl text-red-300 " />
            <div>
              <h3 className="text-xl font-semibold text-red-400 group-hover:text-red-300">
                High Performance
              </h3>
              <p className="">
                Experience fast response times, thanks to our highly optimized
                infrastructure, ensuring your applications run smoothly and
                efficiently.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How to Get Started Section */}
      <div className="md:p-9 mt-8 md:mt-0">
        <h2 className="text-xl font-medium text-gray-200 mb-4 underline hover:text-white cursor-pointer">
          <a href="/register">Getting Started with Vehix API</a>
        </h2>
        <p className="mb-4">
          Start unlocking the power of our API in just a few easy steps!
        </p>
        <ol className="list-disc list-inside space-y-4">
          <li className="ml-4">
            <strong className="font-medium">Explore the Documentation:</strong>
            <p className="ml-8 mt-2">
              Use the sidebar to navigate through detailed guides on API
              endpoints, request formats, and more. Everything you need to
              interact with Vehix API is clearly laid out for you.
            </p>
          </li>
          <li className="ml-4">
            <strong className="font-medium">Try Sample Requests:</strong>
            <p className="ml-8 mt-2">
              Get a real sense of the data we provide by experimenting with our
              sample requests. See firsthand the detailed information returned
              by our API.
            </p>
          </li>
          <li className="ml-4">
            <strong className="font-medium">
              Get Your API Key—No Signup Required!
            </strong>
            <p className="ml-8 mt-2">
              Accessing our API is as simple as providing your email address—no
              need for lengthy sign-up processes. Just verify your email, and
              you’ll receive an API key instantly. You can find this key in the
              confirmation email, allowing you to start making requests right
              away.
            </p>
          </li>
          <li className="ml-4">
            <strong className="font-medium">Dive into the API:</strong>
            <p className="ml-8 mt-2">
              Once you have your API key, follow the detailed instructions in
              our documentation to make your first request. It’s quick, easy,
              and puts the power of Vehix API at your fingertips.
            </p>
          </li>
        </ol>
      </div>

      {/* Footer Section */}
      <div className="md:p-9 mt-8 md:mt-0">
        <h2 className="text-xl font-medium text-gray-200 mb-4 underline hover:text-white cursor-pointer">
          <a href="/contact">Need Assistance?</a>
        </h2>
        <p className="">
          We're here to help! Whether you have questions or need support, feel
          free to reach out to our dedicated team or explore our comprehensive
          FAQs for quick answers.
        </p>
      </div>
    </div>
  );
};

export default Documentation;
