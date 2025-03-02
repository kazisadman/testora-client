import { Link, NavLink } from "react-router-dom";
import { cn } from "../lib/utils";
import Container from "./Container";
import LogoContainer from "./LogoContainer";
import NavigationRoutes from "./NavigationRoutes";
import ToggleContainer from "./ToggleContainer";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import axiosInstance from "../lib/axiosInstance";

const Header = () => {
  const imageLink = useSelector((state: RootState) => state.auth.image);

  const handleLogout = () => {
    axiosInstance
      .post(`/logout`)
      .then(() => {
        location.replace("/");
      })
      .catch((err) => console.log(err));
  };

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
          <div>
            {imageLink ? (
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={imageLink} alt="user" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Button onClick={handleLogout}>Logout</Button>
              </div>
            ) : (
              <Button asChild>
                <Link to="/login">
                  <User />
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
