// /app/page.tsx
"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import ReactPaginate from "react-paginate";
import SearchBar from "@/components/SearchBar";
import { IVehicle } from "@/types/vehicle";
import VehicleCard from "@/components/VehicleCard";
import { getVehiclesFrontend } from "@/utils/vehicleRequests";
import Hero from "@/components/Hero";
import VehicleDetail from "@/components/VehicleDetail";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Home() {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const itemsPerPage = 28;
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<IVehicle | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const isMounted = useRef(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const vehicleData = await getVehiclesFrontend();
        setVehicles(vehicleData.data);
      } catch (error) {
        console.error("Failed to fetch vehicles", error);
      } finally {
        setLoading(false);
      }
    };

    if (!isMounted.current) {
      fetchVehicles();
      isMounted.current = true;
    }
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term.trim().toLowerCase());
    setCurrentPage(0); // Reset to first page when searching
  }, []);

  const offset = currentPage * itemsPerPage;

  const filteredVehicles = useMemo(() => {
    if (!searchTerm) return vehicles;

    const words = searchTerm.split(/\s+/);

    return vehicles.filter((vehicle) =>
      words.every(
        (word) =>
          vehicle.Brand?.toLowerCase().includes(word) ||
          vehicle.Model?.toLowerCase().includes(word) ||
          vehicle.FuelType?.toLowerCase().includes(word) ||
          vehicle.BodyType?.toLowerCase().includes(word) ||
          vehicle.Transmission?.toLowerCase().includes(word)
      )
    );
  }, [searchTerm, vehicles]);

  const currentPageVehicles = filteredVehicles.slice(
    offset,
    offset + itemsPerPage
  );
  const pageCount = Math.ceil(filteredVehicles.length / itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleVehicleClick = (vehicle: IVehicle) => {
    setSelectedVehicle(vehicle);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedVehicle(null);
  };

  return (
    <main>
      <div className="mt-4 max-width">
        {/*<Hero />*/}
        <Hero />
        {loading ? (
          // Show loading only in VehicleVehicled section while data is being fetched
          <div role="status" className="flex items-center justify-center">
            <div className="">
              <LoadingSpinner/>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div className="py-12">
            <div className="mb-10 px-4">
              <SearchBar vehicles={vehicles} onSearch={handleSearch} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 justify-center items-center gap-4 px-4 md:px-16 lg:px-16 max-w-full">
              {currentPageVehicles.length > 0 ? (
                currentPageVehicles.map((vehicle: IVehicle) => (
                  <div
                    key={vehicle.VehicleId}
                    onClick={() => handleVehicleClick(vehicle)}
                  >
                    <VehicleCard
                      imageUrl={
                        vehicle.ImageUrl ||
                        "/image-placeholder.png"
                      }
                      brand={vehicle.Brand}
                      model={vehicle.Model}
                      transmission={vehicle.Transmission}
                      driveType={vehicle.DriveType}
                      fuelType={vehicle.FuelType}
                      year={vehicle.Year}
                    />
                  </div>
                ))
              ) : (
                // Show a message if no vehicles are found
                <div className="col-span-4 text-center py-12">
                  <p className="text-xl text-gray-300">No vehicles found.</p>
                </div>
              )}
            </div>

            {filteredVehicles.length > 0 && (
            <ReactPaginate
              previousLabel={"<- Previous"}
              nextLabel={"Next ->"}
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
            />
           )}

            {/* Vehicle Detail Modal */}
            <VehicleDetail
              vehicle={selectedVehicle}
              isOpen={isModalOpen}
              onClose={closeModal}
            />
          </div>
        )}
      </div>
    </main>
  );
}
