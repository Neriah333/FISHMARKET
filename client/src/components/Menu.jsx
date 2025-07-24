import {
  Menubar,
  MenubarMenu,
  MenubarContent,
  MenubarTrigger,
  MenubarItem,
} from "../components/ui/menubar";

export default function Menu() {
  return (
    <div className="px-6 py-4">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Your Actions:</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Supply</MenubarItem>
              <MenubarItem>Transactions</MenubarItem>
              <MenubarItem>Sales</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
  );
}