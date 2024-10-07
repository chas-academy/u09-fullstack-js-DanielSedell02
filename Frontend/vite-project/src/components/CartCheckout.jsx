import React from "react";
import { useCart } from "../CartContext";
import { Link } from "react-router-dom";
import { API_URL } from "../config/api";

const CartCheckout = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleImageError = (e, item) => {
    console.error(`Failed to load image for ${item.fragranceName}:`, e);
    e.target.style.display = "none";
    e.target.nextSibling.style.display = "flex";
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto mt-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Din kundvagn är tom</h2>
        <Link to="/annonser" className="text-blue-500 hover:underline">
          Fortsätt shoppa
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Din kundvagn</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-3/4">
          {cart.map((item) => {
            console.log(`Image URL for ${item.fragranceName}:`, item.imageUrl);
            return (
              <div
                key={item.id}
                className="flex items-center mb-4 bg-white p-4 rounded-lg shadow"
              >
                <div className="w-20 h-20 mr-4 relative">
                  <img
                    src={`${API_URL.item.imageUrl}`}
                    alt={item.fragranceName}
                    className="w-20 h-20 object-cover mr-4"
                    onError={(e) => handleImageError(e, item)}
                  />
                  <div className="absolute inset-0 bg-gray-200 items-center justify-center text-gray-500 text-xs hidden">
                    Bild inte tillgänglig
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.fragranceName}</h3>
                  <p className="text-gray-600">{item.price} SEK</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-500"
                  >
                    Ta bort
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="md:w-1/4 bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Sammanfattning</h3>
          <p className="flex justify-between mb-2">
            <span>Delsumma:</span>
            <span>{total} SEK</span>
          </p>
          <p className="flex justify-between mb-4">
            <span>Frakt:</span>
            <span>0 SEK</span>
          </p>
          <p className="flex justify-between font-bold">
            <span>Totalt:</span>
            <span>{total} SEK</span>
          </p>
          <button className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600 transition-colors">
            Gå till kassan
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCheckout;
