import {
  ArrowLeftIcon,
  ChartPieIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
  ArrowRightStartOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { ThemeState } from "../../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Loader, SearchForm } from "../index";
import { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useLogoutUser } from "../../features/authApi";

const Header = ({ currentUser }) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [smallDeviceSearchBar, setSmallDeviceSearchBar] = useState(false);
  const { handleThemeSwitch, theme } = ThemeState();
  const modalRef = useRef();
  const smallDeviceSearchBarRef = useRef();
  const smallDeviceSearchInputRef = useRef(null);

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

  const onSmallDeviceSearchBarClose = () => {
    setSmallDeviceSearchBar(false);
  };

  const onSearchFormSubmit = (e) => {
    e.preventDefault();
    navigate(`/search-result?query=${searchTerm}`);
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

  useEffect(() => {
    const handleClickOutsideSearchBar = (e) => {
      if (
        smallDeviceSearchBarRef.current &&
        !smallDeviceSearchBarRef.current.contains(e.target)
      ) {
        onSmallDeviceSearchBarClose();
      }
    };
    document.addEventListener("click", handleClickOutsideSearchBar);

    return () => {
      document.removeEventListener("click", handleClickOutsideSearchBar);
    };
  }, [onSmallDeviceSearchBarClose]);

  useEffect(() => {
    smallDeviceSearchInputRef.current?.focus();
  }, [smallDeviceSearchBar]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <header
          className={`sticky top-0 left-0 right-0 z-10 flex items-center justify-between py-2 px-3 sm:px-5 bg-light-1 dark:bg-dark-1 border border-t-0 dark:border-dark-2 border-light-2`}
          ref={smallDeviceSearchBarRef}>
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
          <div className="max-w-[500px] w-full hidden md:block">
            <SearchForm
              onSearchFormSubmit={onSearchFormSubmit}
              setSearchTerm={setSearchTerm}
            />
          </div>
          <div className="flex items-center gap-4">
            <div
              className="w-6 h-6 text-dark-1 md:hidden cursor-pointer"
              onClick={() => setSmallDeviceSearchBar(true)}>
              <MagnifyingGlassIcon
                className={`dark:text-light-1 text-dark-1`}
              />
            </div>
            <div className="w-6 h-6 cursor-pointer" onClick={handleThemeSwitch}>
              {theme === "dark" ? (
                <SunIcon className="text-light-1" />
              ) : (
                <MoonIcon className="text-dark-1" />
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
                <div className="profile__modal">
                  <div className="whitespace-nowrap mb-3">
                    <p className="font-semibold">
                      {currentUser?.username.length > 20
                        ? currentUser?.username.substring(0, 20).concat("...")
                        : currentUser?.username}
                    </p>
                    <p className="text-sm text-dark-2 dark:text-light-2">
                      {currentUser?.fullName.length > 20
                        ? currentUser?.fullName.substring(0, 20).concat("...")
                        : currentUser?.fullName}
                    </p>
                  </div>

                  <div>
                    <Link to={`/dashboard`} className="flex items-center gap-2">
                      <span>
                        <ChartPieIcon className="w-5 h-5 text-dark-1 dark:text-light-1" />
                      </span>
                      <span>Dashboard</span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={`/profile/${currentUser?.username}`}
                      className="flex items-center gap-2">
                      <span>
                        <UserIcon className="w-5 h-5 text-dark-1 dark:text-light-1" />
                      </span>
                      <span>Profile</span>
                    </Link>
                  </div>
                  <div>
                    <button
                      className="bg-transparent text-dark-1 dark:text-light-1 flex items-center gap-2"
                      onClick={handleLogout}>
                      <span>
                        <ArrowRightStartOnRectangleIcon className="w-5 h-5 text-dark-1 dark:text-light-1" />
                      </span>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {smallDeviceSearchBar && (
            <div className="absolute left-0 top-0 right-0 bottom-0 bg-light-1 dark:bg-dark-1 flex items-center md:hidden">
              <Button
                bgColor="bg-transparent"
                textColor="text-dark-1 dark:text-light-1"
                onClick={() => setSmallDeviceSearchBar(false)}>
                <ArrowLeftIcon className="w-5 h-5" />
              </Button>
              <div className="max-w-[500px] w-full mx-auto">
                <SearchForm
                  onSearchFormSubmit={onSearchFormSubmit}
                  setSearchTerm={setSearchTerm}
                  smallDeviceSearchInputRef={smallDeviceSearchInputRef}
                />
              </div>
            </div>
          )}
        </header>
      )}
    </>
  );
};

export default Header;
