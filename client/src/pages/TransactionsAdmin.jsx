import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    transactionDate: "2025-07-20",
  },
  {
    id: 2,
    fisherman: "Wanjiku Njeri",
    sale: "Sale B",
    paymentAmount: 20000,
    transactionDate: "2025-07-22",
  },
  {
    id: 3,
    fisherman: "Kamau Mwangi",
    sale: "Sale C",
    paymentAmount: 28000,
    transactionDate: "2025-07-24",
  },
];

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  // Load from localStorage or fallback to initial
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("transactions")) || initialTransactions;
    setTransactions(stored);
    localStorage.setItem("transactions", JSON.stringify(stored));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      const updated = transactions.filter((tx) => tx.id !== id);
      setTransactions(updated);
      localStorage.setItem("transactions", JSON.stringify(updated));
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/transactions/update/${id}`);
  };

  return (
    <div className="p-6 bg-gray-300">
      {/* Header with Add Transaction button */}
      <div className="flex justify-between items-center mb-6 w-full">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Button
          onClick={() => navigate("/admin/transactions/add")}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          + Add Transaction
        </Button>
      </div>

      {/* Transaction Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {transactions.map((tx) => (
          <Card key={tx.id} className="p-4 shadow-md">
            <h2 className="text-lg font-semibold">{tx.fisherman}</h2>
            <p>
              <span className="font-medium">Sale Ref:</span> {tx.sale}
            </p>
            <p>
              <span className="font-medium">Amount Paid:</span> Ksh {tx.paymentAmount.toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Date:</span>{" "}
              {format(new Date(tx.transactionDate), "PPP")}
            </p>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" onClick={() => handleUpdate(tx.id)}>
                Update
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(tx.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}

        {transactions.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No transactions yet. Click “Add Transaction” to create one.
          </p>
        )}
      </div>

      {/* Payment Chart */}
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
