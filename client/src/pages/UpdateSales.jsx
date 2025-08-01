import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function UpdateSale() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    fisherman: "",
    saleDate: "",
    saleAmount: "",
  });

  useEffect(() => {
    const sales = JSON.parse(localStorage.getItem("sales")) || [];
    const sale = sales.find((s) => s._id === Number(id));
    if (sale) {
      setForm({
        fisherman: sale.fishSupply?.fisherman?.fullName || "",
        saleDate: sale.saleDate,
        saleAmount: sale.saleAmount,
      });
    } else {
      alert("Sale not found!");
      navigate("/admin/sales");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sales = JSON.parse(localStorage.getItem("sales")) || [];
    const updatedSales = sales.map((s) =>
      s._id === Number(id)
        ? {
            ...s,
            fishSupply: { fisherman: { fullName: form.fisherman } },
            saleDate: form.saleDate,
            saleAmount: Number(form.saleAmount),
          }
        : s
    );

    localStorage.setItem("sales", JSON.stringify(updatedSales));
    navigate("/admin/sales"); // Redirect back to list
  };

  return (
    <div className="p-6 w-full flex justify-center bg-gray-300">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-6">Update Sale</h1>
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
              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                Update Sale
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
