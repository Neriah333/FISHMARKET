import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err.response || err.message);
      alert("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;
    try {
      await API.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert("Failed to delete transaction");
    }
  };

  if (loading) return <p className="text-center p-6">Loading transactions...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Link
          to="/admin/transactions/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Transaction
        </Link>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Fisherman</th>
            <th className="px-4 py-2 border">Sale Amount</th>
            <th className="px-4 py-2 border">Payment Amount</th>
            <th className="px-4 py-2 border">Transaction Date</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id} className="text-center">
              <td className="px-4 py-2 border">{tx.fisherman?.name || "Unknown"}</td>
              <td className="px-4 py-2 border">{tx.fishSale?.saleAmount || 0}</td>
              <td className="px-4 py-2 border">{tx.paymentAmount}</td>
              <td className="px-4 py-2 border">
                {new Date(tx.transactionDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border space-x-2">
                <Link
                  to={`/admin/transactions/update/${tx._id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(tx._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {transactions.length === 0 && (
        <p className="text-center text-gray-600 mt-4">No transactions available.</p>
      )}
    </div>
  );
}
