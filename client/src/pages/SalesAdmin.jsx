import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Initial mock sales
const mockSales = [
  {
    _id: 1,
    fishSupply: { fisherman: { fullName: "Otieno Odhiambo" } },
    saleDate: "2025-07-29T00:00:00.000Z",
    saleAmount: 5000,
  },
  {
    _id: 2,
    fishSupply: { fisherman: { fullName: "Wanjiku Njeri" } },
    saleDate: "2025-07-30T00:00:00.000Z",
    saleAmount: 12000,
  },
  {
    _id: 3,
    fishSupply: { fisherman: { fullName: "Kamau Mwangi" } },
    saleDate: "2025-07-31T00:00:00.000Z",
    saleAmount: 7500,
  },
];

export default function SalesAdmin() {
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();

  const loadSales = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/sales");
      const apiSales = res.data || [];
      if (apiSales.length > 0) {
        setSales(apiSales);
        localStorage.setItem("sales", JSON.stringify(apiSales));
      } else {
        const stored = JSON.parse(localStorage.getItem("sales")) || mockSales;
        setSales(stored);
        localStorage.setItem("sales", JSON.stringify(stored));
      }
    } catch (err) {
      console.error("Error fetching sales:", err);
      const stored = JSON.parse(localStorage.getItem("sales")) || mockSales;
      setSales(stored);
      localStorage.setItem("sales", JSON.stringify(stored));
    }
  };

  useEffect(() => {
    loadSales();
    // Auto-refresh when tab regains focus
    const handleFocus = () => loadSales();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this sale?")) {
      const updated = sales.filter((sale) => sale._id !== id);
      setSales(updated);
      localStorage.setItem("sales", JSON.stringify(updated));
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/sales/update/${id}`);
  };

  return (
    <div className="p-6 w-full bg-gray-300">
      {/* Header with Add Sale button */}
      <div className="flex justify-between items-center mb-6 w-full">
        <h1 className="text-2xl font-bold">Fish Sales</h1>
        <Button
          onClick={() => navigate("/admin/sales/add")}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          + Add Sale
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sales.map((sale) => {
          const fisherman = sale?.fishSupply?.fisherman;
          return (
            <Card key={sale._id} className="p-4 shadow-md">
              <p className="font-semibold">Fisherman: {fisherman?.fullName || "Unknown"}</p>
              <p>Sale Date: {new Date(sale.saleDate).toLocaleDateString()}</p>
              <p>Sale Amount: KES {sale.saleAmount?.toLocaleString()}</p>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleUpdate(sale._id)}>
                  Update
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(sale._id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          );
        })}

        {sales.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No sales found. Click “Add Sale” to create one.
          </p>
        )}
      </div>
    </div>
  );
}
