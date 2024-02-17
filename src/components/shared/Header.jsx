import {
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { ThemeState } from "../../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Loader } from "../index";
import { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useLogoutUser } from "../../features/authApi";

const Header = ({ currentUser }) => {
  const [toggleModal, setToggleModal] = useState(false);
  const modalRef = useRef();
  const { handleThemeSwitch, theme } = ThemeState();

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const { mutateAsync: logoutUser, isPending: isLoading } = useLogoutUser();

  const handleLogout = async () => {
    const response = await logoutUser();

    if (response) {
      setAuth({});
      navigate("/login");
    }
  };

  const onClose = () => {
    setToggleModal(false);
  };

  useEffect(() => {
    const handleClickOutsideModal = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("click", handleClickOutsideModal);

    return () => {
      document.removeEventListener("click", handleClickOutsideModal);
    };
  }, [onClose]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`flex items-center justify-between py-2 px-3 sm:px-5 bg-light-1 dark:bg-dark-1 border border-t-0  ${
            theme === "dark" ? "border-dark-2" : "border-light-2"
          }`}>
          <div>
            <Link to={"/"}>
              <img
                src={
                  theme === "dark"
                    ? "/assets/youtube-light-logo.svg"
                    : "/assets/youtube-dark-logo.svg"
                }
                alt="Logo"
                className="sm:w-28 h-auto"
              />
            </Link>
          </div>
          <form
            className={`max-w-[430px] w-full hidden md:flex md:items-center ${
              theme === "dark" ? "bg-dark-2" : "bg-transparent"
            } rounded-full border border-light-2 dark:border-none px-4 py-[6px]`}>
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent outline-none dark:text-light-1"
            />
            <div>
              <MagnifyingGlassIcon
                className={`w-6 h-6 ${
                  theme === "dark" ? "text-light-1" : "text-dark-1"
                }`}
              />
            </div>
          </form>
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 text-dark-1 md:hidden cursor-pointer">
              <MagnifyingGlassIcon
                className={`${
                  theme === "dark" ? "text-light-1" : "text-dark-1"
                }`}
              />
            </div>
            <div className="w-6 h-6 cursor-pointer" onClick={handleThemeSwitch}>
              {theme === "dark" ? (
                <SunIcon className="text-light-1" />
              ) : (
                <MoonIcon />
              )}
            </div>
            <div
              className="w-10 h-10 rounded-full cursor-pointer relative"
              onClick={() => setToggleModal(!toggleModal)}
              ref={modalRef}>
              <img
                src={currentUser?.avatar?.url}
                alt={currentUser?.fullName}
                className="w-full h-full object-cover object-top rounded-full"
              />
              {toggleModal && (
                <div className="absolute right-0 -bottom-32 bg-light-2 dark:bg-dark-2 flex items-center flex-col justify-center gap-3 px-3 py-6 rounded-md text-dark-1 dark:text-light-1">
                  <div>
                    <Link to={`/profile/${currentUser?.username}`}>
                      Profile
                    </Link>
                  </div>
                  <div>
                    <Button
                      bgColor="bg-transparent"
                      textColor="text-dark-1"
                      className="dark:text-light-1"
                      onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
