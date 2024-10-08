import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { API_URL } from "../config/api";

const AddAdForm = () => {
  const [fragranceName, setFragranceName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quality, setQuality] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleImageChange = (e) => {
    if (e.target.files.length + images.length > 3) {
      alert("Du kan max ladda upp 3 bilder.");
      return;
    }
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("Du måste vara inloggad för att posta en annons");
      return;
    }

    if (images.length === 0) {
      setError("Ladda upp minst en bild");
      return;
    }

    const formData = new FormData();
    formData.append("fragranceName", fragranceName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("quality", quality);
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post(`${API_URL}/api/ads`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Din annons blev publicerad:", response.data);
      navigate("/annonser"); // Redirect to the ads page after posting
    } catch (error) {
      setError(
        error.response?.data?.message || "Kunde inte publicera din annons"
      );
    }
  };

  if (!user) {
    return <p>Du måste vara inloggad för att posta en annons!</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Publicera en ny annons</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fragranceName" className="block mb-1">
            Parfymens namn
          </label>
          <input
            type="text"
            id="fragranceName"
            value={fragranceName}
            onChange={(e) => setFragranceName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="price" className="block mb-1">
            Pris (SEK)
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="images" className="block mb-1">
            Bilder (Max 3)
          </label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          <div className="mt-2 flex space-x-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="h-20 w-20 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            Beskrivning
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="quality" className="block mb-1">
            Mängd kvar (ml)
          </label>
          <input
            type="number"
            id="quality"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            required
            min="0"
            max="100"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Ange mängd i ml"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
        >
          Posta annons
        </button>
      </form>
    </div>
  );
};

export default AddAdForm;
