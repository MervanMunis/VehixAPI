// components/VehicleFormList.tsx
"use client";

import React, { useState } from "react";
import Papa from "papaparse"; // For parsing CSV files
import { createVehicles } from "../utils/vehicleRequests";
import { vehicleJson } from "../types/vehicleRequestJson";

const VehicleFormList: React.FC = () => {
  const [vehicleList, setVehicleList] = useState<vehicleJson[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [jsonInput, setJsonInput] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [validationErrors, setValidationErrors] = useState<string[]>([]); // For validation errors

  // Validation function
  const validateVehicles = (vehicles: vehicleJson[]) => {
    const errors: string[] = [];

    vehicles.forEach((vehicle, index) => {
      // Check enginePower max length
      if (vehicle.enginePower && vehicle.enginePower.length > 4) {
        errors.push(`Row ${index + 1}: Engine Power can be at most 4 characters long`);
      }

      // Check engineCapacity max length
      if (vehicle.engineCapacity && vehicle.engineCapacity.length > 5) {
        errors.push(`Row ${index + 1}: Engine Capacity can be at most 5 characters long`);
      }

      // Check year max length
      if (vehicle.year.length > 4) {
        errors.push(`Row ${index + 1}: Year can be at most 4 characters long`);
      }
    });

    return errors;
  };
  
  // Handle CSV or Excel file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const data = results.data as vehicleJson[];
        const validationErrors = validateVehicles(data);

        if (validationErrors.length > 0) {
          setValidationErrors(validationErrors);
          return;
        }

        setVehicleList(data);
        setValidationErrors([]); // Clear previous validation errors
        setSuccess(`${results.data.length} vehicles loaded from file.`);
      },
      error: function () {
        setError("Failed to process the file. Please check the format.");
      },
    });
  };

  // Handle JSON input (textarea)
  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      const validationErrors = validateVehicles(parsed);

      if (validationErrors.length > 0) {
        setValidationErrors(validationErrors);
        return;
      }

      setVehicleList(parsed);
      setValidationErrors([]); // Clear previous validation errors
      setSuccess(`${parsed.length} vehicles loaded from JSON.`);
    } catch (err) {
      setError("Invalid JSON format.");
    }
  };

  // Submit the vehicle list to the API
  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const validationErrors = validateVehicles(vehicleList);

      if (validationErrors.length > 0) {
        setValidationErrors(validationErrors);
        setLoading(false);
        return;
      }

      await createVehicles(vehicleList);
      setSuccess(`${vehicleList.length} Vehicles are added successfully.`);
    } catch (err) {
      setError("Failed to add vehicles in bulk. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 text-white p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-200">
        Add Multiple Vehicles
      </h2>

      <div className="mb-4">
        <label className="block mb-2 text-gray-300 text-lg font-semibold">
          Upload CSV/Excel File:
        </label>
        <input
          type="file"
          accept=".csv, .xlsx"
          onChange={handleFileUpload}
          className="mb-2 p-2 text-gray-300 focus:ring-2 focus:ring-yellow-400 transition-transform transform hover:scale-105"
        />
        {fileName && (
          <p className="text-gray-300 mt-2">Loaded file: {fileName}</p>
        )}
      </div>

      <div className="mb-4">
        <p className="mb-2 text-gray-300 font-semibold">Or paste JSON list:</p>
        <textarea
          rows={8}
          value={jsonInput}
          onChange={handleJsonChange}
          placeholder="Paste JSON list of vehicle objects"
          className="w-full p-3 mb-4 text-black"
        ></textarea>
      </div>

      {/* Display validation errors */}
      {validationErrors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-3 mb-4">
          <ul>
            {validationErrors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}
      
      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-green-600 rounded-xl text-white transition-transform transform hover:scale-105"
        disabled={loading}
      >
        {loading ? "Adding Vehicles..." : "Add Vehicles"}
      </button>

      {success && (
        <div className="bg-green-100 rounded-xl text-green-700 p-3 mt-4">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-100 rounded-xl text-red-700 p-3 mt-4">{error}</div>
      )}
    </div>
  );
};

export default VehicleFormList;
