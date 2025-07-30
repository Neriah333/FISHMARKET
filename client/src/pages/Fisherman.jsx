import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const initialFishermen = [
  { id: 1, name: "Otieno Odhiambo", address: "Homa Bay", contact: "0712345678" },
  { id: 2, name: "Wanjiku Njeri", address: "Kisumu", contact: "0723456789" },
  { id: 3, name: "Kamau Mwangi", address: "Naivasha", contact: "0734567890" },
  { id: 4, name: "Akinyi Atieno", address: "Mbita", contact: "0745678901" },
  { id: 5, name: "Mutiso Muthoni", address: "Mfangano", contact: "0756789012" },
  { id: 6, name: "Chebet Kiptoo", address: "Kericho", contact: "0767890123" },
  { id: 7, name: "Juma Makori", address: "Bondo", contact: "0778901234" },
  { id: 8, name: "Khalid Abdalla", address: "Lamu", contact: "0789012345" },
  { id: 9, name: "Mwende Kalonzo", address: "Machakos", contact: "0790123456" },
  { id: 10, name: "Barasa Wafula", address: "Busia", contact: "0701234567" },
];

export default function Fisherman() {
  const [fishermen, setFishermen] = useState(initialFishermen);

  const handleUpdate = (id) => {
    alert(`Update fisherman with ID ${id}`);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this fisherman?");
    if (confirm) {
      setFishermen(fishermen.filter((f) => f.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Fishermen List</h1>
      <Card>
        <CardContent className="overflow-x-auto p-4">
          <table className="w-full text-sm text-left border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Address</th>
                <th className="py-2 px-4 border">Contact</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fishermen.map((fisherman) => (
                <tr key={fisherman.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 border">{fisherman.name}</td>
                  <td className="py-2 px-4 border">{fisherman.address}</td>
                  <td className="py-2 px-4 border">{fisherman.contact}</td>
                  <td className="py-2 px-4 border flex gap-2">
                    <Button size="sm" onClick={() => handleUpdate(fisherman.id)}>Update</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(fisherman.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
              {fishermen.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    No fishermen found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
