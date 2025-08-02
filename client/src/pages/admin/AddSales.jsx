import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import API from "../../services/api";

export default function AddSale() {
  const [fishSupplyId, setFishSupplyId] = useState("");
  const [saleAmount, setSaleAmount] = useState("");
  const [saleDate, setSaleDate] = useState("");
  const [supplies, setSupplies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Fetch supplies with proper error handling
    API.get("/supplies")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setSupplies(res.data);
        } else {
          console.error("Unexpected response:", res.data);
          alert("Failed to load supplies for sales");
        }
      })
      .catch((err) => {
        console.error("Error fetching supplies:", err);
        alert("Failed to load supplies for sales");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fishSupplyId || !saleAmount || !saleDate) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const payload = {
        fishSupply: fishSupplyId,
        saleAmount: Number(saleAmount),
        saleDate,
      };

      console.log("Submitting sale:", payload); // ✅ Debug log

      await API.post("/sales", payload);

      alert("✅ Sale added successfully!");
      navigate("/admin/sales", { replace: true });
    } catch (error) {
      console.error("Failed to add sale:", error.response || error);
      alert(error.response?.data?.message || "❌ Failed to add sale");
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">Add Sale</h1>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Fish Supply Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-1">Fish Supply</label>
              <select
                value={fishSupplyId}
                onChange={(e) => setFishSupplyId(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select a supply</option>
                {supplies.length === 0 ? (
                  <option disabled>No supplies available</option>
                ) : (
                  supplies.map((supply) => (
                    <option key={supply._id} value={supply._id}>
                      {supply.fisherman?.name || "Unknown"} - {supply.quantity}Kg
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Sale Amount */}
            <div>
              <label className="block text-sm font-medium mb-1">Sale Amount (Ksh)</label>
              <input
                type="number"
                value={saleAmount}
                onChange={(e) => setSaleAmount(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter sale amount"
                min="0"
              />
            </div>

            {/* Sale Date */}
            <div>
              <label className="block text-sm font-medium mb-1">Sale Date</label>
              <input
                type="date"
                value={saleDate}
                onChange={(e) => setSaleDate(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/admin/sales")}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                Save Sale
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
