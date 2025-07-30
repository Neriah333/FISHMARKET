import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Side from "@/components/SideAdmin";

const fishermen = [
  { name: "James Otieno", address: "Kisumu", contact: "0712345678" },
  { name: "Mary Atieno", address: "Homa Bay", contact: "0723456789" },
  { name: "John Okoth", address: "Mbita", contact: "0701122334" },
  { name: "Alice Achieng", address: "Bondo", contact: "0799988776" },
  { name: "Peter Onyango", address: "Siaya", contact: "0733445566" },
  { name: "Faith Akoth", address: "Kendu Bay", contact: "0755566778" },
  { name: "Brian Odhiambo", address: "Asembo", contact: "0711223344" },
  { name: "Diana Nyanchama", address: "Karachuonyo", contact: "0744556677" },
  { name: "Samuel Ouma", address: "Rusinga", contact: "0722113344" },
  { name: "Millicent Owino", address: "Luanda Kotieno", contact: "0766778899" },
];

const performanceData = [
  { name: "Otieno", sales: 40000 },
  { name: "Atieno", sales: 52000 },
  { name: "Okoth", sales: 31000 },
];

const activities = [
  { name: "James Otieno", action: "Sale", time: "Today 9:30 AM" },
  { name: "Mary Atieno", action: "Supply", time: "Yesterday 3:00 PM" },
  { name: "John Okoth", action: "Transaction", time: "Today 8:00 AM" },
];

export default function AdminDashboard() {
  return (
    <div className="flex h-screen">
      <Side links={["Dashboard", "Fishermen", "Supply", "Sales", "Transactions"]} />

      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-500 mb-6">Welcome back! Here's what's happening.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card><CardContent><p>Total Fishermen</p><h2 className="text-xl font-bold">10</h2></CardContent></Card>
          <Card><CardContent><p>Total Supply</p><h2 className="text-xl font-bold">KES 245,000</h2></CardContent></Card>
          <Card><CardContent><p>Total Sales</p><h2 className="text-xl font-bold">KES 312,000</h2></CardContent></Card>
          <Card><CardContent><p>Pending Transactions</p><h2 className="text-xl font-bold">KES 45,000</h2></CardContent></Card>
        </div>

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
