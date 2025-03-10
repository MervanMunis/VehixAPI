"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { postVerify } from "@/utils/apiKeyRequests";
import { FaKey, FaRegClipboard } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";

const VerifyPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("");
  const [isSuccess, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = async () => {
    setIsLoading(true);
    await navigator.clipboard.writeText(message);
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };

  // Automatically trigger verification on page load
  useEffect(() => {
    const verifyToken = async () => {
      setMessage(""); // Clear message on every load
      if (!token) {
        setSuccess(false);
        setMessage("Invalid token. Please make sure you have the correct URL.");
        return;
      }

      try {
        setIsLoading(true);
        const response = await postVerify(token);
        if (response.success) {
          setSuccess(true);
          setMessage(response.data);
        } else {
          setSuccess(false);
          setMessage("Verification failed. The token is invalid or expired.");
        }
      } catch (err) {
        setSuccess(false);
        setMessage("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken(); // Call the verification function on page load
  }, [token]); // Re-trigger if token changes

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-300">
      <div className="w-full max-w-md p-8 space-y-8 bg-[#1f2125] rounded-xl shadow-lg ">
        <h2 className="text-3xl font-bold text-center text-white">
          {isSuccess ? "Your API Key is Ready!" : "Verification Failed"}
        </h2>
        <p className="text-center text-gray-400">
          {isSuccess
            ? "This is your one-time API key. Make sure to save it somewhere safe as you won’t be able to view it again."
            : "There was an issue with your token. Please check the link and try again."}
        </p>
        <section className="pb-4">
          <div className="bg-[#131518] rounded-lg p-6 shadow-md group-hover:bg-gray-700">
            <div className="flex justify-between items-center mb-4">
              <div className="space-x-2 flex items-center">
                <FaKey className="w-5 h-5 text-green-400" />
                <h2 className="font-semibold text-gray-300">
                  {isSuccess
                    ? "Remember, this is your only chance to copy the key."
                    : "Unfortunately, we couldn't verify your token."}
                </h2>
              </div>
            </div>
            <div className="relative">
              <pre className="bg-[#1f2125] rounded p-4 text-base text-green-400 overflow-auto">
                <code>{message || "Fetching your API Key..."}</code>
              </pre>
              {isSuccess && (
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 p-2 bg-[#1f2125] text-white rounded hover:bg-gray-600"
                  aria-label="Copy"
                >
                  {isLoading ? (
                    <FiLoader className="w-5 h-5 animate-spin" />
                  ) : (
                    <FaRegClipboard className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VerifyPage;
