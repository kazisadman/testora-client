import React, { useState } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../lib/axiosInstance";

const Register = () => {
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>("");

  const imageKey = import.meta.env.VITE_IMAGEBB_KEY!;

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleRegister = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const form = e.target;

    const email = form.email.value;

    const password = form.password.value;
    const image = form.avatar.files[0];

    const formData = new FormData();
    formData.append("image", image);

    if (password.length < 6) {
      setError("Password should be ateast 6 characters");
    } else {
      axios
        .post(`https://api.imgbb.com/1/upload?key=${imageKey}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((data) => {
          const imageUrl = data?.data.data.url;
          const userData = {
            name,
            email,
            password,
            image: imageUrl,
          };
          console.log(userData);

          axiosInstance
            .post(`/register`, userData)
            .then(() => {
              <Navigate to={'/'} replace/>
            })
            .catch((err) => {
              if (err.response.status === 409) {
                setError("Username or email already exits");
              } else if (err.response.status === 400) {
                setError("Input field is empty!");
              }
            });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Container className="flex flex-col items-center gap-4">
        <Heading title="Register" />
        <form onSubmit={handleRegister}>
          <div className="flex flex-col items-center gap-4 max-w-sm">
            {/* Name */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                value={name}
                onChange={handleNameInput}
                placeholder="John Doe"
              />
            </div>
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
            {/* image */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="avatar">Avatar</Label>
              <Input className="cursor-pointer" name="avatar" type="file" />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
          <div className="mt-2">
            <p>
              Already have an account?
              <Link to="/login" className="text-purple-600 ml-2">
                Login
              </Link>
            </p>
            {error && <div className="text-red-500">{error}</div>}
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Register;
