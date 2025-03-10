// /app/documentation/api-endpoint/page.tsx
"use client";

import React, { useState } from "react";
import { FaJs, FaRegClipboard } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";

const ApiEndpoint: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeQuery, setActiveQuery] =
    useState<keyof typeof queries>("vehicleType");

  const handleCopy = async () => {
    setIsLoading(true);
    await navigator.clipboard.writeText(queries[activeQuery]);
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };

  const queries = {
    getAll: `// Fetch all vehicles and log the full list
fetch('https://api.vehixapi.com/vehicles/all', {
    headers: { 
      'X-API-KEY': '<YOUR_API_KEY_HERE>',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`,

    vehicleType: `// Fetch all vehicles and then filter by vehicle type
  // ONLY USE THE VALUES=> {car, motorcycle, aircraft, bicycle, watercraft, rail}
fetch('https://api.vehixapi.com/vehicles/query/vehicle-type/0', {
  headers: {
    'X-API-KEY': '<YOUR_API_KEY_HERE>',
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`,

    brand: `// Fetch all vehicles and then filter by brand (e.g., Toyota)
fetch('https://api.vehixapi.com/vehicles/query/brand/toyota', {
  headers: {
    'X-API-KEY': '<YOUR_API_KEY_HERE>',
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`,

    fuelType: `// Fetch all vehicles and then filter by fuel type (e.g., Gasoline)
fetch('https://api.vehixapi.com/vehicles/query/fuel-type/gasoline', {
  headers: {
    'X-API-KEY': '<YOUR_API_KEY_HERE>',
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`,

    bodyType: `// Fetch all vehicles and then filter by body type (e.g., Sedan)
fetch('https://api.vehixapi.com/vehicles/query/body-type/sedan', {
  headers: {
    'X-API-KEY': '<YOUR_API_KEY_HERE>',
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`,

    isClassic: `// Fetch all vehicles and then filter by if it is classic "true" otherwise "false"
fetch('https://api.vehixapi.com/vehicles/query/isClassic?isClassic=true', {
  headers: {
    'X-API-KEY': '<YOUR_API_KEY_HERE>',
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`,

    pagination: `// Fetch all vehicles
fetch('https://api.vehixapi.com/vehicles/all', {
    headers: { 
      'X-API-KEY': '<YOUR_API_KEY_HERE>',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    const pageSize = 10; // Number of vehicles per page
    let pageNumber = 1;  // Change this to the desired page number

    // Implement pagination
    const paginatedVehicles = data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    console.log(paginatedVehicles);
  })
  .catch(error => console.error('Error:', error));`,
  };

  return (
    <div className="mx-auto text-base md:p-9 text-gray-300">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">Vehix API Endpoints</h1>

      {/* Introduction */}
      <p className="mb-8 leading-relaxed">
        The <strong>Vehix API</strong> provides robust access to a comprehensive
        dataset of vehicles manufactured globally. Whether you're building a
        vehicle comparison tool, dealership platform, or analytical solution,
        our API features a wide range of real-time vehicle data, including
        brand, vehicle type, fuel type, body type, and whether the vehicle is
        classified as classic. With flexible filtering options, you can narrow
        down results based on these specific attributes to meet your
        application’s needs. Below, you'll find the details of the primary
        endpoint, which returns the full list of vehicles.
      </p>

      {/* Query Parameters Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Query Parameters</h2>
        <p className="leading-relaxed mb-6">
          You can refine your search results by using query parameters. Here are
          the available parameters for filtering and pagination:
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-700">
          <table className="min-w-full">
            <thead className="bg-[#131518] text-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold tracking-wider">
                  Parameter
                </th>
                <th className="px-6 py-3 text-left font-semibold tracking-wider border-l border-gray-700">
                  Type
                </th>
                <th className="px-6 py-3 text-left font-semibold tracking-wider border-l border-gray-700">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#1f2125] divide-y divide-gray-700 rounded-lg">
              <tr className="hover:bg-[#131518] transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  vehicleType
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 border-l border-gray-700">
                  number
                </td>
                <td className="px-6 py-4 text-sm text-gray-300 border-l border-gray-700">
                  The page number for paginated results.
                </td>
              </tr>
              <tr className="hover:bg-[#131518] transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 border-gray-300">
                  brand
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 border-l border-gray-700">
                  string
                </td>
                <td className="px-6 py-4 text-sm text-gray-300 border-l border-gray-700">
                  Filter by car brand (e.g., Toyota, Ford).
                </td>
              </tr>
              <tr className="hover:bg-[#131518] transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  fuelType
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 border-l border-gray-700">
                  string
                </td>
                <td className="px-6 py-4 text-sm text-gray-300 border-l border-gray-700">
                  Filter by fuel type (e.g., Gasoline, Electric).
                </td>
              </tr>
              <tr className=" hover:bg-[#131518] transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  bodyType
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 border-l border-gray-700">
                  string
                </td>
                <td className="px-6 py-4 text-sm text-gray-300 border-l border-gray-700">
                  Filter vehicles by body type.
                </td>
              </tr>
              <tr className=" hover:bg-[#131518] transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  isClassic
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 border-l border-gray-700">
                  bool
                </td>
                <td className="px-6 py-4 text-sm text-gray-300 border-l border-gray-700">
                  Filter vehicles by is classic.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Filtering and Pagination Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Filtering and Pagination
        </h2>
        <p className="leading-relaxed mb-6">
          After retrieving the full list of cars, you can apply filters or
          implement pagination using JavaScript. Below are examples of how you
          can filter the data by vehicle type, brand, or fuel type, body type,
          is classic and how to paginate the results.
        </p>

        {/* Buttons for selecting the query example */}
        <div className="flex flex-wrap gap-4 justify-center my-6 overflow-x-auto">
          <button
            onClick={() => setActiveQuery("getAll")}
            className={`px-3 py-2 text-xs md:text-sm lg:text-base rounded-lg  ${
              activeQuery === "getAll"
                ? "bg-[#131518] border border-gray-400 text-white"
                : "bg-[#1f2125] border border-gray-600 hover:bg-[#131518]"
            } transition duration-300 whitespace-nowrap`}
          >
            Get All Cars
          </button>
          <button
            onClick={() => setActiveQuery("vehicleType")}
            className={`px-3 py-2 text-xs md:text-sm lg:text-base rounded-lg  ${
              activeQuery === "vehicleType"
                ? "bg-[#131518] border border-gray-400 text-white"
                : "bg-[#1f2125] border border-gray-600 hover:bg-[#131518]"
            } transition duration-300 whitespace-nowrap`}
          >
            By Vehicle Type
          </button>
          <button
            onClick={() => setActiveQuery("brand")}
            className={`px-3 py-2 text-xs md:text-sm lg:text-base rounded-lg  ${
              activeQuery === "brand"
                ? "bg-[#131518] border border-gray-400 text-white"
                : "bg-[#1f2125] border border-gray-600 hover:bg-[#131518]"
            } transition duration-300 whitespace-nowrap`}
          >
            By Brand
          </button>
          <button
            onClick={() => setActiveQuery("fuelType")}
            className={`px-3 py-2 text-xs md:text-sm lg:text-base rounded-lg  ${
              activeQuery === "fuelType"
                ? "bg-[#131518] border border-gray-400 text-white"
                : "bg-[#1f2125] border border-gray-600 hover:bg-[#131518]"
            } transition duration-300 whitespace-nowrap`}
          >
            By Fuel Type
          </button>
          <button
            onClick={() => setActiveQuery("bodyType")}
            className={`px-3 py-2 text-xs md:text-sm lg:text-base rounded-lg  ${
              activeQuery === "bodyType"
                ? "bg-[#131518] border border-gray-400 text-white"
                : "bg-[#1f2125] border border-gray-600 hover:bg-[#131518]"
            } transition duration-300 whitespace-nowrap`}
          >
            By Body Type
          </button>
          <button
            onClick={() => setActiveQuery("isClassic")}
            className={`px-3 py-2 text-xs md:text-sm lg:text-base rounded-lg  ${
              activeQuery === "isClassic"
                ? "bg-[#131518] border border-gray-400 text-white"
                : "bg-[#1f2125] border border-gray-600 hover:bg-[#131518]"
            } transition duration-300 whitespace-nowrap`}
          >
            By Is Classic
          </button>
          <button
            onClick={() => setActiveQuery("pagination")}
            className={`px-3 py-2 text-xs md:text-sm lg:text-base rounded-lg ${
              activeQuery === "pagination"
                ? "bg-[#131518] border border-gray-400 text-white"
                : "bg-[#1f2125] border border-gray-600 hover:bg-[#131518]"
            } transition duration-300 whitespace-nowrap`}
          >
            Pagination
          </button>
        </div>

        {/* Display the selected code snippet */}
        <div className="bg-[#1f2125] rounded-lg p-6 shadow-md group-hover:bg-gray-700">
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
              <code>{queries[activeQuery]}</code>
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

      {/* Response Format Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Response Format</h2>
        <p className="leading-relaxed mb-6">
          The API returns a list of cars in JSON format. Below is an example of
          the response structure:
        </p>
        <div className="bg-[#1f2125] rounded-lg p-6 mt-6">
          <pre className="bg-[#131518] rounded-lg p-4 text-base text-green-400 overflow-auto">
            <code>
              {`[
        {
          "VehicleId": "64b5f1a532b6a238945639df",
          "vehicleType": "Car",
          "Brand": "Toyota",
          "Model": "Corolla",
          "BodyType": "Sedan",
          "Package": "XLE",
          "Transmission": "Automatic",
          "FuelType": "Gasoline",
          "DriveType": "FWD",
          "EnginePower": "169 HP",
          "EngineCapacity": "2.0L",
          "Year": "2023",
          "IsClassic" false,
          "ImageUrl": "https://api.vehixapi.com/643a8154-7bfa-4195-a8ce-f50329c8353b.jpg"
        },
        ...
      ]`}
            </code>
          </pre>
        </div>

        {/* Explanation of Response Structure */}
        <div className="my-10">
          <h2 className="text-2xl font-semibold mb-6">
            Understanding the Response Structure
          </h2>
          <p className="leading-relaxed mb-4">
            Each vehicle object in the response includes a variety of fields
            that provide detailed information about the vehicle. Here&#39;s a
            breakdown of what each field represents:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li className="">
              <strong>VehicleId:</strong> A unique identifier for the vehicle in
              our database.
            </li>
            <li className="">
              <strong>vehicleType:</strong> Describing the vehcile's type
            </li>
            <li className="">
              <strong>Brand:</strong> The manufacturer of the vehicle (e.g.,
              Toyota, Ford).
            </li>
            <li className="">
              <strong>Model:</strong> The specific model of the vehcile (e.g.,
              Corolla, Mustang).
            </li>
            <li className="">
              <strong>BodyType:</strong> The type of vehcile body (e.g., Sedan,
              Coupe).
            </li>
            <li className="">
              <strong>Package:</strong> The trim or package level of the vehicle
              (e.g., XLE, GT).
            </li>
            <li className="">
              <strong>Transmission:</strong> The type of transmission (e.g.,
              Automatic, Manual).
            </li>
            <li className="">
              <strong>FuelType:</strong> The type of fuel the vehcile uses
              (e.g., Gasoline, Electric).
            </li>
            <li className="">
              <strong>DriveType:</strong> The vehcile's drive configuration
              (e.g., FWD, RWD).
            </li>
            <li className="">
              <strong>EnginePower:</strong> The vehicle's engine power,
              typically measured in horsepower (e.g., 169 HP).
            </li>
            <li className="">
              <strong>EngineCapacity:</strong> The capacity of the engine,
              typically measured in liters (e.g., 2.0L).
            </li>
            <li className="">
              <strong>Year:</strong> The year the car was manufactured.
            </li>
            <li className="">
              <strong>IsClassic:</strong> Indicatting that the vehicle is a
              classic or not
            </li>
            <li className="">
              <strong>ImageUrl:</strong> A link to an image of the car.
            </li>
          </ul>
        </div>
      </section>

      {/* Conclusion */}
      <section className="mb-12">
        <h2 className="text-2xl mb-6 font-semibold">Conclusion</h2>
        <p className="leading-relaxed mb-6">
          The Vehix API provides flexible and comprehensive access to vehicle
          data. After retrieving the full list of vehicles, you can apply
          filters based on vehicle type, brand, fuel type, body type, and
          whether the vehicle is a classic. Be sure to refer to the other
          documentation pages for rate limits and more specific usage
          instructions.
        </p>
      </section>
    </div>
  );
};

export default ApiEndpoint;
