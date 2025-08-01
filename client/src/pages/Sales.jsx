import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

const COLORS = ["#3b82f6", "#60a5fa", "#1d4ed8"];

const mockSales = [
  { id: 1, saleId: "S-001", catchDate: new Date("2025-07-01"), saleDate: new Date("2025-07-02"), saleAmount: 36000 },
  { id: 2, saleId: "S-002", catchDate: new Date("2025-07-04"), saleDate: new Date("2025-07-05"), saleAmount: 28000 },
  { id: 3, saleId: "S-003", catchDate: new Date("2025-07-06"), saleDate: new Date("2025-07-07"), saleAmount: 48000 },
  { id: 4, saleId: "S-004", catchDate: new Date("2025-07-09"), saleDate: new Date("2025-07-10"), saleAmount: 27900 },
  { id: 5, saleId: "S-005", catchDate: new Date("2025-07-11"), saleDate: new Date("2025-07-12"), saleAmount: 39000 },
  { id: 6, saleId: "S-006", catchDate: new Date("2025-07-14"), saleDate: new Date("2025-07-15"), saleAmount: 31900 },
];

export default function Sales() {
  const [sales] = useState(mockSales);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Fish Sales</h1>

      {/* Table */}
      <Card>
        <CardContent className="overflow-x-auto p-4">
          <table className="w-full border text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Sale ID</th>
                <th className="py-2 px-4 border">Catch Date</th>
                <th className="py-2 px-4 border">Sale Date</th>
                <th className="py-2 px-4 border">Sale Amount (KES)</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{sale.saleId}</td>
                  <td className="py-2 px-4 border">{format(sale.catchDate, "PPP")}</td>
                  <td className="py-2 px-4 border">{format(sale.saleDate, "PPP")}</td>
                  <td className="py-2 px-4 border">{sale.saleAmount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Sale Dates</h2>
          <DayPicker
            mode="multiple"
            month={new Date("2025-07-01")}
            selected={sales.map((s) => s.saleDate)}
            modifiersClassNames={{
              selected: "bg-blue-500 text-white rounded-full",
            }}
          />
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Sales Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sales}
                dataKey="saleAmount"
                nameKey="saleId"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {sales.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
