import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Truck, ShoppingCart, Receipt } from "lucide-react";

export default function Side() {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  const links = [
    { to: "/admin", label: "Dashboard", icon: <LayoutDashboard className="mr-2 h-5 w-5" /> },
    { to: "/admin/fishermen", label: "Fishermen", icon: <Users className="mr-2 h-5 w-5" /> },
    { to: "/admin/supply", label: "Supply", icon: <Truck className="mr-2 h-5 w-5" /> },
    { to: "/admin/sales", label: "Sales", icon: <ShoppingCart className="mr-2 h-5 w-5" /> },
    { to: "/admin/transactions", label: "Transactions", icon: <Receipt className="mr-2 h-5 w-5" /> },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 h-screen flex flex-col">
      <div className="mt-6 mb-10">
        <h2 className="text-2xl font-bold text-center">FishCoop</h2>
      </div>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link key={link.to} to={link.to}>
            <Button
              variant="ghost"
              className={`w-full justify-start transition-colors duration-200 ${
                isActive(link.to) ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              {link.icon} {link.label}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
