import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import API from "../../services/api";

export default function EditFisherman() {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch fisherman details on load
  useEffect(() => {
    const fetchFisherman = async () => {
      try {
        const res = await API.get(`/fishermen/${id}`);
        const fisherman = res.data;

        setName(fisherman.name || "");
        setAddress(fisherman.address || "");
        setContact(fisherman.contactInfo || "");
        setLoading(false);
      } catch (err) {
        alert("Failed to load fisherman details");
        navigate("/admin/fishermen");
      }
    };

    fetchFisherman();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/fishermen/${id}`, {
        name,
        address,
        contactInfo: contact, // ✅ match backend schema
      });
      alert("Fisherman updated successfully!");
      navigate("/admin/fishermen");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">Update Fisherman</h1>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Contact</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full border rounded px-3 py-2"
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
                Update Fisherman
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
