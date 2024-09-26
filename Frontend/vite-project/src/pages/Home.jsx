import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import axios from "axios";
import LetterPullupComponent from "../components/letter-pullup";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      setIsSearching(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/search?q=${query}`
        );
        setSearchResults(response.data);
        setShowDropdown(true);
      } catch (error) {
        console.error("Error searching:", error);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Sök efter Parfymer</h2>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Vad vill du söka efter?"
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {showDropdown && searchResults.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
            >
              {searchResults.map((result) => (
                <Link
                  key={result._id}
                  to={`/ad/${result._id}`}
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  <div className="font-semibold">{result.fragranceName}</div>
                  <div className="text-sm text-gray-600">
                    {result.price} SEK
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-6">
          <LetterPullupComponent words="Välkommen till ScentSaving" />
        </h1>
        <p className="text-lg mb-4 text-center">
          Hitta din perfekta doft till ett fantastiskt pris! Utforska vår
          samling av varsamt använda, lyxiga parfymer.
        </p>
        <p className="mb-4 text-center">
          Oavsett om du letar efter en sällsynt doft eller vill ge ett nytt hem
          till en parfym du inte längre använder, har du kommit rätt.
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
              <p className="text-white text-lg font-semibold">Upptäck mera</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
