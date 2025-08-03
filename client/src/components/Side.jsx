import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-4 h-screen flex flex-col">
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-6">Your Actions</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/supplies/me">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
              Supply
            </Button>
          </Link>
          <Link to="/transactions/me">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
              Transactions
            </Button>
          </Link>
          <Link to="/sales/me">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
              Sales
            </Button>
          </Link>
          <Link to="/community">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
              Community
            </Button>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
