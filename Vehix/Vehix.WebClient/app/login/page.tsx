// /app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { useAuth } from "@/components/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });

      if (response.status === 200) {
        console.log(response.status);
        localStorage.setItem("MDMVSCR", "139gPAI1cvaxxOSGNj39g01dcXX1h0e8g");
        login();
        router.push("/dashboard");
      }
    } catch (err) {
      localStorage.removeItem("MDMVSCR");
      if (err instanceof AxiosError) {
        const statusCode = err.response?.status;
        if (statusCode === 429) {
          setError("Timeout for 2 minutes.");
        } else {
          setError("Invalid credential.");
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center pb-48">
      <div className="bg-[#050709] p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl text-gray-200 font-bold mb-6 text-center">Administrator Login</h1>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 bg-gray- mb-4 rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
