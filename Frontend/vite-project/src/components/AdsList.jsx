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
        console.log("Fetching ads from API");
        const response = await axios.get(`${API_URL}/api/ads`);
        console.log("Received ads:", response.data);
        setAds(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching ads:", err);
        setError("Failed to fetch ads");
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (loading) return <div>Laddar...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Alla parfym annonser</h1>
      {ads.length === 0 ? (
        <p>Inga annonser hittades</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ads.map((ad) => (
            <Link to={`/ad/${ad._id}`} key={ad._id} className="block">
              <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-xl font-semibold mb-2">
                  {ad.fragranceName}
                </h2>
                {ad.imageUrls && ad.imageUrls.length > 0 && (
                  <ImageSlideshow
                    images={ad.imageUrls}
                    alt={ad.fragranceName}
                  />
                )}

                <p className="font-bold">Pris: {ad.price} SEK</p>
                <p className="text-sm text-gray-500">
                  Mängd kvar: {ad.quality}
                </p>
                {ad.userId && ad.userId.username && (
                  <p className="text-sm text-gray-500 mt-2">
                    Publicerad av: {ad.userId.username}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdsList;
