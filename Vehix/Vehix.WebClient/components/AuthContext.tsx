// components/AuthContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isLoggedIn: boolean;
  checkAuth: () => Promise<void>;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const hasCheckedAuth = useRef(false);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const authFlag = localStorage.getItem("MDMVSCR");
      if (!authFlag) {
        return;
      }
      const response = await axiosInstance.get("/auth/check");
      setIsLoggedIn(response.data);
    } catch {
      localStorage.removeItem("MDMVSCR");
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    if (!hasCheckedAuth.current) {
      checkAuth();
      hasCheckedAuth.current = true;
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("MDMVSCR");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setIsLoggedIn(false);
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, checkAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
