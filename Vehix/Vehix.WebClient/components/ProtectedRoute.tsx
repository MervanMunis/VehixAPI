// /components/ProtectedRoute.tsx

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import LoadingSpinner from "./LoadingSpinner";

// Add a prop to specify if the route is admin-only
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const authenticate = async () => {
      if (!isLoggedIn) {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    };

    authenticate();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    // Avoid rendering if not authenticated or unauthorized
  }

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>; // Render the content if checks pass
};

export default ProtectedRoute;
