/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
// /utils/carRequests.ts
import { apiRequest } from "./apiRequest";
import { IVehicle } from "../types/vehicle";
import { vehicleJson } from "../types/vehicleRequestJson";
import axiosInstance from "./axiosInstance";

interface IVehicleApiResponse {
  data: IVehicle[];
}

// API Base URL is already handled in the axiosInstance
export const getVehiclesAdmin = async (): Promise<IVehicleApiResponse> => {
  return await apiRequest<IVehicleApiResponse>("/vehicles/admin", "GET");
};

export const getVehiclesFrontend = async (): Promise<IVehicleApiResponse> => {
  return await apiRequest<IVehicleApiResponse>("/vehicles/limited", "GET");
};

export const getVehicleById = async (vehicleId: string): Promise<IVehicle> => {
  return await apiRequest<IVehicle>(`/vehicles/${vehicleId}`, "GET");
};

export const createVehicle = async (car: vehicleJson): Promise<IVehicle> => {
  return await apiRequest<IVehicle>("/vehicles", "POST", car);
};

export const createVehicles = async (
  vehicles: vehicleJson[]
): Promise<{ message: string; count: number }> => {
  return await apiRequest<{ message: string; count: number }>(
    "/vehicles/bulk",
    "POST",
    vehicles
  );
};

export const updateVehicle = async (
  vehicleId: string,
  vehicle: Partial<vehicleJson>
): Promise<string> => {
  return await apiRequest<string>(`/vehicles/${vehicleId}`, "PUT", vehicle);
};

export const updateVehicleImage = async (
  vehicleId: string,
  file: File
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axiosInstance.put(
    `/vehicles/${vehicleId}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const deleteVehicle = async (vehicleId: string): Promise<string> => {
  return await apiRequest<string>(`/vehicles/${vehicleId}`, "DELETE");
};
