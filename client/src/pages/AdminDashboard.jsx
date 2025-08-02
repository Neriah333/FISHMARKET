import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Side from "@/components/SideAdmin";
import { useNavigate } from "react-router-dom";
import API from "@/services/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    fishermen: 0,
    supply: 0,
    sales: 0,
    transactions: 0,
  });
  const [performanceData, setPerformanceData] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const [fishermenRes, suppliesRes, salesRes, transactionsRes] = await Promise.all([
        API.get("/fishermen"),
        API.get("/supplies"),
        API.get("/sales"),
        API.get("/transactions"),
      ]);

      const fishermen = fishermenRes.data || [];
      const supplies = suppliesRes.data || [];
      const sales = salesRes.data || [];
      const transactions = transactionsRes.data || [];

      // ✅ calculate totals dynamically
      const totalSupplyValue = supplies.reduce(
        (sum, s) => sum + (s.quantity || 0) * (s.pricePerUnit || 0),
        0
      );
      const totalSalesValue = sales.reduce((sum, s) => sum + (s.saleAmount || 0), 0);
      const totalTransactionValue = transactions.reduce(
        (sum, t) => sum + (t.paymentAmount || 0),
        0
      );

      setCounts({
        fishermen: fishermen.length,
        supply: totalSupplyValue,
        sales: totalSalesValue,
        transactions: totalTransactionValue,
      });

    } catch (err) {
      console.error("Dashboard fetch failed:", err);
    }
  };

  fetchDashboardData();
}, []);

  // --- Dashboard Cards ---
  const dashboardCards = [
    { title: "Fishermen", value: counts.fishermen, link: "/admin/fishermen" },
    { title: "Total Supply", value: `KES ${counts.supply.toLocaleString()}`, link: "/admin/supply" },
    { title: "Total Sales", value: `KES ${counts.sales.toLocaleString()}`, link: "/admin/sales" },
    {
      title: "Total Transactions",
      value: `KES ${counts.transactions.toLocaleString()}`,
      link: "/admin/transactions",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Side />

      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-500 mb-6">Overview of the cooperative's activities</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {dashboardCards.map((card, idx) => (
            <Card
              key={idx}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(card.link)}
            >
              <CardContent className="p-4">
                <p className="text-gray-500">{card.title}</p>
                <h2 className="text-xl font-bold">{card.value}</h2>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart & Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Top Performing Fishermen</h3>
              {performanceData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={performanceData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-400">No sales data available</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
              <ul className="space-y-3">
                {activities.length > 0 ? (
                  activities.map((activity, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between border-b pb-1 text-sm text-gray-700"
                    >
                      <span>{activity.name} - {activity.action}</span>
                      <span className="text-gray-400">{activity.time}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-400">No recent activities</p>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
