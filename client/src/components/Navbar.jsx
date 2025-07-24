import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Input } from "./ui/input";
import ThemeToggle from "./ThemeToggle";
import { Avatar } from "./ui/avatar";


export default function Layout({ setFilter }) {



  return (
    <div className="flex justify-center items-center py-4 shadow-none border-none">
        <NavigationMenu className="mt-5 mb-5">
        <NavigationMenuList className="flex justify-between items-center w-full">
          <div className="flex justify-center items-center py-4 shadow-none border-none">
            <NavigationMenu className="mt-5 mb-5">
              <NavigationMenuList className="flex justify-between items-center w-full">
                <div className="flex gap-6 text-sm">
                  <NavigationMenuItem>
                    <a
                      href="#"
                      className="text-3xl font-bold text-white hover:text-blue-600"
                    >
                      Home
                    </a>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <a
                      href="#"
                      className="text-3xl font-bold text-white hover:text-blue-600"
                    >
                      About
                    </a>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <a
                      href="#"
                      className="text-3xl font-bold text-white hover:text-blue-600"
                    >
                      Contact
                    </a>
                  </NavigationMenuItem>
                </div>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <Input placeholder="Search sales..." className="w-64 text-white" 
          onChange={(e) => setFilter?.(e.target.value)} />
          <ThemeToggle />
        </NavigationMenuList>
      </NavigationMenu>
      <Avatar className="ml-6" />
    </div>
  );
}
