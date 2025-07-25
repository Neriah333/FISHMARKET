// Sidebar.jsx
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-4 h-screen flex flex-col">
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-6">Your Actions</h2>
      <nav className="flex flex-col gap-2">
        <Link to="/supply">
          <Button variant="ghost" className="w-full justify-start text-gray hover:white">
            Supply
          </Button>
        </Link>
        <Link to="/transactions">
          <Button variant="ghost" className="w-full justify-start text-gray hover:white">
            Transactions
          </Button>
        </Link>
        <Link to="/sales">
          <Button variant="ghost" className="w-full justify-start text-gray hover:white">
            Sales
          </Button>
        </Link>
        <Link to="/community">
          <Button variant="ghost" className="w-full justify-start text-gray hover:white">
            Community
          </Button>
        </Link>
      </nav>
      </div>
    </aside>
  );
}
