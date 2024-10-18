import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ImageSlideshow from "./ImageSlideshow";
import { API_URL } from "../config/api";

const AdsList = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/ads`);
        setAds(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch ads");
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (loading) return <div className="text-center">Laddar...</div>;
  if (error) return <div className="text-center">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Alla parfym annonser
      </h1>
      {ads.length === 0 ? (
        <p className="text-center">Inga annonser hittades</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <Link to={`/ad/${ad._id}`} key={ad._id} className="block">
              <div className="bg-white border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {ad.imageUrls && ad.imageUrls.length > 0 && (
                  <ImageSlideshow
                    images={ad.imageUrls}
                    alt={ad.fragranceName}
                  />
                )}
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-1 text-gray-800">
                    {ad.fragranceName}
                  </h2>
                  <p className="font-bold text-xl text-gray-700 mb-2">
                    Pris: {ad.price} SEK
                  </p>
                  <p className="text-sm text-gray-500">
                    Mängd kvar: {ad.quality}
                  </p>
                  {ad.userId && ad.userId.username && (
                    <p className="text-sm text-gray-500 mt-2">
                      Publicerad av: {ad.userId.username}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdsList;
