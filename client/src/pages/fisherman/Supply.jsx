import { useEffect, useState } from "react";
import API from "../../services/api";

export default function SupplyList() {
  const [supplies, setSupplies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const res = await API.get("/supplies/me"); // ✅ Fisherman-only endpoint
        setSupplies(res.data);
      } catch (err) {
        if (err.response?.status === 403) {
          alert("You are not allowed to view supplies.");
        } else {
          alert("Failed to load supplies.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSupplies();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading supplies...</div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Fish Supplies</h1>

      {supplies.length === 0 ? (
        <p className="text-gray-500">You have no supplies recorded yet.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Quantity (Kg)</th>
              <th className="px-4 py-2 border">Price/Unit</th>
              <th className="px-4 py-2 border">Catch Date</th>
            </tr>
          </thead>
          <tbody>
            {supplies.map((supply) => (
              <tr key={supply._id} className="text-center">
                <td className="px-4 py-2 border">{supply.quantity}</td>
                <td className="px-4 py-2 border">{supply.pricePerUnit}</td>
                <td className="px-4 py-2 border">
                  {new Date(supply.catchDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
