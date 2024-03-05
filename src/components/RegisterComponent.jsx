import { useState } from "react";
import { useForm } from "react-hook-form";

import { Input, Button, Loader } from "./index";
import { Link, useNavigate } from "react-router-dom";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  IdentificationIcon,
  LockClosedIcon,
  UserIcon,
  PencilSquareIcon,
  CameraIcon,
} from "@heroicons/react/24/solid";
import useAuth from "../hooks/useAuth";
import { useRegisterUser } from "../features/authApi";

const RegisterComponent = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [avatarPrev, setAvatarPrev] = useState(null);
  const [coverImagePrev, setCoverImagePrev] = useState(null);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePasswordToggle = () => {
    setTogglePassword(!togglePassword);
  };

  const {
    mutateAsync: registerUser,
    isPending: isRegisteringUser,
    isError,
    error,
  } = useRegisterUser();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("avatar", data.avatar[0]);
    formData.append("coverImage", data.coverImage[0] || "");
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("fullName", data.fullName);
    formData.append("password", data.password);

    try {
      const response = await registerUser(formData);
      console.log(response);
      if (response?.data) {
        setAuth(response?.data);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isRegisteringUser ? (
        <Loader className="w-full h-full bg-dark-1 flex items-center justify-center" />
      ) : (
        <div className="flex items-center justify-center h-full px-3">
          <div className="flex flex-col items-center gap-3 max-w-md w-full px-6 py-3 bg-light-1 bg-opacity-50 backdrop-blur-[8px] border border-light-1 border-opacity-50 rounded-lg shadow-lg shadow-dark-1 my-3">
            <div className="w-full h-auto flex items-center justify-center">
              <img
                src="/assets/playport-dark-logo.svg"
                alt="Logo"
                className="w-28"
              />
            </div>
            <h1 className="text-xl text-dark-1 font-semibold text-center">
              Sign up for a new account
            </h1>

            {isError && (
              <p className="text-red-dark mt-8 text-center text-sm">
                {error?.message}
              </p>
            )}

            <form
              className="w-full flex flex-col gap-3"
              onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full h-32 relative border border-dark-1 rounded-lg p-[2px]">
                {coverImagePrev && (
                  <img
                    src={coverImagePrev}
                    alt="cover"
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
                <label
                  htmlFor="coverImage"
                  className="absolute bottom-2 right-2 text-xs bg-dark-1 text-light-1 p-2 rounded-md flex items-center gap-1 cursor-pointer">
                  <input
                    type="file"
                    id="coverImage"
                    className="hidden"
                    {...register("coverImage", {
                      onChange: (e) =>
                        setCoverImagePrev(
                          URL.createObjectURL(e.target.files[0])
                        ),
                    })}
                  />
                  <PencilSquareIcon className="w-3 h-3" />
                  <span>cover image</span>
                </label>
                <label
                  htmlFor="avatar"
                  className="w-24 h-24 absolute top-1/2 -translate-y-1/2 left-3 flex justify-center items-center border border-dark-1 rounded-full cursor-pointer p-[2px]">
                  {avatarPrev ? (
                    <img
                      src={avatarPrev}
                      alt="avatar"
                      className="rounded-full w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div>
                      <CameraIcon className="w-6 h-auto" />
                    </div>
                  )}
                  <input
                    type="file"
                    id="avatar"
                    className="hidden"
                    accept="image/png,image/jpg,image/jpeg"
                    {...register("avatar", {
                      required: true,
                      onChange: (e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setAvatarPrev(URL.createObjectURL(e.target.files[0]));
                        }
                      },
                    })}
                  />
                </label>
              </div>
              {errors.avatar && (
                <p className="text-red-dark text-xs -mt-2">
                  Avatar is required!
                </p>
              )}

              <div>
                <Input
                  label="Username"
                  placeholder="johndoe"
                  className="placeholder:text-light-2"
                  icon1={<UserIcon />}
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <p className="text-red-dark mt-1 text-xs">
                    Username is required!
                  </p>
                )}
              </div>
              <div>
                <Input
                  label="Email"
                  placeholder="john@example.com"
                  className="placeholder:text-light-2"
                  icon1={<EnvelopeIcon />}
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-dark mt-1 text-xs">
                    Email is required!
                  </p>
                )}
              </div>
              <div>
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  className="placeholder:text-light-2"
                  icon1={<IdentificationIcon />}
                  {...register("fullName", { required: true })}
                />
                {errors.fullName && (
                  <p className="text-red-dark mt-1 text-xs">
                    Name is required!
                  </p>
                )}
              </div>
              <div>
                <Input
                  label="Password"
                  placeholder="Enter password"
                  className="placeholder:text-light-2"
                  type={togglePassword ? "text" : "password"}
                  icon1={<LockClosedIcon />}
                  icon2={togglePassword ? <EyeSlashIcon /> : <EyeIcon />}
                  onClick={handlePasswordToggle}
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-red-dark mt-1 text-xs">
                    Password is required!
                  </p>
                )}
              </div>
              <div>
                <Button
                  bgColor="bg-dark-1"
                  textColor="text-light-1"
                  type="submit"
                  className="w-full">
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
      )}
    </>
  );
};

export default RegisterComponent;
