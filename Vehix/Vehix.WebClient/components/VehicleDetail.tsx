/* eslint-disable @next/next/no-img-element */
// components/VehicleDetail.tsx

"use client";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { IVehicle } from "@/types/vehicle";

interface VehicleDetailProps {
  vehicle: IVehicle | null;
  isOpen: boolean;
  onClose: () => void;
}

const VehicleDetail: React.FC<VehicleDetailProps> = ({
  vehicle,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !vehicle) return null;

  const getEnginePowerUnit = (fuelType: string) => {
    if (fuelType.toLowerCase() === "electric") {
      return "kWh";
    } else {
      return "HP"; 
    }
  };

  const geteEngineCapacityUnit = (engineCapacity: string | undefined) => {
    return engineCapacity ? `${engineCapacity} CC` : "-";
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 px-4">
      <div className="relative bg-black p-6 border-image-card rounded-2xl sm:rounded-3xl shadow-lg w-full max-w-xs md:max-w-sm lg:max-w-md transform transition duration-300 ease-in-out">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-purple-400 transition-transform transform hover:scale-105"
        >
          <FaTimes size={24} />
        </button>

        {/* Vehicle Image */}
        <div className="relative h-48 w-full mb-4 mt-4">
          <img
            src={vehicle.ImageUrl || "/image-placeholder.png"}
            alt={`${vehicle.Brand} ${vehicle.Model}`}
            className="h-full w-full object-contain rounded-lg"
          />
        </div>

        {/* Vehicle Title */}
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold text-white capitalize">
            {vehicle.Brand} {vehicle.Model}
          </h2>
          <p className="text-md text-white">Year: {vehicle.Year || "N/A"}</p>
        </div>

        {/* Vehicle Specifications */}
        <ul className="space-y-3 text-sm text-white">
          <li className="flex justify-between items-center">
            <strong>Vehicle Type:</strong>
            <span>{vehicle.VehicleType || "Unknown"}</span>
          </li>
          <li className="flex justify-between items-center">
            <strong>Body Type:</strong>
            <span>{vehicle.BodyType || "Unknown"}</span>
          </li>
          <li className="flex justify-between items-center">
            <strong>Package:</strong>
            <span>{vehicle.Package || "Unknown"}</span>
          </li>
          <li className="flex justify-between items-center">
            <strong>Transmission:</strong>
            <span>{vehicle.Transmission || "Unknown"}</span>
          </li>
          <li className="flex justify-between items-center">
            <strong>Fuel Type:</strong>
            <span>{vehicle.FuelType || "Unknown"}</span>
          </li>
          <li className="flex justify-between items-center">
            <strong>Drive Type:</strong>
            <span>{vehicle.DriveType || "Unknown"}</span>
          </li>
          <li className="flex justify-between items-center">
            <strong>Engine Power:</strong>
            <span>{vehicle.EnginePower || "Unknown"} {getEnginePowerUnit(vehicle.FuelType)}</span>
          </li>
          <li className="flex justify-between items-center">
            <strong>Engine Capacity:</strong>
            <span>{geteEngineCapacityUnit(vehicle.EngineCapacity)}</span>
          </li>
          <li className="flex justify-between items-center">
            <strong>Is Classic:</strong>
            <span>{vehicle.IsClassic ? "Yes" : "No"}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VehicleDetail;
