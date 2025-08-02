import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

export default function SalesList() {
  const [sales, setSales] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    API.get("/sales")
      .then((res) => {
        let data = res.data;
        // ✅ Only show my sales if fisherman
        if (user?.role === "fisherman") {
          data = data.filter(
            (sale) => sale.fishSupply?.fisherman?._id === user.id
          );
        }
        setSales(data);
      })
      .catch(() => alert("Failed to load sales"));
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Fish Sales</h1>
        {user?.role !== "fisherman" && (
          <Link
            to="/admin/sales/add"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Sale
          </Link>
        )}
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Fisherman</th>
            <th className="px-4 py-2 border">Quantity (Kg)</th>
            <th className="px-4 py-2 border">Sale Amount (Ksh)</th>
            <th className="px-4 py-2 border">Sale Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id} className="text-center">
              <td className="px-4 py-2 border">{sale.fishSupply?.fisherman?.name || "Unknown"}</td>
              <td className="px-4 py-2 border">{sale.fishSupply?.quantity || 0}</td>
              <td className="px-4 py-2 border">{sale.saleAmount}</td>
              <td className="px-4 py-2 border">{new Date(sale.saleDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
