import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

export default function SupplyList() {
  const [supplies, setSupplies] = useState([]);

  useEffect(() => {
  API.get("/supplies")   // ✅ correct endpoint
    .then((res) => setSupplies(res.data))
    .catch(() => alert("Failed to load supplies"));
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Fish Supplies</h1>
        <Link
          to="/admin/supply/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Supply
        </Link>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Fisherman</th>
            <th className="px-4 py-2 border">Quantity (Kg)</th>
            <th className="px-4 py-2 border">Price/Unit</th>
            <th className="px-4 py-2 border">Catch Date</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {supplies.map((supply) => (
            <tr key={supply._id} className="text-center">
              <td className="px-4 py-2 border">{supply.fisherman?.name || "Unknown"}</td>
              <td className="px-4 py-2 border">{supply.quantity}</td>
              <td className="px-4 py-2 border">{supply.pricePerUnit}</td>
              <td className="px-4 py-2 border">
                {new Date(supply.catchDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border space-x-2">
                <Link
                  to={`/admin/supply/update/${supply._id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <button
                  onClick={async () => {
                    if (window.confirm("Are you sure?")) {
                      await API.delete(`/supplies/${supply._id}`);
                      setSupplies(supplies.filter((s) => s._id !== supply._id));
                    }
                  }}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
