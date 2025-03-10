/* eslint-disable react-hooks/exhaustive-deps */
// /components/Navbar.tsx
"use client";

import React, { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import Image from "next/image";
import { useAuth } from "./AuthContext";
import "../app/globals.css";

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav
      className={`
        ${isVisible ? "opacity-100" : "opacity-0"}
        bg-[#050709] fixed w-full z-20 top-0 start-0 border-b border-image-straight transition-opacity duration-300`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="/logo.png"
            alt="Logo"
            width={105}
            height={50}
            className="cursor-pointer"
          />
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex font-medium border-image rounded-sm text-sm px-4 py-2 text-center bg-transparent transition duration-200 focus:ring-1 focus:outline-none border text-white"
            >
              <FaSignOutAlt className="w-5 h-5 mr-2" />
              Log out
            </button>
          ) : (null)}
          <button
            onClick={toggleMenu}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex border border-image-sticky items-center p-2 w-10 h-10 justify-center text-sm focus:outline-none focus:ring-2 text-white rounded-lg md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
            <li>
              <a
                href="/"
                className="block py-2 px-3 transition duration-200 md:p-0 text-white hover:text-yellow-100"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/documentation"
                className="block py-2 px-3 transition duration-200 md:p-0 text-white hover:text-yellow-100"
              >
                Documentation
              </a>
            </li>
            <li>
              <a
                href="/team"
                className="block py-2 px-3 transition duration-200 md:p-0 text-white hover:text-yellow-100"
              >
                Team
              </a>
            </li>
            <li>
              <a
                href="/test"
                className="block py-2 px-3 transition duration-200 md:p-0 text-white hover:text-yellow-100"
              >
                Test
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="block py-2 px-3 transition duration-200 md:p-0 text-white hover:text-yellow-100"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="block py-2 px-3 transition duration-200 md:p-0 text-white hover:text-yellow-100"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/register"
                className="block py-2 px-3 transition duration-200 md:p-0 text-white hover:text-yellow-100"
              >
                Register
              </a>
            </li>
            {isLoggedIn ? (
              <li>
                <a
                  href="/dashboard"
                  className="block py-2 px-3 transition duration-200 md:p-0 text-white hover:text-yellow-100"
                >
                  Dashboard
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
