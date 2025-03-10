// /app/documentation/technologies/page.tsx
"use client";

import React from "react";
import Image from "next/image";

const Technologies: React.FC = () => {
  return (
    <div className="mx-auto text-base md:p-9 text-gray-300">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-200 mb-8">
        Technologies Used in Vehix API
      </h1>

      {/* Tech Stack Image */}
      <div className="relative w-full h-96 mb-4">
        <Image
          src="/tech-stack.png"
          alt="Tech Stack"
          className="object-contain"
          layout="fill"
        />
      </div>
      <h3 className="text-center text-xl mb-8">Out Tech Stack</h3>

      {/* Backend Technologies */}
      <div className="mb-8">
        <div className="">
          <h3 className="text-2xl font-semibold text-gray-200 mb-4">
            Backend Technologies
          </h3>
          <p className="leading-relaxed mb-4">
            The backend of the Vehix API is built with a focus on scalability,
            security, and performance. We utilize modern, cutting-edge
            technologies to deliver efficient data processing and robust API
            endpoints, ensuring seamless user experiences and reliable
            operations.
          </p>
          <ol className="list-disc list-inside space-y-4">
            <li className="ml-4">
              <span className="items-center justify-center flexc">
                <strong className="font-medium text-green-400">C#:</strong>
                <p className="ml-8 mt-2">
                  A powerful, statically-typed programming language known for
                  its performance, reliability, and versatility, used to
                  implement the core logic of the API.
                </p>
              </span>
            </li>
            <li className="ml-4">
              <strong className="font-medium text-green-400">ASP.NET Core Web API:{" "}</strong>
              <p className="ml-8 mt-2 ">
                A high-performance, cross-platform framework that is ideal for
                building RESTful APIs. ASP.NET Core 8 enables rapid development,
                efficient integration with various services, and seamless
                scaling.
              </p>
            </li>
            <li className="ml-4">
              <strong className="font-medium text-green-400">MongoDB:</strong>
              <p className="ml-8 mt-2">
                A NoSQL database that supports flexible schema design, high
                availability, and horizontal scaling, making it perfect for
                managing large datasets.
              </p>
            </li>
            <li className="ml-4">
              <strong className="font-medium text-green-400">Rate Limiting:</strong>
              <p className="ml-8 mt-2">
                Implemented to control the rate of requests to the API, ensuring
                stability and preventing abuse.
              </p>
            </li>
            <li className="ml-4">
              <strong className="font-medium text-green-400">Redis:</strong>
              <p className="ml-8 mt-2">
                Used for caching and session management, improving the
                performance and responsiveness of the API by reducing database
                load.
              </p>
            </li>
            <li className="ml-4">
              <strong className="font-medium text-green-400">Security:</strong>
              <p className="ml-8 mt-2">
                Advanced security measures, including token-based
                authentication, secure data transmission, and data encryption,
                are in place to protect user data and API integrity.
              </p>
            </li>
            <li className="ml-4">
              <strong className="font-medium text-green-400">JWT (JSON Web Tokens):</strong>
              <p className="ml-8 mt-2">
                Used for secure, token-based authentication, ensuring that only authorized users can access the API. 
                JWTs also help facilitate stateless communication between the client and server.
              </p>
            </li>
            <li className="ml-4">
              <strong className="font-medium text-green-400">Serilog:</strong>
              <p className="ml-8 mt-2">
                A diagnostic logging library used to capture and manage logs, 
                helping to monitor application behavior and troubleshoot issues 
                effectively.
              </p>
            </li>
            <li className="ml-4">
              <strong className="font-medium text-green-400">Nginx:</strong>
              <p className="ml-8 mt-2">
                Used as a reverse proxy and load balancer, Nginx ensures secure communication between the frontend and backend, 
                as well as optimized performance and scalability. Additionally, it is employed to manage SSL termination, ensuring 
                secure and encrypted communications between clients and the API.
              </p>
            </li>
            <li className="ml-4">
              <strong className="font-medium text-green-400">Docker:</strong>
              <p className="ml-8 mt-2">
                Containerization with Docker ensures consistency across development, testing, and production environments.
                 It simplifies deployment, allows for seamless scaling, and isolates application dependencies.
              </p>
            </li>
            <li className="ml-4">
              <strong className="font-medium text-green-400">Bcrypt:</strong>
              <p className="ml-8 mt-2">
                Used for hashing sensitive data, such as API keys and passwords, Bcrypt adds an extra layer of security
                 by making it computationally infeasible to reverse-engineer the original values.
              </p>
            </li>
          </ol>
        </div>
      </div>

      {/* Frontend Technologies */}
      <div className="mb-8">
        <div className="">
          <h3 className="text-2xl mb-4 font-semibold text-gray-200">
            Frontend Technologies
          </h3>
          <p className="leading-relaxed mb-4">
            The frontend of the CarAPI documentation and user interface is built
            using modern web technologies that ensure a seamless and responsive
            user experience across all devices:
          </p>
          <ol className="list-disc list-inside space-y-4">
            <li className="ml-4">
              <span className="items-center justify-center flexc">
                <strong className="font-medium text-green-400">
                  Next.js 14:
                </strong>
                <p className="ml-8 mt-2">
                  A powerful React framework that supports server-side
                  rendering, static site generation, and dynamic routing,
                  providing fast load times and optimized performance.
                </p>
              </span>
            </li>
            <li className="ml-4">
              <strong className="font-medium text-green-400">
                TypeScript:
              </strong>
              <p className="ml-8 mt-2 ">
                A statically typed superset of JavaScript that enhances code
                quality and maintainability, ensuring robust and error-free code
                for the frontend.
              </p>
            </li>
            <li className="ml-4">
              <strong className="font-medium text-green-400">
                Tailwind CSS:{" "}
              </strong>
              <p className="ml-8 mt-2">
                A utility-first CSS framework that allows for rapid UI
                development, enabling a clean, consistent, and responsive design
                across the platform.
              </p>
            </li>
          </ol>
        </div>
      </div>

      {/* Additional Tools and Services */}
      <div className="mb-8">
        <div className="">
          <h3 className="font-semibold text-2xl mb-4 text-gray-200">
            Additional Tools and Services
          </h3>
          <p className="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed mb-4 group-hover:text-purple-200">
            In addition to the core technologies, we leverage a variety of tools
            and services to streamline development, enhance security, and ensure
            a smooth operational workflow:
          </p>
          <ol className="list-disc list-inside space-y-4">
            <li className="ml-4">
              <span className="items-center justify-center flexc">
                <strong className="font-medium text-green-400">Docker:</strong>
                <p className="ml-8 mt-2">
                  Utilized for containerizing the application, ensuring
                  consistency across different environments, simplifying
                  deployment, and enhancing scalability.
                </p>
              </span>
            </li>
            <li className="ml-4">
              <strong className="font-medium text-green-400">GitHub:</strong>
              <p className="ml-8 mt-2 ">
                A version control platform used for managing the codebase,
                facilitating collaboration, and maintaining the project&#39;s
                history and integrity.
              </p>
            </li>
          </ol>
        </div>
      </div>

      {/* Practical Tips for Developers */}
      <div className="mb-8">
        <div className="">
          <h3 className="text-gray-200 text-2xl mb-4 font-semibold">
            Practical Tips for Developers
          </h3>
          <p className="leading-relaxed mb-4">
            When working with the CarAPI, consider these best practices and tips
            to optimize your development workflow and ensure robust, efficient
            application development:
          </p>
          <ol className="list-disc list-inside space-y-4">
            <li className="ml-4">
              <span className="items-center justify-center flexc">
                <strong className="font-medium text-green-400">
                  API Rate Limits:
                </strong>
                <p className="ml-8 mt-2">
                  Be mindful of the API&#39;s rate limits. Use caching strategies to
                  minimize the number of API requests and reduce latency.
                </p>
              </span>
            </li>
            <li className="ml-4">
              <strong className="font-medium text-green-400">
                Secure Your API Requests:
              </strong>
              <p className="ml-8 mt-2 ">
                Always use HTTPS to secure your API requests. Ensure that tokens
                and sensitive data are handled securely on both client and
                server sides.
              </p>
            </li>
            <li className="ml-4">
              <strong className="font-medium text-green-400">
                Optimize Frontend Performance:
              </strong>
              <p className="ml-8 mt-2">
                Use lazy loading for components and images to improve the
                initial load time of your frontend applications, especially when
                dealing with large datasets.
              </p>
            </li>
            <li className="ml-4">
              <strong className="font-medium text-green-400">
                Leverage Docker for Local Development:
              </strong>
              <p className="ml-8 mt-2">
                Use Docker to replicate production environments locally, which
                helps to catch environment-specific issues early in the
                development process.
              </p>
            </li>
          </ol>
        </div>
      </div>

      {/* Conclusion */}
      <section className="">
        <h3 className="text-2xl font-semibold text-gray-200 mb-4">
          Conclusion
        </h3>
        <p className="leading-relaxed">
          The{" "}
          <strong className="text-green-300 group-hover:text-yellow-200">
            Vehix API
          </strong>{" "}
          is powered by a cutting-edge technology stack, ensuring that it
          remains secure, scalable, and high-performing. Whether you&#39;re
          developing backend systems or crafting intuitive frontend experiences,
          these technologies offer a robust foundation for building innovative
          and reliable applications. We invite you to dive into the CarAPI,
          create remarkable projects, and contribute to its ongoing growth and
          success.
        </p>
      </section>
    </div>
  );
};

export default Technologies;
