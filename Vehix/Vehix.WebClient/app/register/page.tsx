"use client";

import React, { useState } from "react";
import { postRequest } from "@/utils/apiKeyRequests";

const RegisterPage = () => {
  const [emailSetted, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postRequest(emailSetted);

      if (response.success) {
        setMessage(
          "A verification email has been sent to your inbox. Please check your email to complete the registration."
        );
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-300">
      <div className="w-full max-w-md p-8 space-y-8 bg-[#1f2125] rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center">
          Sign Up for an API Key
        </h2>
        <div className="flex space-x-2">
          <a
            href="/terms-conditions"
            className="w-full text-center py-4 text-lg font-semibold rounded-lg transition-all duration-300 text-gray-200 bg-slate-700 hover:bg-slate-600"
          >
            Terms & Conditions
          </a>
          <a
            href="/privacy-policy"
            className="w-full text-center py-4 text-lg font-semibold rounded-lg transition-all duration-300 text-gray-200 bg-slate-700 hover:bg-slate-600"
          >
            Privacy Policy
          </a>
        </div>
        <p className="text-center text-gray-400">
          Enter your email below to request an API key. You'll receive a
          verification email with further instructions.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            required
            placeholder="Your email address"
            className="w-full p-4 bg-[#131518] rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={emailSetted}
            onChange={(e) => setEmail(e.target.value)}
          />
          {message && <p className="text-green-500">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-4 text-lg font-semibold rounded-lg transition-all duration-300 text-black bg-green-400 hover:bg-green-300"
          >
            Request API Key
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
