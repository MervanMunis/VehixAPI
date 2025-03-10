// /app/about/page.tsx
"use client";

import React from "react";
import Link from "next/link";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto py-16 lg:py-24 px-4 lg:px-8 text-base text-gray-200">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          About Us
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          We are a dedicated team committed to transforming the vehicle industry through innovative technology 
          and user-focused solutions. Our mission is to empower users with the tools they need to manage their vehicles effectively, 
          no matter what type they are.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="p-8 rounded-xl shadow-lg transition-all duration-300 bg-[#131518] hover:bg-[#1f2125]">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            Our Mission
          </h2>
          <p className="text-lg text-gray-300 text-center">
            To streamline vehicle management by providing intuitive, high-tech solutions that enhance the user experience and drive industry innovation.
          </p>
        </div>
        <div className="p-8 rounded-xl shadow-lg transition-all duration-300 bg-[#131518] hover:bg-[#1f2125]">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            Our Vision
          </h2>
          <p className="text-lg text-gray-300 text-center">
            To build a connected digital ecosystem that empowers users with the tools they need to manage their vehicles effectively and make informed decisions.
          </p>
        </div>
      </section>

      {/* Goals Section */}
      <section className="mb-16">
        <div className="p-12 rounded-xl shadow-lg transition-all duration-300 bg-[#131518] hover:bg-[#1f2125]">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Our Goals
          </h2>
          <ul className="list-disc list-inside space-y-4 text-lg max-w-4xl mx-auto">
            <li>Develop state-of-the-art vehicle management and data analytics solutions.</li>
            <li>Create user-friendly platforms accessible to individuals at all skill levels.</li>
            <li>Continuously innovate by integrating user feedback and staying ahead of industry trends.</li>
            <li>Establish ourselves as a leader in vehicle technology innovation.</li>
          </ul>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="text-center">
        <div className="p-12 rounded-xl shadow-lg transition-all duration-300 bg-[#131518] hover:bg-[#1f2125]">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Who We Are
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            We are a team of passionate innovators and technologists committed to revolutionizing the vehicle ownership experience through cutting-edge technology and seamless user interfaces.
          </p>
          <Link href="/team" legacyBehavior>
            <a className="px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 bg-indigo-400 hover:bg-indigo-500 text-black">
              Meet Our Team
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
