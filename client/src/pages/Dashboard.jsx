import { useState, useEffect } from "react";
import API from "../services/api"; // Axios instance
import Navbar from "../components/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Menu from "../components/Side";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalFishTraded: 0,
    avgMarketPrice: 0,
    mostTradedSpecies: "Loading...",
    peakTradingTime: "Loading...",
  });

  // Fetch stats from API or mock data
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/dashboard/stats"); // Your backend endpoint
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);

        // Fallback to mock data
        setStats({
          totalFishTraded: 18920,
          avgMarketPrice: 410,
          mostTradedSpecies: "Nile Perch",
          peakTradingTime: "6:00 AM – 10:00 AM",
        });
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-300">
      {/* Sidebar */}
      <Menu />

      {/* Right side */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-4 ml-4 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
            Welcome to Fish Market for Cooperatives
          </h1>

          <h2 className="text-2xl font-bold mt-2 mb-2">Overview</h2>

          {/* Key Statistics Section */}
          <div className="grid grid-cols-4 gap-6 mb-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Fish Traded</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-teal-600">{stats.totalFishTraded.toLocaleString()} kg</p>
                <p className="text-sm text-gray-500">Tracked over the past 12 months</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Market Price</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-teal-600">KES {stats.avgMarketPrice}/kg</p>
                <p className="text-sm text-gray-500">Across all fish types</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Most Traded Species</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-teal-600">{stats.mostTradedSpecies}</p>
                <p className="text-sm text-gray-500">Represents highest volume</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Peak Trading Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-teal-600">{stats.peakTradingTime}</p>
                <p className="text-sm text-gray-500">Based on transaction patterns</p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mb-4">Explore other fishermen's work</h2>
          <Card className="w-full h-50">
            <CardContent>
              <p className="text-gray-600">Coming soon: Cooperative blog & market insights.</p>
            </CardContent>
          </Card>
          <Footer />
        </main>
      </div>
    </div>
  );
}
