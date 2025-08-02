import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import API from "../../services/api";

export default function FishermanList() {
  const [fishermen, setFishermen] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch fishermen on page load
  useEffect(() => {
    const fetchFishermen = async () => {
      try {
        const res = await API.get("/fishermen/all");
        setFishermen(res.data || []);
      } catch (error) {
        alert(error.response?.data?.message || "Failed to fetch fishermen");
      }
    };
    fetchFishermen();
  }, []);

  // ✅ Delete fisherman
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this fisherman?")) return;

    try {
      await API.delete(`/fishermen/${id}`);
      setFishermen(fishermen.filter((f) => f._id !== id));
      alert("Fisherman deleted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete fisherman");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Fishermen List</h1>
        <Button onClick={() => navigate("/admin/fishermen/add")}>+ Add Fisherman</Button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Contact</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fishermen.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">No fishermen found</td>
              </tr>
            ) : (
              fishermen.map((fisherman) => (
                <tr key={fisherman._id} className="border-t">
                  <td className="px-4 py-2 border">{fisherman.name}</td>
                  <td className="px-4 py-2 border">{fisherman.address}</td>
                  <td className="px-4 py-2 border">{fisherman.contact || "N/A"}</td>
                  <td className="px-4 py-2 border flex gap-2">
                    <Button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white"
                      onClick={() => navigate(`/admin/fishermen/update/${fisherman._id}`)}
                    >
                      Update
                    </Button>
                    <Button
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handleDelete(fisherman._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
