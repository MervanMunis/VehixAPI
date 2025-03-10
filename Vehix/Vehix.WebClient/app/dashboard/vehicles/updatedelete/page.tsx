/* eslint-disable @typescript-eslint/no-unused-vars */
// /app/Vehicles/updatedelete/page.tsx
"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import SearchBar from "@/components/SearchBar";
import {
  getVehiclesAdmin,
  updateVehicle,
  updateVehicleImage,
  deleteVehicle,
} from "@/utils/vehicleRequests";
import ReactPaginate from "react-paginate";
import Modal from "@/components/Modal";
import { IVehicle } from "@/types/vehicle";
import { vehicleJson } from "@/types/vehicleRequestJson";
import VehicleUpdateForm from "@/components/VehicleUpdateForm";
import VehicleCard from "@/components/VehicleCard";
import ProtectedRoute from "@/components/ProtectedRoute";

const UpdateDeletePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<IVehicle[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedVehicle, setSelectedVehicle] = useState<IVehicle | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false); // For delete confirmation modal
  const [vehicleToDelete, setVehicleToDelete] = useState<IVehicle | null>(null); // Track Vehicle to delete
  const [isLoading, setLoading] = useState<boolean>(false);
  const itemsPerPage = 20; // Adjusted number of Vehicles per page

  // Fetch Vehicles data
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const response = await getVehiclesAdmin();
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching Vehicles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term.trim().toLowerCase());
      if (term.trim().length >= 2) {
        const words = term.trim().toLowerCase().split(/\s+/);
        const filtered = vehicles.filter((vehicle) => {
          return words.every(
            (word) =>
              vehicle.Brand?.toLowerCase().includes(word) ||
              vehicle.Model?.toLowerCase().includes(word) ||
              vehicle.BodyType?.toLowerCase().includes(word) ||
              vehicle.FuelType?.toLowerCase().includes(word) ||
              vehicle.Transmission?.toLowerCase().includes(word)
          );
        });
        setFilteredVehicles(filtered);
      } else {
        setFilteredVehicles([]);
      }
    },
    [vehicles]
  );

  // Handle pagination
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageVehicles = useMemo(
    () => filteredVehicles.slice(offset, offset + itemsPerPage),
    [filteredVehicles, offset, itemsPerPage]
  );
  const pageCount = useMemo(
    () => Math.ceil(filteredVehicles.length / itemsPerPage),
    [filteredVehicles.length, itemsPerPage]
  );

  // Handle Vehicle deletion
  const handleDeleteVehicle = async (vehicleId: string) => {
    try {
      await deleteVehicle(vehicleId);
      setFilteredVehicles((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle.VehicleId !== vehicleId)
      );
      alert("Vehicle deleted successfully!");
      setDeleteModalOpen(false); // Close delete modal after success
    } catch (error) {
      console.error("Error deleting Vehicle:", error);
      alert("Failed to delete the Vehicle.");
    }
  };

  // Confirm delete modal action
  const confirmDeleteVehicle = (vehicle: IVehicle) => {
    setVehicleToDelete(vehicle); // Set the Vehicle to be deleted
    setDeleteModalOpen(true); // Open confirmation modal
  };

  // Cancel delete
  const cancelDeleteVehicle = () => {
    setDeleteModalOpen(false);
    setVehicleToDelete(null); // Reset the Vehicle to delete
  };

  // Handle Vehicle update
  const handleUpdateVehicle = (vehicle: IVehicle) => {
    setSelectedVehicle(vehicle);
    setModalOpen(true);
  };

  // Handle form submission to update Vehicle
  const handleVehicleUpdateSubmit = async (
    updatedVehicleData: Partial<IVehicle>,
    imageFile?: File
  ) => {
    if (!selectedVehicle) return;

    try {
      let updateSuccess = false;

      // Step 1: Check if Vehicle data has been modified (i.e., any of the updatedVehicleData fields are different from selectedVehicle)
      const hasVehicleDataChanges = Object.keys(updatedVehicleData).some(
        (key) =>
          updatedVehicleData[key as keyof IVehicle] !==
          selectedVehicle[key as keyof IVehicle]
      );

      // Step 2: If Vehicle data changes exist, send updateVehicle request
      if (hasVehicleDataChanges) {
        const VehicleUpdateData: Partial<vehicleJson> = {
          vehicleType:
            updatedVehicleData.VehicleType ?? selectedVehicle.VehicleType,
          brand: updatedVehicleData.Brand ?? selectedVehicle.Brand,
          model: updatedVehicleData.Model ?? selectedVehicle.Model,
          bodyType: updatedVehicleData.BodyType ?? selectedVehicle.BodyType,
          package: updatedVehicleData.Package ?? selectedVehicle.Package,
          transmission:
            updatedVehicleData.Transmission ?? selectedVehicle.Transmission,
          fuelType: updatedVehicleData.FuelType ?? selectedVehicle.FuelType,
          driveType: updatedVehicleData.DriveType ?? selectedVehicle.DriveType,
          enginePower:
            updatedVehicleData.EnginePower ?? selectedVehicle.EnginePower,
          engineCapacity:
            updatedVehicleData.EngineCapacity ?? selectedVehicle.EngineCapacity,
          year: updatedVehicleData.Year ?? selectedVehicle.Year,
          isClassic: updatedVehicleData.IsClassic ?? selectedVehicle.IsClassic,
        };

        // Send updateVehicle request
        await updateVehicle(selectedVehicle.VehicleId, VehicleUpdateData);
        updateSuccess = true;
      }

      // Step 3: If an image file is provided, send updateVehicleImage request
      if (imageFile) {
        await updateVehicleImage(selectedVehicle.VehicleId, imageFile);
        updateSuccess = true;
      }

      // Step 4: Display appropriate success message
      if (updateSuccess) {
        alert("Vehicle updated successfully!");
      } else {
        alert("No changes detected.");
      }

      setModalOpen(false); // Close modal after successful update
    } catch (error) {
      alert("Failed to update the Vehicle.");
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-8 px-4 lg:px-12">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-200">
          Update or Delete Vehicles
        </h1>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-6">
          <p className="text-sm text-gray-300 text-center mb-4">
            Type at least two characters to search for Vehicles.
          </p>
          <SearchBar vehicles={vehicles} onSearch={handleSearch} />
        </div>

        {/* Vehicles Listing and Pagination */}
        {searchTerm.length >= 2 && filteredVehicles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 justify-center items-center gap-4 px-4 md:px-16 lg:px-16 max-w-full">
              {currentPageVehicles.map((vehicle) => (
                <div
                  key={vehicle.VehicleId}
                  className="p-4 flex flex-col justify-between w-full max-w-[350px] mx-auto"
                >
                  <VehicleCard
                    imageUrl={vehicle.ImageUrl || "/image-placeholder.png"}
                    brand={vehicle.Brand}
                    model={vehicle.Model}
                    transmission={vehicle.Transmission}
                    driveType={vehicle.DriveType}
                    fuelType={vehicle.FuelType}
                    year={vehicle.Year}
                  />
                  <div className="flex justify-between items-center mt-4 space-x-4">
                    <button
                      className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-all duration-200 w-full"
                      onClick={() =>confirmDeleteVehicle(vehicle)} // Trigger delete confirmation
                    >
                      Delete
                    </button>
                    <button
                      className="bg-indigo-600 text-white px-4 py-2 hover:bg-violet-300 hover:text-black transition-all duration-200 w-full"
                      onClick={() => handleUpdateVehicle(vehicle)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"flex justify-center mt-8 space-x-2 text-white"}
                pageClassName={
                  "p-2 text-white bg-black border border-image hover:bg-black hover:border-purple-400 transition-transform transform hover:scale-105"
                }
                activeClassName={
                  "bg-gradient-to-r bg-black text-black border border-image"
                }
                previousClassName={
                  "p-2 bg-black text-white border border-image hover:bg-black hover:border-purple-400 transition-transform transform hover:scale-105"
                }
                nextClassName={
                  "p-2 bg-black text-white border border-image hover:bg-black hover:border-purple-400 transition-transform transform hover:scale-105"
                }
                breakLabel={"..."}
                disabledClassName={"text-gray-400 cursor-not-allowed"}
              />
            </div>
          </>
        ) : (
          <p className="text-center text-gray-300 mt-6">
            Start typing to search for Vehicles.
          </p>
        )}

        {/* Update Modal */}
        {isModalOpen && selectedVehicle && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            title="Update Vehicle Information"
          >
            <VehicleUpdateForm
              vehicle={selectedVehicle}
              onSubmit={handleVehicleUpdateSubmit}
            />
          </Modal>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && vehicleToDelete && (
          <Modal
            isOpen={isDeleteModalOpen}
            onClose={cancelDeleteVehicle}
            title="Confirm Vehicle Deletion"
          >
            <p>Are you sure you want to delete this Vehicle?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all duration-200"
                onClick={() => handleDeleteVehicle(vehicleToDelete.VehicleId)}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-600 text-white px-4 py-2 hover:bg-gray-700 transition-all duration-200"
                onClick={cancelDeleteVehicle}
              >
                No, Cancel
              </button>
            </div>
          </Modal>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default UpdateDeletePage;
