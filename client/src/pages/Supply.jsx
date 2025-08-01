import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

const mockSupplies = [
  { id: 1, fisherman: "Otieno Odhiambo", quantity: 120, pricePerUnit: 300, catchDate: new Date("2025-07-01") },
  { id: 2, fisherman: "Otieno Odhiambo", quantity: 100, pricePerUnit: 280, catchDate: new Date("2025-07-04") },
  { id: 3, fisherman: "Otieno Odhiambo", quantity: 150, pricePerUnit: 320, catchDate: new Date("2025-07-06") },

  { id: 4, fisherman: "Otieno Odhiambo", quantity: 90, pricePerUnit: 310, catchDate: new Date("2025-07-09") },
  { id: 5, fisherman: "Otieno Odhiambo", quantity: 130, pricePerUnit: 300, catchDate: new Date("2025-07-11") },
  { id: 6, fisherman: "Otieno Odhiambo", quantity: 110, pricePerUnit: 290, catchDate: new Date("2025-07-14") },

  { id: 7, fisherman: "Otieno Odhiambo", quantity: 140, pricePerUnit: 310, catchDate: new Date("2025-07-17") },
  { id: 8, fisherman: "Otieno Odhiambo", quantity: 95, pricePerUnit: 285, catchDate: new Date("2025-07-20") },
  { id: 9, fisherman: "Otieno Odhiambo", quantity: 125, pricePerUnit: 300, catchDate: new Date("2025-07-22") },

  { id: 10, fisherman: "Otieno Odhiambo", quantity: 135, pricePerUnit: 315, catchDate: new Date("2025-07-25") },
  { id: 11, fisherman: "Otieno Odhiambo", quantity: 105, pricePerUnit: 295, catchDate: new Date("2025-07-27") },
  { id: 12, fisherman: "Otieno Odhiambo", quantity: 145, pricePerUnit: 325, catchDate: new Date("2025-07-30") },
];

export default function Supply() {
  const [supplies] = useState(mockSupplies);

  return (
    <div className="p-6 space-y-6 bg-gray-400">
      <h1 className="text-2xl font-bold">Fish Supply Data</h1>

      {/* Table */}
      <Card>
        <CardContent className="overflow-x-auto p-4">
          <table className="w-full border text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Fisherman</th>
                <th className="py-2 px-4 border">Quantity (kg)</th>
                <th className="py-2 px-4 border">Price/Unit (KES)</th>
                <th className="py-2 px-4 border">Catch Date</th>
              </tr>
            </thead>
            <tbody>
              {supplies.map((supply) => (
                <tr key={supply.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{supply.fisherman}</td>
                  <td className="py-2 px-4 border">{supply.quantity}</td>
                  <td className="py-2 px-4 border">{supply.pricePerUnit}</td>
                  <td className="py-2 px-4 border">{format(supply.catchDate, "PPP")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Catch Calendar</h2>
          <DayPicker
            mode="multiple"
            month={new Date("2025-07-01")}
            selected={supplies.map((s) => s.catchDate)}
            modifiersClassNames={{
              selected: "bg-green-500 text-white rounded-full",
            }}
          />
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Quantity Supplied Over July</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={supplies}>
              <XAxis dataKey="id" tickFormatter={(id) => `Day ${id}`} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
