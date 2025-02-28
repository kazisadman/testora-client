import { NavLink } from "react-router-dom";
import { cn } from "../lib/utils";
import Container from "./Container";
import LogoContainer from "./LogoContainer";
import NavigationRoutes from "./NavigationRoutes";
import ToggleContainer from "./ToggleContainer";

const Header = () => {
  return (
    <div
      className={cn("w-full border-b duration-150 transition-all ease-in-out")}
    >
      <Container>
        <div className="flex items-center justify-between gap-4 w-full">
          {/* logo section */}
          <LogoContainer />
          {/* navigation section */}
          <nav className="hidden md:flex items-center gap-3">
            <NavigationRoutes />
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
          <div>
            <ToggleContainer />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
