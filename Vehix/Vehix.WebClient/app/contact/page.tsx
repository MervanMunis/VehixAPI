// /app/contact/page.tsx

"use client";

import React, { useState } from "react";
import axios from "axios";

const ContactPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    const formData = {
      toEmail: "munismervan@gmail.com",
      subject: "Contact Form Vehix-Contact Page",
      message: `First name: ${firstName}, Last name: ${lastName}, Email: ${email}, Phone: ${phone}, Message: ${message}`,
    };

    try {
      await axios.post("https://api.vehixapi.com/contact/send", formData);
      setSuccess(true);
      alert("Message sent successfully");
    } catch (error) {
      setError("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen py-16 lg:py-24 px-4 lg:px-8 text-gray-300 bg-cover bg-center"
      style={{ backgroundImage: "url('/contact.jpeg')" }}
    >
      <div className="bg-black bg-opacity-60 min-h-screen rounded-xl p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Get in touch
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="text-left">
              <div className="grid space-y-2">
                <a
                  href="https://www.linkedin.com/in/mervan-munis/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="p-6 rounded-xl shadow-lg transition-all duration-300 bg-[#131518] hover:bg-[#111216]">
                    <h2 className="text-2xl font-bold mb-2">Mervan Munis</h2>
                    <p className="text-lg ml-2">
                      Software Developer & Co-Founder
                    </p>
                    <p className="text-lg ml-2">mervan.munis@gmail.com</p>
                    <p className="text-lg ml-2">Istanbul, Turkey</p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/mert-denizci/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="p-6 rounded-xl shadow-lg transition-all duration-300 bg-[#131518] hover:bg-[#111216]">
                    <h2 className="text-2xl font-bold mb-2">Mert Denizci</h2>
                    <p className="text-lg ml-2">
                      Software Developer & Co-Founder
                    </p>
                    <p className="text-lg ml-2">mertdenizci99@gmail.com</p>
                    <p className="text-lg ml-2">Istanbul, Turkey</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="p-4 bg-[#1c1e22] bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    required
                  />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="p-4 bg-[#1c1e22] bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    required
                  />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full p-4 bg-[#1c1e22] bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  required
                />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  className="w-full p-4 bg-[#1c1e22] bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message"
                  rows={5}
                  className="w-full p-4 bg-[#1c1e22] bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-4 font-semibold rounded-lg transition-all duration-300 text-black bg-indigo-400 hover:bg-indigo-300"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send message"}
                </button>
                {success && (
                  <p className="text-green-500 mt-4">
                    Message sent successfully!
                  </p>
                )}
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
