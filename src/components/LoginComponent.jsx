import { useEffect, useState } from "react";
import { Button, Input, Loader } from "./index";
import { useForm } from "react-hook-form";
import {
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { useLoginUser } from "../features/authApi";

const LoginComponent = () => {
  const [togglePassword, setTogglePassword] = useState(false);

  const { register, handleSubmit } = useForm();

  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handlePasswordToggle = () => {
    setTogglePassword(!togglePassword);
  };

  const {
    mutateAsync: loginUser,
    isPending: isLoading,
    isError,
    error,
  } = useLoginUser();

  const onSubmit = async (data) => {
    try {
      const nameIdentifier = data.usernameOrEmail.includes("@")
        ? "email"
        : "username";

      const requestData = {
        [nameIdentifier]: data.usernameOrEmail,
        password: data.password,
      };

      const response = await loginUser(requestData);

      if (response?.data) {
        const accessToken = response?.data.accessToken;

        setAuth({ ...response?.data.user, accessToken });
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <>
      {isLoading ? (
        <Loader className="w-full h-full bg-dark-1 flex items-center justify-center" />
      ) : (
        <div className="flex items-center justify-center h-full px-3">
          <div className="flex flex-col items-center gap-4 max-w-md w-full p-6 bg-light-1 bg-opacity-50 backdrop-blur-[8px] border border-light-1 border-opacity-50 rounded-lg shadow-lg shadow-dark-1">
            <div className="w-full h-auto flex items-center justify-center">
              <img
                src="/assets/youtube-dark-logo.svg"
                alt="Logo"
                className="w-28"
              />
            </div>
            <h1 className="text-xl text-dark-1 font-semibold text-center">
              Sign in to your account
            </h1>

            {isError && (
              <p className="text-red-600 mt-8 text-center">{error?.message}</p>
            )}

            <form
              className="w-full flex flex-col gap-3"
              onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Input
                  label="Username or Email"
                  placeholder="Enter username or email"
                  icon1={<UserIcon />}
                  {...register("usernameOrEmail", {
                    required: [true, "Username or email required!"],
                  })}
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
                  {...register("password", {
                    required: [true, "Password required!"],
                  })}
                />
              </div>
              <div className="flex items-center gap-3 text-dark-1 font-medium text-[15px]">
                <input
                  className="w-5 h-5 checked:text-dark-1 cursor-pointer"
                  type="checkbox"
                  id="persist"
                  onChange={togglePersist}
                  checked={persist}
                />
                <label htmlFor="persist" className="cursor-pointer">
                  Remember me
                </label>
              </div>
              <div>
                <Button
                  bgColor="bg-dark-1"
                  textColor="text-light-1"
                  type="submit"
                  className="w-full">
                  Login
                </Button>
              </div>
            </form>
            <div className="w-full flex flex-col-reverse gap-2 sm:flex-row justify-between items-center text-xs">
              <p>
                Don&apos;t have an account? Sign up{" "}
                <Link to={"/register"} className="underline">
                  here
                </Link>
              </p>
              <Link to={"/forgot-password"} className="underline">
                Forgot Password
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginComponent;
