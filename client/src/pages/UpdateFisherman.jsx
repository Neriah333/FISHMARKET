import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function UpdateFisherman() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fisherman, setFisherman] = useState({ name: "", address: "", contact: "" });

  // Load fisherman data on mount
  useEffect(() => {
    const storedFishermen = JSON.parse(localStorage.getItem("fishermen")) || [];
    const selectedFisherman = storedFishermen.find((f) => f.id === Number(id));

    if (!selectedFisherman) {
      alert("Fisherman not found!");
      navigate("/admin/fishermen");
      return;
    }

    setFisherman(selectedFisherman);
  }, [id, navigate]);

  const handleSave = (e) => {
    e.preventDefault();

    const storedFishermen = JSON.parse(localStorage.getItem("fishermen")) || [];
    const updatedList = storedFishermen.map((f) =>
      f.id === Number(id) ? { ...f, ...fisherman } : f
    );

    localStorage.setItem("fishermen", JSON.stringify(updatedList));

    navigate("/admin/fishermen", { replace: true });
  };

  return (
    <div className="p-6 flex justify-center bg-gray-300">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">Update Fisherman</h1>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={fisherman.name}
                onChange={(e) => setFisherman({ ...fisherman, name: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                value={fisherman.address}
                onChange={(e) => setFisherman({ ...fisherman, address: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Contact</label>
              <input
                type="text"
                value={fisherman.contact}
                onChange={(e) => setFisherman({ ...fisherman, contact: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter contact number"
              />
            </div>

            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/admin/fishermen")}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 text-white hover:bg-green-700">
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
