import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function UpdateSupply() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    fisherman: "",
    quantity: "",
    pricePerUnit: "",
    catchDate: "",
  });

  useEffect(() => {
    const supplies = JSON.parse(localStorage.getItem("supplies")) || [];
    const supply = supplies.find((s) => s.id === Number(id));
    if (supply) {
      setForm({
        fisherman: supply.fisherman,
        quantity: supply.quantity,
        pricePerUnit: supply.pricePerUnit,
        catchDate: supply.catchDate,
      });
    } else {
      alert("Supply not found!");
      navigate("/admin/supply");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const supplies = JSON.parse(localStorage.getItem("supplies")) || [];
    const updatedSupplies = supplies.map((s) =>
      s.id === Number(id)
        ? { ...s, ...form, quantity: Number(form.quantity), pricePerUnit: Number(form.pricePerUnit) }
        : s
    );

    localStorage.setItem("supplies", JSON.stringify(updatedSupplies));
    navigate("/admin/supply"); // Redirect back to list
  };

  return (
    <div className="p-6 w-full flex justify-center bg-gray-300">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-6">Update Supply</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fisherman"
              placeholder="Fisherman Name"
              value={form.fisherman}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity (kg)"
              value={form.quantity}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="number"
              name="pricePerUnit"
              placeholder="Price per Unit"
              value={form.pricePerUnit}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="date"
              name="catchDate"
              value={form.catchDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <div className="flex justify-between mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/supply")}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                Update Supply
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
