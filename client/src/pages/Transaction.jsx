import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const mockTransactions = [
  { id: 1, description: "Sold Tilapia", date: "2025-07-26", amount: 1200 },
  { id: 2, description: "Sold Catfish", date: "2025-07-26", amount: 750 },
  { id: 3, description: "Sold Nile Perch", date: "2025-07-25", amount: 3000 },
  { id: 4, description: "Bought Ice", date: "2025-07-24", amount: -500 },
];

export default function Transaction() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formatted = format(selectedDate, "yyyy-MM-dd");

  const filtered = mockTransactions.filter(
    (txn) => txn.date === formatted
  );

  const total = filtered.reduce((sum, txn) => sum + txn.amount, 0);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-blue-600">Transactions</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Calendar Filter */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Select a Date</h2>
          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
        </div>

        {/* Transaction List */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Records for {formatted}</h2>
          <ul className="space-y-2">
            {filtered.length > 0 ? (
              filtered.map((txn) => (
                <li
                  key={txn.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <span>{txn.description}</span>
                  <span
                    className={`font-semibold ${
                      txn.amount < 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {txn.amount < 0 ? "-" : "+"} KES {Math.abs(txn.amount)}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No records found for this date.</p>
            )}
          </ul>

          {/* Total Amount */}
          <div className="mt-4 p-4 rounded bg-gray-100 text-lg font-semibold">
            Total:{" "}
            <span className={total < 0 ? "text-red-600" : "text-green-600"}>
              KES {total}
            </span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Sales Chart</h2>
        {filtered.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filtered}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="description" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No data available to display the chart.</p>
        )}
      </div>
    </div>
  );
}
