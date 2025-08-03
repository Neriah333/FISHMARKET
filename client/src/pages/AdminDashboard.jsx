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

        // ✅ Only show counts
        setCounts({
          fishermen: fishermen.length,
          supply: supplies.length,
          sales: sales.length,
          transactions: transactions.length,
        });

        // ✅ Prepare top 3 performing fishermen by sales
        const salesByFisherman = {};
        sales.forEach((s) => {
          const name = s.fishSupply?.fisherman?.name || "Unknown";
          salesByFisherman[name] = (salesByFisherman[name] || 0) + s.saleAmount;
        });

        const topPerformers = Object.entries(salesByFisherman)
          .map(([name, sales]) => ({ name, sales }))
          .sort((a, b) => b.sales - a.sales)
          .slice(0, 3);

        setPerformanceData(topPerformers);

        // ✅ Set recent 3 activities
        const recentActivities = [
          ...supplies.map((s) => ({
            name: s.fisherman?.name || "Unknown",
            action: `Supplied ${s.quantity}Kg`,
            time: new Date(s.catchDate || s.createdAt).toLocaleDateString(),
          })),
          ...sales.map((s) => ({
            name: s.fishSupply?.fisherman?.name || "Unknown",
            action: `Sold fish worth KES ${s.saleAmount}`,
            time: new Date(s.saleDate).toLocaleDateString(),
          })),
          ...transactions.map((t) => ({
            name: t.fisherman?.name || "Unknown",
            action: `Transaction of KES ${t.paymentAmount}`,
            time: new Date(t.transactionDate).toLocaleDateString(),
          })),
        ]
          .sort((a, b) => new Date(b.time) - new Date(a.time))
          .slice(0, 3);

        setActivities(recentActivities);
      } catch (err) {
        console.error("Dashboard fetch failed:", err);
      }
    };

    fetchDashboardData();
  }, []);

  const dashboardCards = [
    { title: "Fishermen", value: counts.fishermen, link: "/admin/fishermen" },
    { title: "Supplies", value: counts.supply, link: "/admin/supply" },
    { title: "Sales", value: counts.sales, link: "/admin/sales" },
    { title: "Transactions", value: counts.transactions, link: "/admin/transactions" },
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
