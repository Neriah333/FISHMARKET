import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (!user || !token) {
        console.error("No user or token in localStorage");
        setLoading(false);
        return;
      }

      // ✅ Use endpoint based on role
      let endpoint = "/sales";
      if (user.role === "fisherman") endpoint = "/sales/me";

      try {
        const res = await API.get(endpoint); // Axios instance already adds Bearer token
        setSales(res.data);
      } catch (err) {
        console.error("Failed to fetch sales:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) return <p>Loading sales...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Sales Data</h2>
      {sales.length === 0 ? (
        <p>No sales data found.</p>
      ) : (
        <ul className="space-y-2">
          {sales.map((sale) => (
            <li key={sale._id} className="border rounded p-2">
              {new Date(sale.saleDate).toLocaleDateString()} — {sale.saleAmount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
