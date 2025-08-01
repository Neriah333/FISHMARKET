import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

const mockTransactions = [
  { id: 1, transactionId: "T-001", transactionDate: new Date("2025-07-02"), fisherman: "Otieno Odhiambo", saleId: "S-001", paymentAmount: 36000 },
  { id: 2, transactionId: "T-002", transactionDate: new Date("2025-07-05"), fisherman: "Otieno Odhiambo", saleId: "S-002", paymentAmount: 28000 },
  { id: 3, transactionId: "T-003", transactionDate: new Date("2025-07-07"), fisherman: "Otieno Odhiambo", saleId: "S-003", paymentAmount: 48000 },
  { id: 4, transactionId: "T-004", transactionDate: new Date("2025-07-10"), fisherman: "Otieno Odhiambo", saleId: "S-004", paymentAmount: 27900 },
  { id: 5, transactionId: "T-005", transactionDate: new Date("2025-07-12"), fisherman: "Otieno Odhiambo", saleId: "S-005", paymentAmount: 39000 },
  { id: 6, transactionId: "T-006", transactionDate: new Date("2025-07-15"), fisherman: "Otieno Odhiambo", saleId: "S-006", paymentAmount: 31900 },
];

export default function Transaction() {
  const [transactions] = useState(mockTransactions);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Transactions</h1>

      {/* Table */}
      <Card>
        <CardContent className="overflow-x-auto p-4">
          <table className="w-full border text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Transaction ID</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Fisherman</th>
                <th className="py-2 px-4 border">Sale ID</th>
                <th className="py-2 px-4 border">Payment Amount (KES)</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{tx.transactionId}</td>
                  <td className="py-2 px-4 border">{format(tx.transactionDate, "PPP")}</td>
                  <td className="py-2 px-4 border">{tx.fisherman}</td>
                  <td className="py-2 px-4 border">{tx.saleId}</td>
                  <td className="py-2 px-4 border">{tx.paymentAmount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Transaction Dates</h2>
          <DayPicker
            mode="multiple"
            month={new Date("2025-07-01")}
            selected={transactions.map((t) => t.transactionDate)}
            modifiersClassNames={{
              selected: "bg-purple-500 text-white rounded-full",
            }}
          />
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Payment Amounts in July</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transactions}>
              <XAxis dataKey="transactionId" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="paymentAmount" fill="#a855f7" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
