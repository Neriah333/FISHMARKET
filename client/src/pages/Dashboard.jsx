import { useEffect, useState } from "react";
import Sidebar from "@/components/Side"; 
import Navigation from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function FishermanDashboard() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    supplies: 5,          // Mock: 12 fish batches supplied
    sales: 4,              // Mock: 8 sales completed
    transactions: 1,       // Mock: 5 payments received
    totalEarnings: 42500,  // Mock: KES 32,500
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUsername(payload.fullname || payload.name || "Fisherman");
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-6 overflow-auto">
        <Navigation className="mb-4" />
        <h1 className="text-3xl font-bold mt-6 mb-2 text-gray-900 dark:text-white text-center">
          Welcome, {username} 🎣
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-center">
          Here’s a quick overview of your fishing activity and resources.
        </p>

        {/* ===== Top Row: Fisherman Stats (Mock Data) ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-10 max-w-5xl mx-auto">
          {/* Supplies */}
          <Card className="bg-white shadow hover:shadow-lg transition">
            <CardContent className="p-4 text-center">
              <p className="text-gray-500">My Supplies</p>
              <h2 className="text-4xl font-bold text-blue-600">
                {stats.supplies}
              </h2>
              <p className="text-sm text-gray-400">Fish batches supplied</p>
            </CardContent>
          </Card>

          {/* Sales */}
          <Card className="bg-white shadow hover:shadow-lg transition">
            <CardContent className="p-4 text-center">
              <p className="text-gray-500">My Sales</p>
              <h2 className="text-4xl font-bold text-green-600">
                {stats.sales}
              </h2>
              <p className="text-sm text-gray-400">Successful market sales</p>
            </CardContent>
          </Card>

          {/* Transactions */}
          <Card className="bg-white shadow hover:shadow-lg transition">
            <CardContent className="p-4 text-center">
              <p className="text-gray-500">Transactions</p>
              <h2 className="text-4xl font-bold text-purple-600">
                {stats.transactions}
              </h2>
              <p className="text-sm text-gray-400">Payments received</p>
            </CardContent>
          </Card>

          {/* Earnings */}
          <Card className="bg-white shadow hover:shadow-lg transition">
            <CardContent className="p-4 text-center">
              <p className="text-gray-500">Total Earnings</p>
              <h2 className="text-4xl font-bold text-yellow-600">
                KES {stats.totalEarnings.toLocaleString()}
              </h2>
              <p className="text-sm text-gray-400">From all transactions</p>
            </CardContent>
          </Card>
        </div>

        {/* ===== Bottom Row: Resource Links ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-6">
          {/* Fishermen Trainings */}
          <Card className="bg-white shadow hover:shadow-lg transition">
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-bold mb-2 text-blue-600">🎓 Fishermen Trainings</h2>
              <p className="text-gray-500 mb-4">
                Learn modern fishing techniques and cooperative skills.
              </p>
              <Link
                to="/trainings"
                className="text-blue-500 hover:underline font-semibold"
              >
                View Trainings →
              </Link>
            </CardContent>
          </Card>

          {/* General Fishing Info */}
          <Card className="bg-white shadow hover:shadow-lg transition">
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-bold mb-2 text-green-600">📘 Fishing Information</h2>
              <p className="text-gray-500 mb-4">
                Get tips on best fishing practices and safety guidelines.
              </p>
              <Link
                to="/fishing-info"
                className="text-green-500 hover:underline font-semibold"
              >
                Learn More →
              </Link>
            </CardContent>
          </Card>

          {/* Fun Facts About Fishing */}
          <Card className="bg-white shadow hover:shadow-lg transition">
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-bold mb-2 text-purple-600">🎣 Fun Fishing Facts</h2>
              <p className="text-gray-500 mb-4">
                Discover interesting facts and records about fishing worldwide.
              </p>
              <Link
                to="/fishing-facts"
                className="text-purple-500 hover:underline font-semibold"
              >
                Read Facts →
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
