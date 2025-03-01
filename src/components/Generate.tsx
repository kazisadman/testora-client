import { Outlet } from "react-router-dom";
import Header from "./Header";

const Generate = () => {
  return (
    <div className="flex-col md:px-12">
      <Header />
      <Outlet />
    </div>
  );
};

export default Generate;
