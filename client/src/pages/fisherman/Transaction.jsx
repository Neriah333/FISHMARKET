import { useEffect, useState } from "react";
import API from "../../services/api";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    API.get("/transactions")
      .then((res) => {
        let data = res.data;
        // ✅ Only show my transactions if fisherman
        if (user?.role === "fisherman") {
          data = data.filter(
            (t) => t.fisherman?._id === user.id
          );
        }
        setTransactions(data);
      })
      .catch(() => alert("Failed to load transactions"));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Fisherman</th>
            <th className="px-4 py-2 border">Sale</th>
            <th className="px-4 py-2 border">Payment Amount (Ksh)</th>
            <th className="px-4 py-2 border">Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id} className="text-center">
              <td className="px-4 py-2 border">{t.fisherman?.name || "Unknown"}</td>
              <td className="px-4 py-2 border">{t.fishSale?.saleAmount || 0}</td>
              <td className="px-4 py-2 border">{t.paymentAmount}</td>
              <td className="px-4 py-2 border">
                {new Date(t.transactionDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
