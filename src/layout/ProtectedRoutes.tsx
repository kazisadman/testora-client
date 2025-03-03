import { ReactNode } from "react";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ProtectedRoutes = ({ children }:{children:ReactNode}) => {
  const user = useSelector((state: RootState) => state.auth.email);

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default ProtectedRoutes;
