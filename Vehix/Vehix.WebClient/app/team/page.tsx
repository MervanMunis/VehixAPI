// /team/page.tsx
"use client";

import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

const Team = () => {
  const teamMembers = [
    {
      name: "Mert Denizci",
      title: "Software Developer",
      description:
        "Since my graduation, I have actively developed myself in various programming languages and technologies through projects and programs I have participated in. I trust my ability, intelligence, and skills in software development, particularly in backend. In every project I have been involved in, I worked harmoniously and with high performance within the team, achieving successful results. My goal is to advance and shape my professional career in software development.",
      imageUrl: "/mert.jpeg",
      linkedinUrl: "https://www.linkedin.com/in/mert-denizci/",
      github: "https://github.com/denizciMert",
    },
    {
      name: "Mervan Munis",
      title: "Software Developer",
      description:
        "I’ve been committed to continuous growth, always eager to learn new technologies and push my boundaries as a backend developer. I thrive on building and developing new solutions, and my passion for learning drives me to stay on top of emerging trends in the tech world. I enjoy working collaboratively with teams, bringing a balance of creativity and efficiency to every project I’m involved in. With a competitive spirit, I constantly challenge myself to deliver the best results, and I’m driven by the desire to keep evolving and making a lasting impact in software development.",
      imageUrl: "/mervan.jpg",
      linkedinUrl: "https://www.linkedin.com/in/mervan-munis/",
      github: "https://github.com/MervanMunis",
    },
  ];

  return (
    <div className="mx-auto text-base p-4 md:p-9 text-gray-300">
      {/* Title */}
      <h1 className="mb-8 text-center text-2xl md:text-3xl font-bold">
        Meet Our Team
      </h1>

      {/* Introduction */}
      <p className="mb-8 leading-relaxed text-center">
        We&#39;re a dynamic duo passionate about software development,
        continuously learning, and applying our knowledge to build innovative
        projects.
      </p>

      {/* Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="p-4 md:p-6 rounded-lg transition-colors duration-150 bg-[#131518] hover:bg-[#1f2125]"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 mx-auto rounded-full overflow-hidden mb-4 md:mb-6">
              <Image
                src={member.imageUrl}
                alt={`${member.name}'s profile picture`}
                className="w-full h-full object-cover"
                width={192}
                height={192}
              />
            </div>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-center text-gray-200">
              {member.name}
            </h2>
            <p className="text-gray-400 font-medium mb-4 text-center">
              {member.title}
            </p>
            <p className="text-sm md:text-base text-gray-300 mb-6">
              {member.description}
            </p>
            <div className="flex justify-center space-x-6">
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="text-xl md:text-2xl text-gray-400 hover:text-blue-400" />
                </a>
              )}
              {member.linkedinUrl && (
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="text-xl md:text-2xl text-gray-400 hover:text-blue-400" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
