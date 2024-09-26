import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ImageSlideshow from "./ImageSlideshow";

const AdsList = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        console.log("Fetching ads from API");
        const response = await axios.get("http://localhost:3000/api/ads");
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">All Fragrance Ads</h1>
      {ads.length === 0 ? (
        <p>No ads found.</p>
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
                <p className="text-gray-600 mb-2 line-clamp-2">
                  {ad.description}
                </p>
                <p className="font-bold">Price: {ad.price} SEK</p>
                <p className="text-sm text-gray-500">Quality: {ad.quality}</p>
                {ad.userId && ad.userId.username && (
                  <p className="text-sm text-gray-500 mt-2">
                    Posted by: {ad.userId.username}
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
