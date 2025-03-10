// /components/LogoutButton.tsx
"use client";
import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear JWT token
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
