import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function UpdateTransaction() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    fisherman: "",
    sale: "",
    paymentAmount: "",
    transactionDate: "",
  });

  useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const transaction = transactions.find((tx) => tx.id === Number(id));
    if (transaction) {
      setForm({
        fisherman: transaction.fisherman,
        sale: transaction.sale,
        paymentAmount: transaction.paymentAmount,
        transactionDate: transaction.transactionDate,
      });
    } else {
      alert("Transaction not found!");
      navigate("/admin/transactions");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const updatedTransactions = transactions.map((tx) =>
      tx.id === Number(id)
        ? {
            ...tx,
            fisherman: form.fisherman,
            sale: form.sale,
            paymentAmount: Number(form.paymentAmount),
            transactionDate: form.transactionDate,
          }
        : tx
    );

    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    navigate("/admin/transactions");
  };

  return (
    <div className="p-6 w-full flex justify-center bg-gray-300">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-6">Update Transaction</h1>
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
              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                Update Transaction
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
