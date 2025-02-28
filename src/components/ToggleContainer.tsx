import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import NavigationRoutes from "./NavigationRoutes";
import { NavLink } from "react-router-dom";
import { cn } from "../lib/utils";

const ToggleContainer = () => {
  return (
    <Sheet>
      <SheetTrigger className="block md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col items-start gap-6">
          <NavigationRoutes isMobile />
          <NavLink
            to={"/generate"}
            className={({ isActive }) =>
              cn(
                "text-base text-neutral-600",
                isActive && "text-neutral-900 font-semibold"
              )
            }
          >
            Take An Interview
          </NavLink>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default ToggleContainer;
