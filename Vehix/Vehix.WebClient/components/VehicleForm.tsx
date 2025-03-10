// components/VehicleForm.tsx
"use client";

import React, { useState } from "react";
import { updateVehicleImage, createVehicle } from "../utils/vehicleRequests";
import { vehicleJson } from "../types/vehicleRequestJson";

interface VehicleFormProps {
  onSubmit: (vehicleId: string) => Promise<void>;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ onSubmit }) => {
  const [vehicleData, setVehicleData] = useState<vehicleJson>({
    vehicleType: "",
    brand: "",
    model: "",
    bodyType: "",
    package: "",
    transmission: "",
    fuelType: "",
    driveType: "",
    enginePower: "",
    engineCapacity: "",
    year: "",
    isClassic: false,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    enginePower: "",
    engineCapacity: "",
    year: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVehicleData({ ...vehicleData, [name]: value });

    switch (name) {
      case "enginePower":
        if (value.length > 4) {
          setFieldErrors((prevErrors) => ({
            ...prevErrors,
            enginePower: "Engine power can be at most 4 characters long",
          }));
        } else {
          setFieldErrors((prevErrors) => ({ ...prevErrors, enginePower: "" }));
        }
        break;
      case "engineCapacity":
        if (value.length > 5) {
          setFieldErrors((prevErrors) => ({
            ...prevErrors,
            engineCapacity: "Engine capacity can be at most 5 characters long",
          }));
        } else {
          setFieldErrors((prevErrors) => ({
            ...prevErrors,
            engineCapacity: "",
          }));
        }
        break;
      case "year":
        if (value.length > 4) {
          setFieldErrors((prevErrors) => ({
            ...prevErrors,
            year: "Year can be at most 4 characters long",
          }));
        } else {
          setFieldErrors((prevErrors) => ({ ...prevErrors, year: "" }));
        }
        break;
      default:
        break;
    }
  };

  // Handle the image upload change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Submit form and handle the API request
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Step 1: Create the vehicle in the database
      const createdVehicle = await createVehicle(vehicleData); // createVehicle request with JWT authentication

      // Step 2: If there is an image, upload it using updateVehicleImage
      if (imageFile) {
        await updateVehicleImage(
          createdVehicle.VehicleId.toString(),
          imageFile
        ); // Use vehicleId from createVehicle response
      }

      // Step 3: Pass the newly created vehicle back to the parent component
      await onSubmit(createdVehicle.VehicleId);

      setSuccess("Vehicle and image added successfully!");
    } catch (error) {
      setError("Failed to add vehicle or image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="vehicleType"
          placeholder="Vehicle Type"
          value={vehicleData.vehicleType}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded text-gray-950"
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={vehicleData.brand}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded text-gray-950"
          required
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={vehicleData.model}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded text-gray-950"
          required
        />
        <input
          type="text"
          name="bodyType"
          placeholder="Body Type"
          value={vehicleData.bodyType}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded text-gray-950"
          required
        />
        <input
          type="text"
          name="package"
          placeholder="Package"
          value={vehicleData.package}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded text-gray-950"
        />
        <input
          type="text"
          name="transmission"
          placeholder="Transmission"
          value={vehicleData.transmission}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded text-gray-950"
        />
        <input
          type="text"
          name="fuelType"
          placeholder="Fuel Type"
          value={vehicleData.fuelType}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded text-gray-950"
        />
        <input
          type="text"
          name="driveType"
          placeholder="Drive Type"
          value={vehicleData.driveType}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded text-gray-950"
        />
        <div className="min-h-[1rem] text-sm">
            {/* Error message for engine power */}
          {fieldErrors.enginePower && (
            <div className="text-red-500 mb-2">{fieldErrors.enginePower}</div>
          )}
          <input
            type="text"
            name="enginePower"
            placeholder="Engine Power"
            value={vehicleData.enginePower || ""}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded text-gray-950"
          />
        </div>

        <div className="min-h-[1rem] text-sm">
          {/* Error message for engine capacity */}
          {fieldErrors.engineCapacity && (
            <div className="text-red-500 mb-2">{fieldErrors.engineCapacity}</div>
          )}
          <input
            type="text"
            name="engineCapacity"
            placeholder="Engine Capacity"
            value={vehicleData.engineCapacity || ""}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded text-gray-950"
          />
        </div>
        
        <div className="min-h-[1rem] text-sm">
          {/* Error message for year */}
          {fieldErrors.year && (
            <div className="text-red-500 mb-2">{fieldErrors.year}</div>
          )}
          <input
            type="text"
            name="year"
            placeholder="Year"
            value={vehicleData.year}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded text-gray-950"
          />
        </div>
        
        
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            name="isClassic"
            checked={vehicleData.isClassic}
            onChange={(e) =>
              setVehicleData({ ...vehicleData, isClassic: e.target.checked })
            }
            className="form-checkbox h-5 w-5"
          />
          <span className="ml-2 text-white">Classic Vehicle</span>
        </label>
        {/* Image Upload Field */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-3 mb-4 rounded text-gray-200"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-green-600 text-gray-200 text-semibold rounded-xl transform transition-transform hover:scale-105"
        disabled={loading}
      >
        {loading ? "Processing..." : "Add Vehicle"}
      </button>

      {/* Display success message */}
      {success && (
        <div className="bg-green-100 text-green-700 p-3 mt-4">
          {success}
        </div>
      )}

      {/* Display error message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 mt-4">{error}</div>
      )}
    </form>
  );
};

export default VehicleForm;
