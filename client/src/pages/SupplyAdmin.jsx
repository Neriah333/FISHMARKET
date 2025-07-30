import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

const initialSupplies = [
  {
    id: 1,
    fisherman: "Otieno Odhiambo",
    quantity: 120,
    pricePerUnit: 250,
    catchDate: new Date("2025-07-15"),
  },
  {
    id: 2,
    fisherman: "Wanjiku Njeri",
    quantity: 95,
    pricePerUnit: 230,
    catchDate: new Date("2025-07-16"),
  },
  {
    id: 3,
    fisherman: "Kamau Mwangi",
    quantity: 140,
    pricePerUnit: 200,
    catchDate: new Date("2025-07-18"),
  },
];

export default function Supply() {
  const [supplies, setSupplies] = useState(initialSupplies);

  const handleDelete = (id) => {
    setSupplies(supplies.filter((supply) => supply.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Fish Supplies</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {supplies.map((supply) => (
          <Card key={supply.id} className="p-4">
            <h2 className="text-lg font-semibold">{supply.fisherman}</h2>
            <p>
              <span className="font-medium">Quantity:</span> {supply.quantity} kg
            </p>
            <p>
              <span className="font-medium">Price/Unit:</span> Ksh {supply.pricePerUnit}
            </p>
            <p>
              <span className="font-medium">Date:</span> {format(new Date(supply.catchDate), "PPP")}
            </p>
            <div className="flex gap-2 mt-3">
              <Button variant="outline">Update</Button>
              <Button variant="destructive" onClick={() => handleDelete(supply.id)}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Supply Volume Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={supplies}>
          <XAxis dataKey="fisherman" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantity" fill="#38bdf8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
