// /components/SearchBar.tsx

"use client";

import { useState, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { IVehicle } from "@/types/vehicle";
import { FaCar } from "react-icons/fa6";

interface SearchBarProps {
  vehicles: IVehicle[];
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ vehicles, onSearch }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Combine all unique options for search
  const options = Array.from(
    new Set(
      vehicles.flatMap((vehicles) => [
        vehicles.Brand,
        vehicles.Model,
        vehicles.FuelType,
        vehicles.BodyType,
      ])
    )
  )
    .filter(
      (option) => option && option.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 8);

  // Trigger onSearch whenever the query changes
  useEffect(() => {
    onSearch(query);
  }, [onSearch, query]);

  return (
    <div className="flex justify-center items-center py-6">
      <div className="w-full max-w-3xl relative">
        <div
          className="relative bg-black border border-image rounded-lg shadow-lg"
          onClick={() => document.getElementById("search-input")?.focus()}
        >
          <Combobox
            value={query}
            onChange={(value) => {
              if (value !== null) {
                setQuery(value);
              }
            }}
          >
            <div className="relative">
              {/* Car Icon */}
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <FaCar className="text-white" />
              </div>

              {/* Search Input */}
              <Combobox.Input
                id="search-input"
                className="w-full placeholder-transparent focus:outline-none focus:ring-0 pl-12 py-4 rounded-2xl text-sm bg-[#050709] text-white "
                placeholder="Search by brand, model, fuel type, body type..."
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setQuery(e.target.value)}
              />

              {/* Floating Label */}
              <label
                className={`absolute left-12 text-white hover:text-yellow-100 transition-all ease-in-out duration-300
                  ${isFocused || query ? "top-0.5 text-xs" : "top-4 text-sm"}`}
              >
                {isFocused
                  ? "Search by brand, model, fuel type, body type"
                  : "Search vehicles"}
              </label>
              {query && (
                <Combobox.Options className="absolute w-9/12 mt-1 bg-[#050709] shadow-lg max-h-60 rounded-b-md overflow-auto z-10">
                  {options.length === 0 && query !== "" ? (
                    <div className="p-2 text-white">No results found.</div>
                  ) : (
                    options.map((option) => (
                      <Combobox.Option
                        key={option}
                        value={option}
                        className={({ active }) =>
                          `cursor-pointer select-none relative py-2 px-4 rounded-b-lg ${
                            active ? " text-yellow-100" : "text-white"
                          }`
                        }
                      >
                        {option}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              )}
            </div>
          </Combobox>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
