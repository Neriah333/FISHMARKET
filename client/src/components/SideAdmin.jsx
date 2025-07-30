import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Users, Truck, ShoppingCart, Receipt } from "lucide-react";

export default function Side() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 h-screen flex flex-col">
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-6">Admin Menu</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/admin/fishermen">
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                isActive("/admin/fishermen") ? "bg-gray-800 text-white" : "text-gray-300"
              }`}
            >
              <Users className="mr-2 h-5 w-5" /> Fishermen
            </Button>
          </Link>
          <Link to="/admin/supply">
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                isActive("/admin/supply") ? "bg-gray-800 text-white" : "text-gray-300"
              }`}
            >
              <Truck className="mr-2 h-5 w-5" /> Supply
            </Button>
          </Link>
          <Link to="/admin/sales">
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                isActive("/admin/sales") ? "bg-gray-800 text-white" : "text-gray-300"
              }`}
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Sales
            </Button>
          </Link>
          <Link to="/admin/transactions">
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                isActive("/admin/transactions") ? "bg-gray-800 text-white" : "text-gray-300"
              }`}
            >
              <Receipt className="mr-2 h-5 w-5" /> Transactions
            </Button>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
