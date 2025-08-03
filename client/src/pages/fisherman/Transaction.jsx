import { useEffect, useState } from "react";
import API from "../../services/api";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const role = localStorage.getItem("role");
        const endpoint = role === "fisherman" ? "/transactions/me" : "/transactions";

        const res = await API.get(endpoint);
        setTransactions(res.data || []);
      } catch (err) {
        alert("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [user?.role]);

  if (loading) {
    return (
      <div className="p-6 text-gray-500 text-lg text-center">
        Loading transactions...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center">No transactions found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Fisherman</th>
              <th className="px-4 py-2 border">Sale Amount (Ksh)</th>
              <th className="px-4 py-2 border">Payment Amount (Ksh)</th>
              <th className="px-4 py-2 border">Transaction Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t._id} className="text-center">
                <td className="px-4 py-2 border">
                  {t.fisherman?.name || "Unknown"}
                </td>
                <td className="px-4 py-2 border">
                  {t.fishSale?.saleAmount || 0}
                </td>
                <td className="px-4 py-2 border">{t.paymentAmount}</td>
                <td className="px-4 py-2 border">
                  {t.transactionDate
                    ? new Date(t.transactionDate).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
