import { useEffect, useState } from "react";
import API from "../../services/api";

export default function SalesList() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingSale, setEditingSale] = useState(null); // store sale being edited
  const [updatedAmount, setUpdatedAmount] = useState("");

  // Fetch all sales
  const fetchSales = async () => {
    try {
      const res = await API.get("/sales");
      setSales(res.data);
    } catch (err) {
      console.error("Error fetching sales:", err.response || err.message);
      alert("Failed to load sales");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sale?")) return;
    try {
      await API.delete(`/sales/${id}`);
      setSales((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error deleting sale:", err.response || err.message);
      alert("Failed to delete sale");
    }
  };

  const handleEdit = (sale) => {
    setEditingSale(sale);
    setUpdatedAmount(sale.saleAmount);
  };

  const handleUpdate = async () => {
    if (!editingSale) return;

    try {
      const res = await API.put(`/sales/${editingSale._id}`, {
        saleAmount: updatedAmount,
      });

      // Update the table with new data
      setSales((prev) =>
        prev.map((s) => (s._id === editingSale._id ? res.data : s))
      );

      // Close modal
      setEditingSale(null);
      setUpdatedAmount("");
    } catch (err) {
      console.error("Error updating sale:", err.response || err.message);
      alert("Failed to update sale");
    }
  };

  if (loading) return <p className="text-center p-6">Loading sales...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Fish Sales</h1>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Fisherman</th>
            <th className="px-4 py-2 border">Quantity (Kg)</th>
            <th className="px-4 py-2 border">Sale Amount (Ksh)</th>
            <th className="px-4 py-2 border">Sale Date</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id} className="text-center">
              <td className="px-4 py-2 border">
                {sale.fishSupply?.fisherman?.name || "Unknown"}
              </td>
              <td className="px-4 py-2 border">
                {sale.fishSupply?.quantity || 0}
              </td>
              <td className="px-4 py-2 border">{sale.saleAmount}</td>
              <td className="px-4 py-2 border">
                {new Date(sale.saleDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border space-x-2">
                <button
                  onClick={() => handleEdit(sale)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(sale._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {sales.length === 0 && (
        <p className="text-center text-gray-600 mt-4">No sales available.</p>
      )}

      {/* Inline Edit Modal */}
      {editingSale && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Sale</h2>
            <p className="mb-2">
              <strong>Fisherman:</strong>{" "}
              {editingSale.fishSupply?.fisherman?.name || "Unknown"}
            </p>
            <p className="mb-2">
              <strong>Quantity:</strong> {editingSale.fishSupply?.quantity || 0} kg
            </p>
            <input
              type="number"
              value={updatedAmount}
              onChange={(e) => setUpdatedAmount(e.target.value)}
              className="border w-full px-3 py-2 mb-4 rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingSale(null)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
