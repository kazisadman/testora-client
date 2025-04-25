import React, { useState } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";

const Login = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const email = e.target.email.value;
    const password = e.target.password.value;

    const data = {
      email,
      password,
    };
    setLoading(true);

    if (password.length < 6) {
      setError("Password should be ateast 6 characters");
    } else {
      axiosInstance
        .post("/login", data, {
          headers: {
            withCredentials: true,
          },
        })
        .then((data) => {
          dispatch(login(data.data?.data));
          setLoading(false);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setError("User not found");
          } else if (err.response.status === 401) {
            setError("Password is incorrect");
          }
          console.log(err);
        });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Container className="flex flex-col items-center gap-4">
        <Heading title="Log In" />
        <form onSubmit={handleLogin}>
          <div className="flex flex-col items-center gap-4 max-w-sm">
            {/* Email */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="johndoe@example.com"
              />
            </div>
            {/* Password */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" name="password" placeholder="Password" />
            </div>
            {loading ? (
              <Button className="w-full" disabled>
                <Loader2 className="animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Submit
              </Button>
            )}
          </div>
          <div className="mt-2">
            <p>
              Don't have an account?
              <Link to="/Register" className="text-purple-600 ml-2">
                Register
              </Link>
            </p>
            {error && <div className="text-red-500">{error}</div>}
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Login;
