import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AddTransaction() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fisherman: "",
    sale: "",
    paymentAmount: "",
    transactionDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const newTransaction = {
      id: Date.now(),
      fisherman: form.fisherman,
      sale: form.sale,
      paymentAmount: Number(form.paymentAmount),
      transactionDate: form.transactionDate,
    };

    transactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    navigate("/admin/transactions"); // redirect after saving
  };

  return (
    <div className="p-6 w-full flex justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-6">Add New Transaction</h1>
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
              type="text"
              name="sale"
              placeholder="Sale Reference"
              value={form.sale}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="number"
              name="paymentAmount"
              placeholder="Payment Amount (KES)"
              value={form.paymentAmount}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="date"
              name="transactionDate"
              value={form.transactionDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <div className="flex justify-between mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/transactions")}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                Save Transaction
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
