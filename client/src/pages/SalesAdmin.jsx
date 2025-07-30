import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SalesAdmin() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/sales");
        setSales(res.data);
      } catch (err) {
        console.error("Error fetching sales:", err);
      }
    };

    fetchSales();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Fish Sales</h1>

      <div className="grid gap-4">
        {sales.map((sale) => {
          const fisherman = sale?.fishSupply?.fisherman;

          return (
            <Card key={sale._id} className="p-4 shadow-md">
              <p className="font-semibold">Fisherman: {fisherman?.fullName}</p>
              <p>Sale Date: {new Date(sale.saleDate).toLocaleDateString()}</p>
              <p>Sale Amount: KES {sale.saleAmount.toLocaleString()}</p>
              <div className="mt-4 flex gap-2">
                <Button variant="outline">Update</Button>
                <Button variant="destructive">Delete</Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
