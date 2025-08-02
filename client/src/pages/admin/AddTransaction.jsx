import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import API from "../../services/api";

export default function AddTransaction() {
  const [fishermanId, setFishermanId] = useState("");
  const [fishSaleId, setFishSaleId] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [fishermen, setFishermen] = useState([]);
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/fishermen/all").then((res) => setFishermen(res.data));
    API.get("/sales").then((res) => setSales(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fishermanId || !fishSaleId || !transactionDate || !paymentAmount) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await API.post("/transactions", {
        fisherman: fishermanId,
        fishSale: fishSaleId,
        transactionDate,
        paymentAmount,
      });

      alert("Transaction added successfully!");
      navigate("/admin/transactions", { replace: true });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add transaction");
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">Add Transaction</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Fisherman</label>
              <select
                value={fishermanId}
                onChange={(e) => setFishermanId(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select a fisherman</option>
                {fishermen.map((f) => (
                  <option key={f._id} value={f._id}>{f.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Fish Sale</label>
              <select
                value={fishSaleId}
                onChange={(e) => setFishSaleId(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select a sale</option>
                {sales.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.fishSupply?.fisherman?.name || "Unknown"} - {s.saleAmount} Ksh
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Transaction Date</label>
              <input
                type="date"
                value={transactionDate}
                onChange={(e) => setTransactionDate(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Payment Amount (Ksh)</label>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter amount"
              />
            </div>

            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/admin/transactions")}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                Save Transaction
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
