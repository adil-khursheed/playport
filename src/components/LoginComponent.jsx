import { useState } from "react";
import { Button, Input } from "./index";
import { useForm } from "react-hook-form";
import {
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import { useLocation, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const LoginComponent = () => {
  const [error, setError] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);

  const { register, handleSubmit } = useForm();

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handlePasswordToggle = () => {
    setTogglePassword(!togglePassword);
  };

  const onSubmit = async (data) => {
    try {
      const nameIdentifier = data.usernameOrEmail.includes("@")
        ? "email"
        : "username";

      const requestData = {
        [nameIdentifier]: data.usernameOrEmail,
        password: data.password,
      };

      const response = await axios.post("/users/login", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(response?.data);

      if (response?.data) {
        const accessToken = response?.data?.data.accessToken;

        setAuth({ ...response?.data?.data.user, accessToken });
        navigate(from, { replace: true });
      }
    } catch (error) {
      setError(error?.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center gap-4 max-w-md w-full px-2">
        <h1 className="text-3xl text-dark-1 font-semibold">Login</h1>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form
          className="w-full flex flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              label="Username or Email"
              placeholder="Enter username or email"
              icon1={<UserIcon />}
              {...register("usernameOrEmail", { required: true })}
            />
          </div>
          <div>
            <Input
              label="Password"
              placeholder="Enter password"
              type={togglePassword ? "text" : "password"}
              icon1={<LockClosedIcon />}
              icon2={togglePassword ? <EyeSlashIcon /> : <EyeIcon />}
              onClick={handlePasswordToggle}
              {...register("password", { required: true })}
            />
          </div>
          <div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
