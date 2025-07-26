import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token or user data
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-8 py-4 border-b">
      {/* Nav Links */}
      <NavigationMenu>
        <NavigationMenuList className="flex gap-10">
          <NavigationMenuItem>
            <Link
              to="/login"
              className="text-2xl font-bold text-blue hover:text-blue-600"
            >
              Home
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to="/about"
              className="text-2xl font-bold text-blue hover:text-blue-600"
            >
              About
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to="/contact"
              className="text-2xl font-bold text-blue hover:text-blue-600"
            >
              Contact
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Avatar Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <UserCircleIcon className="h-10 w-10 text-gray-700" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 mt-2">
          <DropdownMenuItem onClick={() => console.log("Profile")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Settings")}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
