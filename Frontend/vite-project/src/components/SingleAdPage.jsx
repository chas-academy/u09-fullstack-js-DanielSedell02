import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageSlideshow from "./ImageSlideshow";

const SingleAdPage = () => {
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/ads/${id}`);
        setAd(response.data);
      } catch (err) {
        console.error("Error fetching ad:", err);
        setError("Failed to fetch ad details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [id]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!ad) return <div className="text-center mt-8">Ad not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4 ">{ad.fragranceName}</h1>
      {ad.imageUrls && ad.imageUrls.length > 0 && (
        <div className="mb-6 h-auto max-w-lg mx-auto ">
          <ImageSlideshow images={ad.imageUrls} alt={ad.fragranceName} />
        </div>
      )}
      <p className="text-xl font-semibold mb-5 text-center">
        Price: {ad.price} SEK
      </p>
      <p className="text-gray-700 mb-6 text-wrap">{ad.description}</p>
      <p className="text-gray-600 mb-2">Quality: {ad.quality}</p>
      {ad.userId && ad.userId.username && (
        <p className="text-gray-600">Posted by: {ad.userId.username}</p>
      )}
    </div>
  );
};

export default SingleAdPage;
