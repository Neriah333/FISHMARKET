import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function SupplyList() {
  const [supplies, setSupplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchSupplies();
  // }, []);

  // const fetchSupplies = async () => {
  //   try {
  //     const res = await API.get("/supplies");
  //     setSupplies(res.data || []);
  //   } catch (err) {
  //     console.error("Error fetching supplies:", err.response || err.message);
  //     alert("Failed to load supplies");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  useEffect(() => {
  const fetchMySupplies = async () => {
    try {
      const { data } = await API.get("/fishermen/me/supplies");
      setSupplies(data); // Only that fisherman's data
    } catch (error) {
      console.error("Error fetching my supplies:", error);
    }
  };

  fetchMySupplies();
}, []);


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supply?")) return;
    try {
      await API.delete(`/supplies/${id}`);
      setSupplies((prev) => prev.filter((s) => s._id !== id));
      alert("Supply deleted successfully");
    } catch (err) {
      alert("Failed to delete supply");
    }
  };

  if (loading) return <p className="text-center p-6">Loading supplies...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Fish Supplies</h1>
        <button
          onClick={() => navigate("/admin/supply/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Supply
        </button>
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
          {supplies.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No supplies found
              </td>
            </tr>
          ) : (
            supplies.map((supply) => (
              <tr key={supply._id} className="text-center">
                <td className="px-4 py-2 border">{supply.fisherman?.name || "Unknown"}</td>
                <td className="px-4 py-2 border">{supply.quantity}</td>
                <td className="px-4 py-2 border">{supply.pricePerUnit}</td>
                <td className="px-4 py-2 border">
                  {new Date(supply.catchDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    onClick={() => navigate(`/admin/supply/update/${supply._id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(supply._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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
