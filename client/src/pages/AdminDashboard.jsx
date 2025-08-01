import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Side from "@/components/SideAdmin";
import { useNavigate } from "react-router-dom";

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
    // Fetch from localStorage
    const fishermen = JSON.parse(localStorage.getItem("fishermen")) || [];
    const supplies = JSON.parse(localStorage.getItem("supplies")) || [];
    const sales = JSON.parse(localStorage.getItem("sales")) || [];
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    // Calculate totals
    const totalSupply = supplies.reduce(
      (sum, s) => sum + (s.totalAmount || s.quantity * (s.pricePerUnit || 0)),
      0
    );
    const totalSales = sales.reduce((sum, s) => sum + (s.saleAmount || 0), 0);
    const pendingTransactions = transactions.reduce(
      (sum, t) => sum + (t.paymentAmount || 0),
      0
    );

    setCounts({
      fishermen: fishermen.length || 10,
      supply: totalSupply || 245000,
      sales: totalSales || 312000,
      transactions: pendingTransactions || 45000,
    });

    // Performance data: top 3 fishermen by sales
    const topFishermen = sales.reduce((acc, s) => {
      const name = s?.fishSupply?.fisherman?.fullName || s.fisherman || "Unknown";
      acc[name] = (acc[name] || 0) + (s.saleAmount || 0);
      return acc;
    }, {});

    const top3 = Object.entries(topFishermen)
      .map(([name, sales]) => ({ name, sales }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 3);

    setPerformanceData(
      top3.length > 0
        ? top3
        : [
            { name: "Otieno", sales: 40000 },
            { name: "Atieno", sales: 52000 },
            { name: "Okoth", sales: 31000 },
          ]
    );

    // Recent activities
    const recentActivities = [
      ...sales.slice(-2).map((s) => ({
        name: s?.fishSupply?.fisherman?.fullName || s.fisherman || "Unknown",
        action: "Sale",
        time: new Date(s.saleDate || new Date()).toLocaleString(),
      })),
      ...supplies.slice(-2).map((s) => ({
        name: s.fisherman || "Unknown",
        action: "Supply",
        time: new Date(s.catchDate || new Date()).toLocaleString(),
      })),
      ...transactions.slice(-1).map((t) => ({
        name: t.fisherman || "Unknown",
        action: "Transaction",
        time: new Date(t.transactionDate || new Date()).toLocaleString(),
      })),
    ].slice(-5);

    setActivities(
      recentActivities.length > 0
        ? recentActivities
        : [
            { name: "James Otieno", action: "Sale", time: "Today 9:30 AM" },
            { name: "Mary Atieno", action: "Supply", time: "Yesterday 3:00 PM" },
            { name: "John Okoth", action: "Transaction", time: "Today 8:00 AM" },
          ]
    );
  }, []);

  // Dashboard cards with routes
  const dashboardCards = [
    { title: "Fishermen", value: counts.fishermen, link: "/admin/fishermen" },
    { title: "Total Supply", value: `KES ${counts.supply.toLocaleString()}`, link: "/admin/supply" },
    { title: "Total Sales", value: `KES ${counts.sales.toLocaleString()}`, link: "/admin/sales" },
    { title: "Pending Transactions", value: `KES ${counts.transactions.toLocaleString()}`, link: "/admin/transactions" },
  ];

  return (
    <div className="flex h-screen bg-gray-300">
      <Side links={["Dashboard", "Fishermen", "Supply", "Sales", "Transactions"]} />

      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-500 mb-6">Welcome back! Here's what's happening.</p>

        {/* Overview Cards - Clickable */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {dashboardCards.map((card, idx) => (
            <Card
              key={idx}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(card.link)}
            >
              <CardContent className="p-4">
                <p>{card.title}</p>
                <h2 className="text-xl font-bold">{card.value}</h2>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart & Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Top Performing Fishermen</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={performanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
              <ul className="space-y-3">
                {activities.map((activity, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{activity.name} - {activity.action}</span>
                    <span className="text-sm text-gray-400">{activity.time}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
