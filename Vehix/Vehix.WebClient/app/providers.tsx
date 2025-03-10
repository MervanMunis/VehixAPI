"use client";

import { AuthProvider } from "@/components/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useState, useEffect } from "react";
import Image from "next/image";

export function Providers({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading process
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#101113]">
        <LoadingSpinner />
          <Image
            src="/logo.png"
            alt="Logo"
            width={105}
            height={50}
          />
      </div>
    );
  }
  return <AuthProvider>{children}</AuthProvider>;
}
