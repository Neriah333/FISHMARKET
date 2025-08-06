import { useEffect, useState } from "react";
import API from "../../services/api";

export default function SupplyList() {
  const [supplies, setSupplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const role = localStorage.getItem("role");
        const endpoint = role === "fisherman" ? "/supplies/me" : "/supplies";

        const res = await API.get(endpoint);
        setSupplies(res.data || []);
      } catch (err) {
        alert("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };
    fetchSupplies();
  }, [user?.role]);

  //   useEffect(() => {
//   const fetchMySupplies = async () => {
//     try {
//       const { data } = await API.get("/fishermen/me/supplies");
//       setSupplies(data); // Only that fisherman's data
//     } catch (error) {
//       console.error("Error fetching my supplies:", error);
//     }
//   };

//   fetchMySupplies();
// }, []);

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
