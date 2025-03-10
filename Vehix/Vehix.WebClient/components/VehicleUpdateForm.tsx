// components/VehicleUpdateForm.tsx
"use client";

import React, { useState } from "react";
import { IVehicle } from "@/types/vehicle";

interface VehicleUpdateFormProps {
  vehicle: IVehicle;
  onSubmit: (
    updatedVehicleData: Partial<IVehicle>,
    imageFile?: File
  ) => Promise<void>;
}

const VehicleUpdateForm: React.FC<VehicleUpdateFormProps> = ({
  vehicle,
  onSubmit,
}) => {
  const [updatedVehicleData, setUpdatedVehicleData] = useState<
    Partial<IVehicle>
  >({});

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Validate the fields
  const validateFields = () => {
    const validationErrors: string[] = [];

    // Validate enginePower length
    if (updatedVehicleData.EnginePower && updatedVehicleData.EnginePower.length > 4) {
      validationErrors.push("Engine Power must be at most 4 characters.");
    }

    // Validate engineCapacity length
    if (updatedVehicleData.EngineCapacity && updatedVehicleData.EngineCapacity.length > 5) {
      validationErrors.push("Engine Capacity must be at most 5 characters.");
    }

    // Validate Year length
    if (updatedVehicleData.Year && updatedVehicleData.Year.length > 4) {
      validationErrors.push("Year must be at most 4 characters.");
    }

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  // Handle changes in form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedVehicleData({
      ...updatedVehicleData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Submit updated vehicle data and image
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    
    if (!validateFields()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(updatedVehicleData, imageFile || undefined);
    } catch (error) {
      console.error("Error updating vehicle:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="VehicleType"
          placeholder="Vehicle Type"
          defaultValue={vehicle.VehicleType}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded text-gray-950"
        />
        <input
          type="text"
          name="Brand"
          placeholder="Brand"
          defaultValue={vehicle.Brand}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded text-gray-950"
        />
        <input
          type="text"
          name="Model"
          placeholder="Model"
          defaultValue={vehicle.Model}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded text-gray-950"
        />
        <input
          type="text"
          name="BodyType"
          placeholder="Body Type"
          defaultValue={vehicle.BodyType}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded text-gray-950"
        />
        <input
          type="text"
          name="Package"
          placeholder="Package"
          defaultValue={vehicle.Package}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded text-gray-950"
        />
        <input
          type="text"
          name="Transmission"
          placeholder="Transmission"
          defaultValue={vehicle.Transmission}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded text-gray-950"
        />
        <input
          type="text"
          name="FuelType"
          placeholder="Fuel Type"
          defaultValue={vehicle.FuelType}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded text-gray-950"
        />
        <input
          type="text"
          name="DriveType"
          placeholder="Drive Type"
          defaultValue={vehicle.DriveType}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded text-gray-950"
        />
        <input
          type="text"
          name="EnginePower"
          placeholder="Engine Power"
          defaultValue={vehicle.EnginePower || ""}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded text-gray-950"
        />
        <input
          type="text"
          name="EngineCapacity"
          placeholder="Engine Capacity"
          defaultValue={vehicle.EngineCapacity || ""}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded text-gray-950"
        />
        <input
          type="text"
          name="Year"
          placeholder="Year"
          defaultValue={vehicle.Year}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded text-gray-950"
        />
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={vehicle.IsClassic}
            name="IsClassic"
            onChange={handleChange}
            className="form-checkbox h-5 w-5"
          />
          <span className="ml-2 text-white">Classic Vehicle</span>
        </label>
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
        className="w-full py-3 mt-2 bg-green-600 text-gray-200 text-semibold rounded-xl transform transition-transform hover:scale-105"
        disabled={loading}
      >
        {loading ? "Processing..." : "Update Vehicle"}
      </button>

      {/* Display validation errors */}
      {errors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-3 mt-4">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default VehicleUpdateForm;
