import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

const initialTransactions = [
  {
    id: 1,
    fisherman: "Otieno Odhiambo",
    sale: "Sale A",
    paymentAmount: 25000,
    transactionDate: new Date("2025-07-20"),
  },
  {
    id: 2,
    fisherman: "Wanjiku Njeri",
    sale: "Sale B",
    paymentAmount: 20000,
    transactionDate: new Date("2025-07-22"),
  },
  {
    id: 3,
    fisherman: "Kamau Mwangi",
    sale: "Sale C",
    paymentAmount: 28000,
    transactionDate: new Date("2025-07-24"),
  },
];

export default function Transaction() {
  const [transactions, setTransactions] = useState(initialTransactions);

  const handleDelete = (id) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {transactions.map((tx) => (
          <Card key={tx.id} className="p-4">
            <h2 className="text-lg font-semibold">{tx.fisherman}</h2>
            <p>
              <span className="font-medium">Sale Ref:</span> {tx.sale}
            </p>
            <p>
              <span className="font-medium">Amount Paid:</span> Ksh {tx.paymentAmount.toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Date:</span> {format(new Date(tx.transactionDate), "PPP")}
            </p>
            <div className="flex gap-2 mt-3">
              <Button variant="outline">Update</Button>
              <Button variant="destructive" onClick={() => handleDelete(tx.id)}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Payment Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={transactions}>
          <XAxis dataKey="fisherman" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="paymentAmount" fill="#4ade80" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
