// /app/test/page.tsx
"use client";

import React, { useState, useCallback, Suspense } from "react";
import dynamic from "next/dynamic";
import { FaPython, FaJs, FaJava, FaInfoCircle } from "react-icons/fa";
import { SiCsharp } from "react-icons/si";
import LoadingSpinner from "../../components/LoadingSpinner";

const VehicleTable = dynamic(() => import("../../components/VehicleDataGrid"), {
  suspense: true,
});

const codeSnippets = {
  javascript: `// Fetch all vehicles and log the full list
fetch('https://api.vehixapi.com/vehicles/all', {
    headers: { 
      'X-API-KEY': '<YOUR_API_KEY_HERE>',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`,
  python: `import requests

# Replace <YOUR_API_KEY_HERE> with your actual API key
api_url = "https://api.vehixapi.com/vehicles/all"
headers = {
    "X-API-KEY": "<YOUR_API_KEY_HERE>",
    "Content-Type": "application/json"
}

try:
    # Make a GET request to fetch all vehicles
    response = requests.get(api_url, headers=headers)
    response.raise_for_status()  # Check if the request was successful (status code 200)
    
    # Parse the JSON data from the response
    vehicles_data = response.json()
    
    # Log the data (print it out)
    print(vehicles_data)
except requests.exceptions.RequestException as e:
    # Handle any errors that occur during the request
    print(f"Error: {e}")
`,
  java: `import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class VehixApiClient {
    private static final String API_URL = "https://api.vehixapi.com/vehicles/all";
    private static final String API_KEY = "<YOUR_API_KEY_HERE>"; // Replace with your API key

    public static void main(String[] args) {
        try {
            // Create the URL object
            URL url = new URL(API_URL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            
            // Set up the request
            connection.setRequestMethod("GET");
            connection.setRequestProperty("X-API-KEY", API_KEY);
            connection.setRequestProperty("Content-Type", "application/json");

            // Check if the request was successful
            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                // Read the response
                BufferedReader in = new 
                  BufferedReader(new InputStreamReader(connection.getInputStream()));
                String inputLine;
                StringBuilder response = new StringBuilder();

                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();

                // Print the response
                System.out.println("Response: " + response.toString());
            } else {
                System.out.println("GET request failed. Response Code: " + responseCode);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
  csharp: `using System.Net.Http.Headers;

class Program
{
    private static async Task FetchVehiclesAsync()
    {
        using (var client = new HttpClient())
        {
            client.BaseAddress = new Uri("https://api.vehixapi.com/");

            // Add the API key in the headers
            client.DefaultRequestHeaders.Add("X-API-KEY", "<YOUR_API_KEY_HERE>");

            client.DefaultRequestHeaders
              .Accept
              .Add(new MediaTypeWithQualityHeaderValue("application/json"));

            try
            {
                // Send the GET request
                HttpResponseMessage response = await client.GetAsync("vehicles/all");
                response.EnsureSuccessStatusCode(); // Throws an exception if the status code is not 2xx

                var data = await response.Content.ReadAsStringAsync();
                Console.WriteLine(data);
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine($"Error: {e.Message}");
            }
        }
    }

    static void Main(string[] args)
    {
        FetchVehiclesAsync().Wait();
    }
}
`,
};

const fetchTimes = {
  javascript: 32.5,
  python: 32.1,
  java: 30.0,
  csharp: 28.8,
};

type LanguageType = "javascript" | "python" | "java" | "csharp";

const TestPage = () => {
  const [loadData, setLoadData] = useState<boolean>(false);
  const [carCount, setCarCount] = useState<number>(0);
  const [fetchTime, setFetchTime] = useState<number>(0);
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageType>("javascript");

  const handleFetchComplete = useCallback((time: number, carCount: number) => {
    setFetchTime(time);
    setCarCount(carCount);
  }, []);

  const handleFetchData = () => {
    setLoadData(true);
  };

  const handleLanguageChange = (lang: LanguageType) => {
    setSelectedLanguage(lang);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-10 text-base max-w-7xl mx-auto py-10 px-4 lg:px-8 text-gray-300 ">
      {/* Sidebar Section */}
      <aside className="lg:w-72 lg:shrink-0 lg:mr-10 mb-12 lg:mb-0 order-2 lg:order-1">
        <div className="p-6 rounded-md mb-8 bg-[#1f2125]">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaInfoCircle className="mr-2 text-yellow-300" /> Additional
            Information
          </h2>
          <p className="text-lg leading-relaxed">
            Use this API to access a variety of vehicle data for different
            purposes, including developing car comparison tools, dealership
            websites, or data analytics dashboards.
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>Data is returned in JSON format.</li>
            <li>
              Supports filtering by vehicle type, brand, fuel type, and more.
            </li>
            <li>
              Ideal for building applications that require detailed vehicle
              information.
            </li>
            <li>Fast and reliable API with low response times.</li>
          </ul>
          <div className="mt-6">
            <a
              href="/documentation"
              className="text-yellow-300 hover:text-yellow-400 transition-colors duration-150"
            >
              Learn more about the Vehix API
            </a>
          </div>
        </div>

        <div className="bg-[#1f2125] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Need Help?</h2>
          <p className="text-lg leading-relaxed">
            If you encounter any issues or need further assistance with using
            the API, feel free to reach out to our support team.
          </p>
          <div className="mt-6">
            <a
              href="/contact"
              className="text-yellow-300 hover:text-yellow-400 transition-colors duration-150"
            >
              Contact Support
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content Section */}
      <div className="flex-1 md:py-9 order-1 lg:order-2">
        {/* Introductory Section */}
        <section className="mr-0 lg:mr-8">
          <h1 className="text-3xl font-extrabold mb-4">
            Car API Test Environment
          </h1>
          <p className="mb-8 leading-relaxed">
            Welcome to the Vehix API Test Environment. This page allows you to
            explore and test our Vehix API by fetching vehicle data, viewing
            results, and reviewing code examples in various programming
            languages.
          </p>
        </section>

        {/* Step-by-Step Instructions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">How to Use This Page</h2>
          <ol className="list-decimal list-inside space-y-2 text-lg">
            <li>
              Choose your preferred programming language from the options below.
            </li>
            <li>
              Click the Fetch Vehicle Data button to retrieve vehicle data from
              the API.
            </li>
            <li>
              Review the fetched data in the table and observe the time taken
              for the request.
            </li>
            <li>
              Use the provided code snippets to understand how to fetch data
              using the API in different languages.
            </li>
          </ol>
        </section>

        {/* Fetch Data Section */}
        <section className="mb-12">
          <div className="text-center">
            <button
              onClick={handleFetchData}
              className="px-8 py-3 font-semibold rounded-lg transition-colors duration-150 bg-[#1f2125] hover:bg-[#131518]"
            >
              Fetch Vehicle Data
            </button>
            {loadData && (
              <div className="mt-6 space-y-2">
                <p>
                  Time taken to fetch car data:{" "}
                  <span className="font-bold">{fetchTime} ms</span>
                </p>
                <p>
                  Number of cars fetched:{" "}
                  <span className="font-bold">{carCount}</span>
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Car Data Table Section */}
        <div className="overflow-x-auto max-w-full">
          {loadData && (
            <Suspense fallback={<LoadingSpinner />}>
              <div className="w-full lg:w-[900px] mx-auto">
                <VehicleTable
                  loadData={loadData}
                  onFetchComplete={handleFetchComplete}
                />
              </div>
            </Suspense>
          )}
        </div>

        {/* Code Snippets and Fetch Times Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Example Code Snippets</h2>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {(["javascript", "python", "java", "csharp"] as LanguageType[]).map(
              (lang) => (
                <button
                  key={lang}
                  className={`px-4 py-2 text-lg font-semibold rounded-lg ${
                    selectedLanguage === lang
                      ? "bg-[#131518] border border-gray-400 text-white"
                      : "bg-[#1f2125] border border-gray-600 hover:bg-[#131518]"
                  } transition duration-300`}
                  onClick={() => handleLanguageChange(lang)}
                >
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
              )
            )}
          </div>

          <div className="bg-[#131518] p-6 rounded-lg shadow-inner overflow-x-auto">
            <div className="flex items-center mb-4">
              {selectedLanguage === "javascript" && (
                <FaJs className="text-yellow-300 text-3xl mr-3" />
              )}
              {selectedLanguage === "python" && (
                <FaPython className="text-yellow-300 text-3xl mr-3" />
              )}
              {selectedLanguage === "java" && (
                <FaJava className="text-yellow-300 text-3xl mr-3" />
              )}
              {selectedLanguage === "csharp" && (
                <SiCsharp className="text-yellow-300 text-3xl mr-3" />
              )}
              <h3 className="text-lg font-semibold capitalize">
                {selectedLanguage} Example
              </h3>
            </div>
            <pre className="bg-[#1f2125] p-4 rounded-md text-green-400 overflow-auto">
              {codeSnippets[selectedLanguage]}
            </pre>
          </div>

          <div className="text-center mt-8">
            <p>
              Average fetch time for {selectedLanguage}:{" "}
              <span className="font-semibold">
                {fetchTimes[selectedLanguage]} ms
              </span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TestPage;
