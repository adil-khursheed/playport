import { useState } from "react";
import { useForm } from "react-hook-form";

import { Input, Button } from "./index";
import { Link } from "react-router-dom";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  IdentificationIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

const RegisterComponent = () => {
  const [error, setError] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);

  const { register, handleSubmit } = useForm();

  const handlePasswordToggle = () => {
    setTogglePassword(!togglePassword);
  };

  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center gap-4 max-w-md w-full p-6 bg-light-1 bg-opacity-50 backdrop-blur-[8px] border border-light-1 border-opacity-50 rounded-lg shadow-lg shadow-dark-1">
        <div className="w-full h-auto flex items-center justify-center">
          <img
            src="/assets/youtube-dark-logo.svg"
            alt="Logo"
            className="w-28"
          />
        </div>
        <h1 className="text-xl text-dark-1 font-semibold text-center">
          Sign up for a new account
        </h1>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form
          className="w-full flex flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              label="Username"
              placeholder="Enter username"
              icon1={<UserIcon />}
              {...register("username", { required: true })}
            />
          </div>
          <div>
            <Input
              label="Email"
              placeholder="Enter your email address"
              icon1={<EnvelopeIcon />}
              {...register("email", { required: true })}
            />
          </div>
          <div>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              icon1={<IdentificationIcon />}
              {...register("fullName", { required: true })}
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
          <label
            htmlFor="avatar"
            className="w-full flex justify-center items-center border border-dark-1 dark:border-none rounded-lg px-3 py-2 cursor-pointer">
            Choose your Avatar
            <input
              type="file"
              id="avatar"
              className="hidden"
              {...register("avatar", { required: true })}
            />
          </label>
          <label
            htmlFor="coverImage"
            className="w-full flex justify-center items-center border border-dark-1 dark:border-none rounded-lg px-3 py-2 cursor-pointer">
            Choose your cover image
            <input
              type="file"
              id="coverImage"
              className="hidden"
              {...register("coverImage", { required: true })}
            />
          </label>
          <div>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </div>
        </form>
        <div className="w-full flex justify-center items-center text-xs">
          <p>
            Already have an account? Sign in{" "}
            <Link to={"/login"} className="underline">
              here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
