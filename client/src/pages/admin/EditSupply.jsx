import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import API from "../../services/api";

export default function EditSupply() {
  const { id } = useParams(); // supply ID from URL
  const navigate = useNavigate();

  const [fisherman, setFisherman] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [catchDate, setCatchDate] = useState("");
  const [fishermen, setFishermen] = useState([]);

  // Fetch existing supply
  useEffect(() => {
    const fetchSupply = async () => {
      try {
        const res = await API.get(`/supplies/${id}`);
        const supply = res.data;

        setFisherman(supply.fisherman?._id || "");
        setQuantity(supply.quantity || "");
        setPricePerUnit(supply.pricePerUnit || "");
        setCatchDate(supply.catchDate ? supply.catchDate.split("T")[0] : "");
      } catch (error) {
        alert("Failed to load supply data");
      }
    };

    const fetchFishermen = async () => {
      try {
        const res = await API.get("/fishermen/all");
        setFishermen(res.data);
      } catch {
        alert("Failed to load fishermen");
      }
    };

    fetchSupply();
    fetchFishermen();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!fisherman || !quantity || !pricePerUnit || !catchDate) {
      alert("All fields are required");
      return;
    }

    try {
      await API.put(`/supplies/${id}`, {
        fisherman,
        quantity,
        pricePerUnit,
        catchDate,
      });

      alert("Supply updated successfully!");
      navigate("/admin/supply", { replace: true });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update supply");
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">Edit Supply</h1>
          <form onSubmit={handleUpdate} className="space-y-4">
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
                Update Supply
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
