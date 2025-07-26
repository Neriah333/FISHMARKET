import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

export default function SupplyPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const supplies = [
    {
      id: 1,
      fisherman: "John Oduor",
      fishType: "Tilapia",
      quantity: 30,
      price: 3000,
      date: "2025-07-26",
    },
    {
      id: 2,
      fisherman: "Mary Atieno",
      fishType: "Nile Perch",
      quantity: 45,
      price: 6750,
      date: "2025-07-25",
    },
    {
      id: 3,
      fisherman: "Joseph Kiptoo",
      fishType: "Tilapia",
      quantity: 20,
      price: 2000,
      date: "2025-07-26",
    },
  ];

  const selectedDateStr = format(selectedDate, "yyyy-MM-dd");

  const filteredSupplies = supplies.filter(
    (supply) => supply.date === selectedDateStr
  );

  // Group supply quantities by fish type
  const chartData = filteredSupplies.reduce((acc, item) => {
    const existing = acc.find((entry) => entry.fishType === item.fishType);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      acc.push({ fishType: item.fishType, quantity: item.quantity });
    }
    return acc;
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Fish Supply Records</h1>
        <Button onClick={() => alert("Open Add Supply Form")}>+ Add Supply</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="rounded-xl border p-4 bg-white">
          <h2 className="text-xl font-semibold mb-2">Filter by Date</h2>
          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
        </div>

        {/* Chart */}
        <div className="rounded-xl border p-4 bg-white">
          <h2 className="text-xl font-semibold mb-2">Supply Quantity by Fish Type</h2>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="fishType" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantity" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-muted-foreground">No data for selected date.</p>
          )}
        </div>
      </div>

      {/* Filtered Table */}
      <div className="rounded-xl border p-4 bg-white">
        <h2 className="text-xl font-semibold mb-4">
          Supplies for {format(selectedDate, "MMMM d, yyyy")}
        </h2>
        {filteredSupplies.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Fisherman</TableHead>
                <TableHead>Fish Type</TableHead>
                <TableHead>Quantity (kg)</TableHead>
                <TableHead>Total Price (KES)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSupplies.map((supply, index) => (
                <TableRow key={supply.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{supply.fisherman}</TableCell>
                  <TableCell>{supply.fishType}</TableCell>
                  <TableCell>{supply.quantity}</TableCell>
                  <TableCell>{supply.price}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground">No supplies for this date.</p>
        )}
      </div>
    </div>
  );
}
