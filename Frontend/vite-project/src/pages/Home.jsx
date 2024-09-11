import React, { useState } from "react";
import { Search } from "lucide-react";
import LetterPullUp from "../components/letter-pullup";
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Sök</h2>
        <form onSubmit={handleSearch}>
          <div className="mb-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Vad vill du söka efter?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-300"
          >
            Hitta annonser
          </button>
        </form>
      </div>

      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-6">
          <LetterPullUp words="Welcome to ScentSaving" />
        </h1>
        <p className="text-lg mb-4">
          Find your perfect scent at a great price! Browse our collection of
          gently used, luxury perfumes.
        </p>
        <p className="mb-4">
          Whether you're looking for a rare fragrance or want to give a new home
          to a perfume you no longer use, you're in the right place.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src="/parfym1.webp"
              alt={`Perfume ${index}`}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-lg font-semibold">Discover More</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
