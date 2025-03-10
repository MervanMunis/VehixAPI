// /components/VehicleDataGrid.tsx
"use client";

import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IVehicle } from "../types/vehicle";
import { getVehiclesFrontend } from "@/utils/vehicleRequests";

interface VehicleTableProps {
  loadData: boolean;
  onFetchComplete: (time: number, vehicleCount: number) => void; // callback prop to pass fetch time and vehicle count
}

const VehicleTable: React.FC<VehicleTableProps> = ({
  loadData,
  onFetchComplete,
}) => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch data only if loadData is true
  useEffect(() => {
    if (loadData) {
      const fetchVehicles = async () => {
        const startTime = performance.now();
        setLoading(true);

        try {
          const vehicleData = await getVehiclesFrontend(); // Fetch data from API
          setVehicles(vehicleData.data);
          const endTime = performance.now();
          const fetchTime = (endTime - startTime) / 1000; // Calculate fetch time in seconds
          onFetchComplete(fetchTime, vehicleData.data.length); // Send fetch info to parent component
        } catch (error) {
          console.error("Failed to fetch vehicles:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchVehicles();
    }
  }, [loadData, onFetchComplete]);

  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    { field: "VehicleType", headerName: "Vehicle Type", width: 120 },
    { field: "Brand", headerName: "Brand", width: 120 },
    { field: "Model", headerName: "Model", width: 150 },
    { field: "BodyType", headerName: "Body Type", width: 120 },
    { field: "Package", headerName: "Package", width: 120 },
    { field: "Transmission", headerName: "Transmission", width: 120 },
    { field: "FuelType", headerName: "Fuel Type", width: 120 },
    { field: "DriveType", headerName: "Drive Type", width: 120 },
    { field: "EnginePower", headerName: "Engine Power", width: 120 },
    { field: "EngineCapacity", headerName: "Engine Capacity", width: 130 },
    { field: "Year", headerName: "Year", width: 100 },
    { field: "IsClassic", headerName: "Is Classic", width: 120 },
    { field: "ImageUrl", headerName: "Image", width: 120 },
  ];

  return (
    <div className="h-[450px] w-full overflow-x-auto rounded-xl">
      <div className="h-full">
        <DataGrid
          rows={vehicles}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.VehicleId}
          pageSizeOptions={[25, 50, 75, 100]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25, page: 0 },
            },
          }}
          pagination
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              position: "sticky",
              top: 0,
              zIndex: 999,
            },
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: "#1e293b",
              color: "#e5e7eb",
            },
            "& .MuiDataGrid-row:nth-of-type(even)": {
              backgroundColor: "black",
              color: "#e5e7eb",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#f9f9f9",
            },
          }}
        />
      </div>
    </div>
  );
};
export default VehicleTable;
