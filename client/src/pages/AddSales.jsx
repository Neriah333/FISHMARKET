import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AddSale() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fisherman: "",
    saleDate: "",
    saleAmount: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sales = JSON.parse(localStorage.getItem("sales")) || [];
    const newSale = {
      _id: Date.now(),
      fishSupply: { fisherman: { fullName: form.fisherman } },
      saleDate: form.saleDate,
      saleAmount: Number(form.saleAmount),
    };

    sales.push(newSale);
    localStorage.setItem("sales", JSON.stringify(sales));

    navigate("/admin/sales"); // Redirect back to list
  };

  return (
    <div className="p-6 w-full flex justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-6">Add New Sale</h1>
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
              type="date"
              name="saleDate"
              value={form.saleDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="number"
              name="saleAmount"
              placeholder="Sale Amount (KES)"
              value={form.saleAmount}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <div className="flex justify-between mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/sales")}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                Save Sale
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
