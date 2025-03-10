"use client";

import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="relative flex justify-center items-center p-10">
      <div className="flex animate-bounce rounded-full h-16 w-16 border border-image items-center justify-center">
        <p className="text-white text-5xl z-50">V</p>
        <div className="absolute animate-ping rounded-full h-16 w-16 border border-image"></div>
        <div className="absolute animate-spin rounded-full h-16 w-16 border border-image"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
