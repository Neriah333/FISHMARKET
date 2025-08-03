import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    const fetchSales = async () => {
      try {
        const role = localStorage.getItem("role");
        const endpoint = role === "fisherman" ? "/sales/me" : "/sales";

        const res = await API.get(endpoint);
        setSales(res.data || []);
      } catch (err) {
        alert("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, [user?.role]);


    
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
