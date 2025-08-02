import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import API from "../../services/api";

export default function EditSale() {
  const { id } = useParams();
  const [fishSupplyId, setFishSupplyId] = useState("");
  const [saleAmount, setSaleAmount] = useState("");
  const [saleDate, setSaleDate] = useState("");
  const [supplies, setSupplies] = useState([]);
  const navigate = useNavigate();

  // Fetch sale details
  useEffect(() => {
    API.get(`/sales/${id}`)
      .then((res) => {
        setFishSupplyId(res.data.fishSupply || "");
        setSaleAmount(res.data.saleAmount || "");
        setSaleDate(res.data.saleDate?.split("T")[0] || "");
      })
      .catch(() => alert("Failed to load sale details"));

    // Fetch supplies for dropdown
    API.get("/supplies")
      .then((res) => setSupplies(res.data))
      .catch(() => alert("Failed to load supplies"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fishSupplyId || !saleAmount || !saleDate) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await API.put(`/sales/${id}`, {
        fishSupply: fishSupplyId,
        saleAmount,
        saleDate,
      });

      alert("Sale updated successfully!");
      navigate("/admin/sales", { replace: true });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update sale");
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">Edit Sale</h1>
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
                {supplies.map((supply) => (
                  <option key={supply._id} value={supply._id}>
                    {supply.fisherman?.name || "Unknown"} - {supply.quantity}Kg
                  </option>
                ))}
              </select>
            </div>

            {/* Sale Amount */}
            <div>
              <label className="block text-sm font-medium mb-1">Sale Amount</label>
              <input
                type="number"
                value={saleAmount}
                onChange={(e) => setSaleAmount(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter sale amount (Ksh)"
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
                Update Sale
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
