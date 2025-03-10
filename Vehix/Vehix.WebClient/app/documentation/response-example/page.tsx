// /app/documentation/response-example/page.tsx
"use client";

import React from "react";

const ResponseExample: React.FC = () => {
  const jsonString = `[
    {
      "VehicleId": "64b5f1a532b6a238945639df",
      "VehicleType":"Car"
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
      "IsClassic": false,
      "ImageUrl": "https://api.vehixapi.com/4a10ee16-7c5f-450e-8604-d1b46a96c4e1.jpg"
    },
    {
      "VehicleId": "64b5f1a532b6a238945639e0",
      "VehicleType":"Car"
      "Brand": "Ford",
      "Model": "Mustang",
      "BodyType": "Coupe",
      "Package": "GT",
      "Transmission": "Manual",
      "FuelType": "Gasoline",
      "DriveType": "RWD",
      "EnginePower": "450 HP",
      "EngineCapacity": "5.0L",
      "Year": "2022",
      "IsClassic": false,
      "ImageUrl": "https://api.vehixapi.com/587c1f2d-8e49-46a3-89c8-44ca2c815df1.jpg"
    },
    ...
  ]`;
  return (
    <div className="mx-auto text-base md:p-9 text-gray-300">
      {/* Title */}
      <h1 className="mb-4 text-3xl font-extrabold">Response Example</h1>

      {/* Introduction */}
      <p className="mb-8 leading-relaxed">
        When you send a request to the Vehix API, the data returned is formatted
        in a standardized JSON structure. This format is designed to be easy to
        parse and integrate into your applications. Below is an example of a
        typical response, showcasing the kind of detailed vehicle information
        you can expect when querying the API. Each vehicle object includes
        specifics such as brand, model, year, engine specifications, and more.
      </p>

      {/* Response Example */}
      <section className="pb-4">
        <div className="p-6 rounded-lg bg-[#1f2125]">
          <div>
            <h2 className="mb-4 text-md font-bold text-gray-200">
              JSON Response Example:
            </h2>
          </div>
          <div>
            <pre className="bg-[#131518] rounded p-4 text-base text-green-400 overflow-auto max-h-60">
              <code className="whitespace-pre-wrap">{jsonString}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Ideas and Use Cases */}
      <section className="md:p-9">
        <h2 className="text-2xl font-medium text-gray-200 mb-4">
          Ideas and Use Cases
        </h2>
        <p className="mb-4">
          The comprehensive data provided by the Vehix API opens up a wide range
          of possibilities for developers. Here are some examples of what you
          can build:
        </p>
        <ol className="list-disc list-inside space-y-4">
          <li className="ml-2">
            <strong className="font-medium">Vehicle Comparison Tool:</strong>
            <p className="ml-8 mt-2">
              Create a tool that enables users to compare vehicles based on
              specifications such as engine power, fuel type, and other key
              attributes.
            </p>
          </li>
          <li className="ml-2">
            <strong className="font-medium">Vehicle Dealership Website:</strong>
            <p className="ml-8 mt-2">
              Use the API to populate the inventory section of a dealership
              website, allowing users to filter vehicles by brand, model, year,
              and more.
            </p>
          </li>
          <li className="ml-2">
            <strong className="font-medium">Mobile Vehicle Finder App:</strong>
            <p className="ml-8 mt-2">
              Develop a mobile app that helps users find vehicles based on their
              preferences, integrating search and filter capabilities powered by
              the API.
            </p>
          </li>
          <li className="ml-2">
            <strong className="font-medium">Data Analytics Dashboard:</strong>
            <p className="ml-8 mt-2">
              Build a dashboard that visualizes vehicle data trends, such as the
              most popular brands, the distribution of vehicle types, and
              average engine power over the years.
            </p>
          </li>
        </ol>
      </section>
    </div>
  );
};

export default ResponseExample;
