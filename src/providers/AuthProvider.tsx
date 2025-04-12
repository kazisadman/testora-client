import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/check-auth")
      .then((data) => {
        const { name, email, _id, image } = data.data.data;

        dispatch(login({ email, image, name, _id }));
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [dispatch]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  return children;
};

export default AuthProvider;
