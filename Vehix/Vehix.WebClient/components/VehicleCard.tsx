/* eslint-disable @next/next/no-img-element */
// /components/CarCard.tsx
"use client";
import React from "react";
import { FaGasPump, FaCarSide, FaCogs } from "react-icons/fa";

interface VehicleCardProps {
  imageUrl: string;
  brand: string;
  model: string;
  transmission: string;
  driveType: string;
  fuelType: string;
  year: string;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  imageUrl,
  brand,
  model,
  transmission,
  driveType,
  fuelType,
  year,
}) => {
  return (
    <div className="flex flex-col pb-4 sm:pb-6 justify-between items-start border-image-card shadow-lg hover:shadow-xl rounded-2xl group w-full max-w-md transform transition duration-300 ease-in-out hover:scale-105 focus:ring-2 border text-white">
      <div className="w-full mb-3">
        <div className="relative h-full w-full mb-2">
          <img
            src={imageUrl || "/image-placeholder.png"}
            alt={`${brand || "Car"} ${model || "Model"}`}
            className="h-full w-full rounded-t-2xl object-cover "
          />
        </div>
        <h3 className="text-lg sm:text-xl pl-4 sm:pl-6 md:text-2xl font-bold capitalize leading-tight">
          <span className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold">
            {brand || "Unknown Brand"} - {model || "Unknown Model"}
          </span>
          <span className="block text-xs md:text-sm lg:text-base">
            ({year || "Year"})
          </span>
        </h3>
      </div>

      <div className="flex justify-around items-center w-full space-x-2 sm:space-x-4">
        <div className="flex flex-col items-center">
          <FaCogs className="text-indigo-500 text-lg sm:text-xl mb-1" />
          <span className="text-xs sm:text-sm md:text-base">
            {transmission || "Unknown"}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <FaCarSide className="text-orange-500 text-lg sm:text-xl mb-1" />
          <span className="text-xs sm:text-sm md:text-base">
            {driveType || "Unknown"}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <FaGasPump className="text-green-500 text-lg sm:text-xl mb-1" />
          <span className="text-xs sm:text-sm md:text-base">
            {fuelType || "Unknown"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
