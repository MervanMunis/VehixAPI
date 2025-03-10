// /app/dashboard/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { FaPlus, FaEdit } from "react-icons/fa";
import ProtectedRoute from "@/components/ProtectedRoute";

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto py-10 px-4 lg:px-8">
          <h1 className="text-xl md:text-2xl lg:text-3xl mb-8 font-semibold text-gray-200 text-center">
            Admin Dashboard
          </h1>

          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
            {/* Add New Car Card */}
            <Link
              href="/dashboard/vehicles/add"
              className="group block p-6 bg-[#050709] transition-transform transform hover:scale-105 rounded-2xl"
            >
              <div className="flex justify-center items-center mb-4">
                <FaPlus className="text-4xl text-green-300 group-hover:text-white transition duration-300" />
              </div>
              <h3 className="text-md md:text-lg lg:text-xl font-bold text-gray-300 text-center group-hover:text-gray-200">
                Add New Vehicle
              </h3>
            </Link>

            {/* Update Car Card */}
            <Link
              href="/dashboard/vehicles/updatedelete"
              className="group block p-6 bg-[#050709] transition-transform transform hover:scale-105 rounded-2xl"
            >
              <div className="flex justify-center items-center mb-4">
                <FaEdit className="text-4xl text-orange-300 group-hover:text-white transition duration-300" />
              </div>
              <h3 className="text-md md:text-lg lg:text-xl font-bold text-gray-300 text-center group-hover:text-gray-200">
                Update / Delete Vehicle
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
