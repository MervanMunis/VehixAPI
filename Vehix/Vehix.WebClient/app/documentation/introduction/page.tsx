/* eslint-disable react/no-unescaped-entities */
// /app/documentation/introduction/page.tsx
"use client";

import React, { useState } from "react";
import { FaJs } from "react-icons/fa";
import { FaRegClipboard } from "react-icons/fa6";
import { FiLoader } from "react-icons/fi";

const Introduction: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const codeString = `fetch('https://api.vehixapi.com/vehicles/all', {
    headers: { 'X-API-KEY': '<YOUR_API_KEY_HERE>' }
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`;

  const handleCopy = async () => {
    setIsLoading(true);
    await navigator.clipboard.writeText(codeString);
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };

  return (
    <div className="mx-auto text-base md:p-9 text-gray-300">
      {/* Page Header */}
      <h1 className="text-3xl font-bold">Vehix API Introduction</h1>

      {/* Overview Section */}
      <section className="md:p-9">
        <h2 className="mb-4 text-2xl font-bold text-gray-200">
          What is Vehix API?
        </h2>
        <p className="leading-relaxed">
          The <strong>Vehix API</strong> is a comprehensive and flexible API
          designed to provide real-time information about vehicles manufactured
          globally. Whether you're developing a vehicle comparison tool, a
          dealership platform, or an analytical solution, Vehix API delivers a
          wide range of vehicle data including brand, model, year, engine
          specifications, fuel type, transmission, and more.
        </p>
      </section>

      {/* Key Features */}
      <section className="md:p-9 mt-8 md:mt-0">
        <h2 className="mb-4 text-xl font-bold text-gray-200">
          Key Features of Vehix API
        </h2>
        <p className="mb-4">
          Vehix API has been crafted with developers in mind, offering
          flexibility and powerful data to make it easier for you to integrate
          vehicle information into your applications. Some of the key features
          include:
        </p>
        <ol className="list-disc list-inside space-y-4">
          <li className="ml-4">
            <strong className="font-bold">Comprehensive Data Coverage:</strong>
            <p className="ml-8 mt-2">
              Access detailed vehicle data by brand, model, or year, ensuring
              you have all the necessary information for your users.
            </p>
          </li>
          <li className="ml-4">
            <strong className="font-bold">Flexible Filtering:</strong>
            <p className="ml-8 mt-2">
              Filter vehicles based on various attributes such as fuel type,
              body type, transmission, and more to tailor the data to your
              needs.
            </p>
          </li>
          <li className="ml-4">
            <strong className="font-bold">Paginated Results:</strong>
            <p className="ml-8 mt-2">
              For larger datasets, leverage pagination to ensure efficient and
              performance-optimized data retrieval.
            </p>
          </li>
          <li className="ml-4">
            <strong className="font-bold">Real-Time Data:</strong>
            <p className="ml-8 mt-2">
              Vehix API is constantly updated with the latest data, ensuring
              your users are always presented with accurate vehicle information.
            </p>
          </li>
          <li className="ml-4">
            <strong className="font-bold">High Availability:</strong>
            <p className="ml-8 mt-2">
              The API is designed with high availability in mind, ensuring
              reliable access to data around the clock.
            </p>
          </li>
        </ol>
      </section>

      {/* API Usage */}
      <section className="md:p-9 mt-8 md:mt-0">
        <h2 className="mb-4 text-xl font-bold text-gray-200">
          How to Use the Vehix API
        </h2>
        <p className="mb-4">
          Using the Vehix API is simple and accessible to everyone. To get
          started, simply make a GET request to the appropriate endpoint. Here
          is an example:
        </p>
        <div className="bg-[#1f2125] rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="space-x-2 flex items-center">
              <FaJs className="w-5 h-5" />
              <h2 className="font-semibold">JavaScript Code Example:</h2>
            </div>
            <span className="bg-green-400 text-black text-base px-2 py-1 rounded-lg">
              GET Request
            </span>
          </div>
          <div className="relative">
            <pre className="bg-[#131518] rounded p-4 text-base text-green-400 overflow-auto">
              <code className="overflow-x-auto text-green-300">
                {codeString}
              </code>
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-2 bg-[#1f2125] text-white rounded hover:bg-gray-600"
              aria-label="Copy"
            >
              {isLoading ? (
                <FiLoader className="w-5 h-5 animate-spin" />
              ) : (
                <FaRegClipboard className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="md:p-9 mt-8 md:mt-0">
        <h2 className="mb-4 text-xl font-bold text-gray-200">
          Best Practices for Using Vehix API
        </h2>
        <p className="ml-8 mt-2">
          To make the most of the Vehix API, we recommend following these best
          practices:
        </p>
        <ol className="list-disc list-inside space-y-4">
          <li className="ml-4">
            <strong className="font-medium">Rate Limiting:</strong>
            <p className="ml-8 mt-2">
              Ensure that your application respects the rate limits imposed by
              the API to avoid being throttled. Exceeding rate limits will
              result in a 429 (Too Many Requests) error.
            </p>
          </li>
          <li className="ml-4">
            <strong className="font-medium">Cache Responses:</strong>
            <p className="ml-8 mt-2">
              To minimize unnecessary API requests and optimize your
              application's performance, cache frequently requested data such as
              vehicle models and specifications.
            </p>
          </li>
          <li className="ml-4">
            <strong className="font-medium">Error Handling:</strong>
            <p className="ml-8 mt-2">
              Implement robust error handling to gracefully manage API errors,
              such as network issues or incorrect data requests.
            </p>
          </li>
          <li className="ml-4">
            <strong className="font-medium">Optimize Queries:</strong>
            <p className="ml-8 mt-2">
              Use query parameters effectively to fetch only the data you need.
              For example, if you are only interested in vehicles from a certain
              brand, use the <code>brand</code> query parameter to limit the
              data.
            </p>
          </li>
        </ol>
      </section>

      {/* Resources and Support */}
      <section className="md:p-9 mt-8 md:mt-0">
        <h2 className="mb-4 text-xl font-bold text-gray-200">
          Additional Resources
        </h2>
        <p className="mb-4">
          We’re committed to providing the best support for developers using
          Vehix API. Below are some additional resources that may be helpful as
          you get started:
        </p>
        <ol className="list-disc list-inside space-y-4">
          <li className="ml-4">
            <a
              href="/documentation/api-endpoint"
              className="font-semibold underline hover:text-white"
            >
              API Endpoints Documentation
            </a>{" "}
            – Explore all the available endpoints and how to use them.
          </li>
          <li className="ml-4">
            <a
              href="/documentation/response-example"
              className="font-semibold underline hover:text-white"
            >
              Response Examples
            </a>{" "}
            – Check out examples of typical API responses.
          </li>
          <li className="ml-4">
            <a
              href="/documentation/technologies-used"
              className="font-semibold underline hover:text-white"
            >
              Technologies Used
            </a>{" "}
            – See the technology stack that Vehix API.
          </li>
        </ol>
      </section>
    </div>
  );
};

export default Introduction;
