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

export default function SalesPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const sales = [
    {
      id: 1,
      customer: "Market Buyer A",
      fishType: "Tilapia",
      quantity: 25,
      total: 3750,
      date: "2025-07-26",
    },
    {
      id: 2,
      customer: "Hotel Blue Nile",
      fishType: "Nile Perch",
      quantity: 40,
      total: 6000,
      date: "2025-07-25",
    },
    {
      id: 3,
      customer: "Retailer Jane",
      fishType: "Tilapia",
      quantity: 15,
      total: 2250,
      date: "2025-07-26",
    },
  ];

  const selectedDateStr = format(selectedDate, "yyyy-MM-dd");

  const filteredSales = sales.filter((sale) => sale.date === selectedDateStr);

  const chartData = filteredSales.reduce((acc, item) => {
    const existing = acc.find((entry) => entry.fishType === item.fishType);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      acc.push({ fishType: item.fishType, quantity: item.quantity });
    }
    return acc;
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-gray-300">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sales Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="rounded-xl border p-4 bg-white">
          <h2 className="text-xl font-semibold mb-2">Filter by Date</h2>
          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
        </div>

        {/* Chart */}
        <div className="rounded-xl border p-4 bg-white">
          <h2 className="text-xl font-semibold mb-2">Sales Quantity by Fish Type</h2>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="fishType" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantity" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-muted-foreground">No sales data for this date.</p>
          )}
        </div>
      </div>

      {/* Filtered Table */}
      <div className="rounded-xl border p-4 bg-white">
        <h2 className="text-xl font-semibold mb-4">
          Sales for {format(selectedDate, "MMMM d, yyyy")}
        </h2>
        {filteredSales.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Fish Type</TableHead>
                <TableHead>Quantity (kg)</TableHead>
                <TableHead>Total (KES)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale, index) => (
                <TableRow key={sale.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell>{sale.fishType}</TableCell>
                  <TableCell>{sale.quantity}</TableCell>
                  <TableCell>{sale.total}</TableCell>
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
          <p className="text-sm text-muted-foreground">No sales for this date.</p>
        )}
      </div>
    </div>
  );
}
