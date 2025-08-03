import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import API from "../../services/api";

export default function AddSupply() {
  const [fisherman, setFisherman] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [catchDate, setCatchDate] = useState("");
  const [fishermen, setFishermen] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch fishermen for dropdown
  useEffect(() => {
    API.get("/fishermen/all")
      .then((res) => setFishermen(res.data || []))
      .catch(() => alert("Failed to load fishermen"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fisherman || !quantity || !pricePerUnit || !catchDate) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await API.post("/supplies", {
        fisherman,
        quantity,
        pricePerUnit,
        catchDate,
      });

      alert("Supply added successfully!");
      navigate("/admin/supply", { replace: true });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add supply");
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">Add Fish Supply</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Fisherman</label>
              <select
                value={fisherman}
                onChange={(e) => setFisherman(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Fisherman</option>
                {fishermen.map((f) => (
                  <option key={f._id} value={f._id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Quantity (Kg)</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Price Per Kg</label>
              <input
                type="number"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Catch Date</label>
              <input
                type="date"
                value={catchDate}
                onChange={(e) => setCatchDate(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/admin/supply")}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                Save Supply
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
