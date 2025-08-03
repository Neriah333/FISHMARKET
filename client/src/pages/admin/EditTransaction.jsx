import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";

export default function TransactionEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentAmount, setPaymentAmount] = useState("");

  // Fetch transaction by ID
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await API.get(`/transactions/${id}`);
        setTransaction(res.data);
        setPaymentAmount(res.data.paymentAmount);
      } catch (err) {
        console.error("Failed to load transaction:", err.response || err.message);
        alert("Failed to load transaction");
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/transactions/${id}`, {
        paymentAmount: Number(paymentAmount),
      });
      alert("Transaction updated successfully!");
      navigate("/admin/transactions"); // redirect to list
    } catch (err) {
      console.error("Failed to update transaction:", err.response || err.message);
      alert("Update failed");
    }
  };

  if (loading) return <p className="text-center p-6">Loading transaction...</p>;
  if (!transaction) return <p className="text-center p-6">Transaction not found</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <h1 className="text-xl font-bold mb-4">Update Transaction</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Fisherman</label>
          <input
            type="text"
            value={transaction.fisherman?.name || "Unknown"}
            disabled
            className="border w-full px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sale Amount</label>
          <input
            type="text"
            value={transaction.fishSale?.saleAmount || 0}
            disabled
            className="border w-full px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Payment Amount</label>
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            className="border w-full px-3 py-2 rounded"
            required
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate("/admin/transactions")}
            className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
