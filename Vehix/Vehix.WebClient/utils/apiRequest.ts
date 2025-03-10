/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
// /utils/apiRequest.ts

import axiosInstance from "./axiosInstance";

export async function apiRequest<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: any // Request body data (optional)
): Promise<T> {
  try {
    const response = await axiosInstance({
      url,
      method,
      data, // Pass the request body data if available
    });
    return response.data as T; // Return response data as the typed object
  } catch (error: any) {
    console.error(`API Request failed: ${error.message}`);
    throw new Error(error.response?.data?.message || "API request failed");
  }
}
