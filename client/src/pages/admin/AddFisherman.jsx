import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import API from "../../services/api"; // ✅ your axios instance with token

export default function AddFisherman() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !address || !contact) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // ✅ POST to backend
      await API.post("/fishermen", {
        name,
        address,
        contact,
      });

      alert("Fisherman added successfully!");
      navigate("/admin/fishermen", { replace: true });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add fisherman");
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">Add Fisherman</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Contact</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
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
              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                Save Fisherman
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
