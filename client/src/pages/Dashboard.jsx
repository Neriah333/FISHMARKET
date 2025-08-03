import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Menu from "../components/Side";
import Footer from "../components/Footer";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalFishTraded: 0,
    avgMarketPrice: 0,
    mostTradedSpecies: "Loading...",
    peakTradingTime: "Loading...",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "fisherman") {
      navigate("/login", { replace: true });
      return;
    }

    // Load user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (!storedUser._id) {
      console.warn("No user ID found, dashboard may show empty data.");
    }

    setUser(storedUser);
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    if (!user || !user._id) return; // Wait until user is ready

    const fetchStats = async () => {
      try {
        // Fetch supplies and sales
        const [suppliesRes, salesRes] = await Promise.all([
          API.get("/supplies"),
          API.get("/sales"),
        ]);

        // Filter only this fisherman's data
        const mySupplies = suppliesRes.data.filter(
          (s) => s.fisherman?._id === user._id
        );

        const mySales = salesRes.data.filter(
          (s) => s.fishSupply?.fisherman?._id === user._id
        );

        setStats({
          totalFishTraded: mySupplies.reduce((sum, s) => sum + (s.quantity || 0), 0),
          avgMarketPrice:
            mySales.length > 0
              ? (
                  mySales.reduce((sum, s) => sum + (s.saleAmount || 0), 0) / mySales.length
                ).toFixed(2)
              : 0,
          mostTradedSpecies: "Nile Perch", // Example placeholder
          peakTradingTime: "6:00 AM – 10:00 AM", // Example placeholder
        });
      } catch (err) {
        console.error("Error fetching fisherman stats:", err);
      }
    };

    fetchStats();
  }, [user]);

  if (loading) return <p className="p-6 text-center">Loading dashboard...</p>;

  return (
    <div className="flex min-h-screen bg-gray-300">
      <Menu />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-4 ml-4 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
            Welcome {user.name || "Fisherman"}
          </h1>

          <h2 className="text-2xl font-bold mt-2 mb-2">Overview</h2>

          <div className="grid grid-cols-4 gap-6 mb-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Fish Traded</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-teal-600">
                  {stats.totalFishTraded.toLocaleString()} kg
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Market Price</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-teal-600">
                  KES {stats.avgMarketPrice}/kg
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Most Traded Species</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-teal-600">
                  {stats.mostTradedSpecies}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Peak Trading Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-teal-600">
                  {stats.peakTradingTime}
                </p>
              </CardContent>
            </Card>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}
