// /app/vehicles/add/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { IVehicle } from "@/types/vehicle";
import VehicleFormList from "@/components/VehicleFormList";
import { getVehicleById } from "@/utils/vehicleRequests";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProtectedRoute from "@/components/ProtectedRoute";
import VehicleForm from "@/components/VehicleForm";
import VehicleCard from "@/components/VehicleCard";

const AddVehiclePage = () => {
  const [formType, setFormType] = useState<"single" | "multiple">("single");
  const [addedCar, setAddedCar] = useState<IVehicle | null>(null);
  const [loading, setLoading] = useState(false);
  const [carId, setCarId] = useState<string | null>(null);

  useEffect(() => {
    if (carId) {
      const fetchCarDetails = async () => {
        try {
          setLoading(true);
          const car = await getVehicleById(carId);
          setAddedCar(car);
        } catch (error) {
          console.error("Failed to fetch car details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCarDetails();
    }
  }, [carId]);

  const handleAddCar = async (carId: string) => {
    setCarId(carId);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="bg-[#050709] text-white p-8 w-full max-w-6xl mx-auto rounded-xl">
          {/* Form selection */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => {
                setFormType("single");
                setAddedCar(null);
              }}
              className={`px-4 py-2 mx-2 font-bold transition-transform transform hover:scale-105 rounded-xl ${
                formType === "single"
                  ? "bg-orange-400 text-black"
                  : "bg-gray-500 text-black"
              }`}
            >
              Add Single Car
            </button>
            <button
              onClick={() => {
                setFormType("multiple");
                setAddedCar(null);
              }}
              className={`px-4 py-2 mx-2 font-bold transition-transform transform hover:scale-105 rounded-xl ${
                formType === "multiple"
                  ? "bg-orange-400 text-black"
                  : "bg-gray-500 text-black"
              }`}
            >
              Add Multiple Cars
            </button>
          </div>

          {/* Render forms */}
          {formType === "single" ? (
            <VehicleForm onSubmit={handleAddCar} />
          ) : (
            <VehicleFormList />
          )}
        </div>

        {/* Display car details after adding a single car */}
        {formType === "single" && addedCar && (
          <div className="bg-black text-white p-8 shadow-lg mt-6 w-full max-w-sm border border-yellow-200 hover:border-yellow-400">
            <h2 className="text-xl font-bold mb-4 text-yellow-400">
              Car Details
            </h2>
            <VehicleCard
              imageUrl={addedCar.ImageUrl || "/image-placeholder.png"}
              brand={addedCar.Brand}
              model={addedCar.Model}
              transmission={addedCar.Transmission}
              driveType={addedCar.DriveType}
              fuelType={addedCar.FuelType}
              year={addedCar.Year}
            />
          </div>
        )}

        {/* Display loading state while fetching car details */}
        {loading && (
          <p className="text-white mt-4">
            <LoadingSpinner />
          </p>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default AddVehiclePage;
