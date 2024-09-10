import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddAd from "./pages/AddAd";
import ViewAds from "./pages/ViewAds";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-ad" element={<AddAd />} />
            <Route path="/view-ads" element={<ViewAds />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/About" element={<About />} />
          </Routes>
        </main>
        <footer className="bg-gray-100 text-center py-4 mt-8">
          <p>&copy; 2024 Second Hand Perfume Store. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
