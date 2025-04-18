import { Link } from "react-router-dom";
import logo from "/logo_full_bg.png";
const LogoContainer = () => {
  return (
    <Link to={"/"}>
<img src={logo} alt="logo" className="w-40"/>
    </Link>
  );
};

export default LogoContainer;
