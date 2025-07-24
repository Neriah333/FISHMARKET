import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // Capitalize if file is Footer.jsx


import Menu from "../components/Menu";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      <Menu />

      {/* Main content */}
      <main className="flex-1 px-6 py-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Welcome to Fish Market for Cooperatives
        </h1>
        <p className="text-gray-600">
          Use the menu above to manage supplies, transactions, and view sales data.
        </p>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
