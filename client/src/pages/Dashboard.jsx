import { useEffect, useState } from "react";
import API from "@/services/api";
import Sidebar from "@/components/Side"; // Update path/name as needed
import { Card, CardContent } from "@/components/ui/card";

export default function FishermanDashboard() {
  const [counts, setCounts] = useState({
    supplies: 0,
    sales: 0,
    transactions: 0,
  });
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Decode JWT to get user info
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUsername(payload.fullname || payload.name || "Fisherman");
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }

    const fetchCounts = async () => {
      try {
        const [suppliesRes, salesRes, transactionsRes] = await Promise.all([
          API.get("/supplies/me"),
          API.get("/sales/me"),
          API.get("/transactions/me"),
        ]);

        setCounts({
          supplies: suppliesRes.data.length,
          sales: salesRes.data.length,
          transactions: transactionsRes.data.length,
        });
      } catch (error) {
        console.error("Error loading fisherman dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
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
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Welcome, {username} 🎣
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Here’s an overview of your fish activity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-white shadow hover:shadow-lg transition">
            <CardContent className="p-4 text-center">
              <p className="text-gray-500">My Supplies</p>
              <h2 className="text-4xl font-bold text-blue-600">
                {counts.supplies}
              </h2>
            </CardContent>
          </Card>

          <Card className="bg-white shadow hover:shadow-lg transition">
            <CardContent className="p-4 text-center">
              <p className="text-gray-500">My Sales</p>
              <h2 className="text-4xl font-bold text-green-600">
                {counts.sales}
              </h2>
            </CardContent>
          </Card>

          <Card className="bg-white shadow hover:shadow-lg transition">
            <CardContent className="p-4 text-center">
              <p className="text-gray-500">My Transactions</p>
              <h2 className="text-4xl font-bold text-purple-600">
                {counts.transactions}
              </h2>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
