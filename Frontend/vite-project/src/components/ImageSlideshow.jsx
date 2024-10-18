import React, { useState, useEffect } from "react";
import { API_URL } from "../config/api";

const ImageSlideshow = ({ images, alt }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const preloadNextImage = (index) => {
    const nextIndex = index === images.length - 1 ? 0 : index + 1;
    const img = new Image();
    img.src = `${API_URL}${images[nextIndex]}`;
  };

  useEffect(() => {
    if (images.length > 1) {
      preloadNextImage(currentImageIndex);
    }
  }, [currentImageIndex, images]);

  return (
    <div className="relative">
      <img
        src={`${API_URL}${images[currentImageIndex]}`}
        alt={`${alt} - Image ${currentImageIndex + 1}`}
        loading="lazy"
        className="w-full h-56 object-cover rounded-t-lg"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r"
            aria-label="Previous Image"
          >
            &lt;
          </button>

          <button
            onClick={nextImage}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l"
            aria-label="Next Image"
          >
            &gt;
          </button>

          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSlideshow;
