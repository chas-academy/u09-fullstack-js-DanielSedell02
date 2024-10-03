import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ImageSlideshow from "./ImageSlideshow";
import { useAuth } from "../AuthContext";
import { useCart } from "../CartContext";

const SingleAdPage = () => {
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

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

  const handleAddToCart = () => {
    if (!user) {
      navigate("/Logga-in", { state: { from: `/ad/${id}` } });
      return;
    }
    try {
      addToCart({
        id: ad._id,
        fragranceName: ad.fragranceName,
        price: ad.price,
        imageUrl: ad.imageUrls[0],
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000); // Reset after 3 seconds
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setError("Failed to add item to cart. Please try again.");
    }
  };

  if (loading)
    return <div className="text-center mt-8 text-gray-600">Laddar...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!ad)
    return (
      <div className="text-center mt-8 text-gray-600">
        Inga annonser hittades
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {ad.fragranceName}
          </h1>
          {ad.imageUrls && ad.imageUrls.length > 0 && (
            <div className="mb-6 h-auto max-w-lg mx-auto rounded-lg overflow-hidden shadow-md">
              <ImageSlideshow images={ad.imageUrls} alt={ad.fragranceName} />
            </div>
          )}
          <div className="mb-6">
            <p className="text-2xl font-semibold text-gray-700">
              Pris: <span className="text-gray-900">{ad.price} SEK</span>
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Beskrivning
            </h2>
            <p className="text-gray-600 leading-relaxed">{ad.description}</p>
          </div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Mängd kvar:{" "}
              <span className="font-medium text-gray-800">{ad.quality}</span>
            </p>
            {ad.userId && ad.userId.username && (
              <p className="text-sm text-gray-500 mt-2">
                Publicerad av: {ad.userId.username}
              </p>
            )}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <Link
              to="/annonser"
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 px-6 py-2 rounded-full 
                         transition-all duration-300 inline-block hover:shadow-md"
            >
              Tillbaka till annonserna
            </Link>
            <button
              onClick={handleAddToCart}
              className={`${
                addedToCart ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
              } text-white px-6 py-2 rounded-full transition-all duration-300 inline-block hover:shadow-md`}
              disabled={addedToCart}
            >
              {addedToCart ? "Tillagd i kundvagnen" : "Lägg till i kundvagnen"}
            </button>
          </div>
          {addedToCart && (
            <p className="text-green-500 text-center mt-4">
              Produkten har lagts till i din kundvagn!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleAdPage;
