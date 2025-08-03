import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function SalesList() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all sales
  const fetchSales = async () => {
    try {
      const res = await API.get("/sales");
      setSales(res.data || []);
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
      alert("Sale deleted successfully");
    } catch (err) {
      console.error("Error deleting sale:", err.response || err.message);
      alert("Failed to delete sale");
    }
  };

  if (loading) return <p className="text-center p-6">Loading sales...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Fish Sales</h1>
        <button
          onClick={() => navigate("/admin/sales/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Sale
        </button>
      </div>

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
          {sales.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No sales available.
              </td>
            </tr>
          ) : (
            sales.map((sale) => (
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
                    onClick={() => navigate(`/admin/sales/update/${sale._id}`)}
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

