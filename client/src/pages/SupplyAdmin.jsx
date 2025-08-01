import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

// Initial sample data
const initialSupplies = [
  {
    id: 1,
    fisherman: "Otieno Odhiambo",
    quantity: 50,
    pricePerUnit: 200,
    catchDate: "2025-07-25",
  },
  {
    id: 2,
    fisherman: "Wanjiku Njeri",
    quantity: 30,
    pricePerUnit: 220,
    catchDate: "2025-07-26",
  },
  {
    id: 3,
    fisherman: "Kamau Mwangi",
    quantity: 40,
    pricePerUnit: 210,
    catchDate: "2025-07-27",
  },
];

export default function SupplyAdmin() {
  const [supplies, setSupplies] = useState([]);
  const navigate = useNavigate();

  const loadSupplies = () => {
    // Load from localStorage or fallback to initialSupplies
    const stored = JSON.parse(localStorage.getItem("supplies")) || initialSupplies;
    setSupplies(stored);

    // If localStorage is empty, save the initialSupplies
    if (!localStorage.getItem("supplies")) {
      localStorage.setItem("supplies", JSON.stringify(initialSupplies));
    }
  };

  useEffect(() => {
    loadSupplies();

    // Auto-refresh when page/tab regains focus
    const handleFocus = () => loadSupplies();
    window.addEventListener("focus", handleFocus);

    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this supply?")) {
      const updated = supplies.filter((s) => s.id !== id);
      setSupplies(updated);
      localStorage.setItem("supplies", JSON.stringify(updated));
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/supply/update/${id}`);
  };

  return (
    <div className="p-6 w-full bg-gray-300">
      {/* Header with Add Supply Button */}
      <div className="flex justify-between items-center mb-6 w-full">
        <h1 className="text-2xl font-bold">Fish Supplies</h1>
        <Button
          onClick={() => navigate("/admin/supply/add")}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          + Add Supply
        </Button>
      </div>

      {/* Supply Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {supplies.map((supply) => (
          <Card key={supply.id} className="p-4 shadow-md">
            <h2 className="text-lg font-semibold">{supply.fisherman}</h2>
            <p>
              <span className="font-medium">Quantity:</span> {supply.quantity} kg
            </p>
            <p>
              <span className="font-medium">Price/Unit:</span> Ksh {supply.pricePerUnit}
            </p>
            <p>
              <span className="font-medium">Date:</span>{" "}
              {format(new Date(supply.catchDate), "PPP")}
            </p>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" onClick={() => handleUpdate(supply.id)}>
                Update
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(supply.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}

        {supplies.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No supplies found. Click “Add Supply” to create one.
          </p>
        )}
      </div>

      {/* Supply Volume Chart */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Supply Volume Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={supplies}>
          <XAxis dataKey="fisherman" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantity" fill="#38bdf8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
