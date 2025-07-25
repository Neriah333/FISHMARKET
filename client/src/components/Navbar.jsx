import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";


export default function Layout() {



  return (
    <div className="flex justify-center items-center py-4 shadow-none border-2">
        <NavigationMenu className="">
        <NavigationMenuList className="flex justify-between items-center w-full">
          <div className="flex justify-center items-center shadow-none border-none">
            <NavigationMenu className="">
              <NavigationMenuList className="flex justify-between items-center w-full">
                <div className="flex gap-10 text-sm">
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
                </div>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

        </NavigationMenuList>
      </NavigationMenu>

      <Button variant="ghost" size="icon" className="ml-150">
        <UserCircleIcon className="h-16 w-16" />
      </Button>
    </div>
  );
}
