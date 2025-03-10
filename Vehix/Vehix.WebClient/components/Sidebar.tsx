// /components/Sidebar.tsx
import React, { useState } from "react";
import Link from "next/link";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaTasks,
  FaEnvelope,
  FaUsers,
} from "react-icons/fa";
import { usePathname } from "next/navigation";

const getCurrentSection = (pathname: string) => {
  switch (pathname) {
    case "/documentation/introduction":
      return "Introduction";
    case "/documentation/api-endpoint":
      return "API Endpoint";
    case "/documentation/response-example":
      return "Response Example";
    case "/documentation/technologies":
      return "Technologies Used";
    default:
      return "";
  }
};

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const currentSection = getCurrentSection(pathname);

  const toggleSidebar = () => {
    if (currentSection.length > 0) {
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col lg:w-64 lg:h-full lg:sticky lg:top-0 lg:left-0">
      {/* Button to open sidebar - only visible on small screens */}
      <div className="lg:hidden border border-image-straight-b">
        <div className="flex items-center my-2 mx-2">
          <div className="text-start">
            <button
              onClick={toggleSidebar}
              className="font-medium text-sm px-5 py-3 focus:ring-4 focus:outline-none text-white bg-transparent"
            >
              <FaBars />
            </button>
          </div>
          <div className="text-gray-600 text-sm truncate ml-4">
            <Link href="/documentation">
              <span className="text-white">Documentation</span>
            </Link>
            {currentSection && (
              <>
                <span className="mx-2">{">"}</span>
                <Link href={pathname}>
                  <span className="text-purple-300">{currentSection}</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Sidebar component */}
      <div
        className={`fixed top-0 left-0 z-40 w-72 h-screen p-6 overflow-y-auto transition-transform transform text-white lg:translate-x-0 lg:relative bg-[#131518] lg:transform-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-labelledby="sidebar-label"
      >
        <h6 id="sidebar-label" className="lg:text-lg font-semibold uppercase">
          <Link
            href="/documentation"
            className="flex items-center p-2 rounded-lg"
          >
            Documentation
          </Link>
        </h6>
        {/* Sidebar */}
        <button
          onClick={toggleSidebar}
          className="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center hover:bg-gray-600 hover:text-white lg:hidden"
        >
          <FaTimes className="w-5 h-5" aria-hidden="true" />
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/documentation/introduction"
                className="flex items-center p-2 ml-2 rounded-lg transition duration-300 hover:bg-[#1f2125]"
              >
                <FaTachometerAlt className="w-4 h-4 text-gray-200" />
                <span className="ml-3 text-gray-300 hover:text-white">
                  Introduction
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/documentation/api-endpoint"
                className="flex items-center p-2 ml-2 rounded-lg transition duration-300 hover:bg-[#1f2125]"
              >
                <FaTasks className="w-4 h-4 text-gray-200" />
                <span className="ml-3 text-gray-300 hover:text-white">
                  API Endpoint
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/documentation/response-example"
                className="flex items-center p-2 ml-2 rounded-lg  transition duration-300 hover:bg-[#1f2125]"
              >
                <FaEnvelope className="w-4 h-4 text-gray-200" />
                <span className="ml-3 text-gray-300 hover:text-white">
                  Response Example
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/documentation/technologies"
                className="flex items-center p-2 ml-2 rounded-lg transition duration-300 hover:bg-[#1f2125]"
              >
                <FaUsers className="w-4 h-4 text-gray-200" />
                <span className="ml-3 text-gray-300 hover:text-white">
                  Technologies Used
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
