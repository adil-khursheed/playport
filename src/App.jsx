import "./App.css";
import { Outlet } from "react-router-dom";
import { Bottombar, Header, Loader, Sidebar } from "./components";
import { useGetCurrentUser } from "./features/authApi";
import { ToastContainer } from "react-toastify";
import { ThemeState } from "./context/ThemeContext";

function App() {
  const { theme } = ThemeState();
  const { data: currentUser, isLoading } = useGetCurrentUser();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="max-w-screen-xl w-full mx-auto relative">
          <Header currentUser={currentUser.data} />
          <main className="flex small_device_main_height  md:main__section__height border-r border-r-light-2 dark:border-r-dark-2 w-full overflow-hidden">
            <Sidebar />
            <Outlet />
          </main>
          <div className="sticky bottom-0 left-0 right-0 z-10">
            <Bottombar />
          </div>
          <ToastContainer
            theme={`${theme === "dark" ? "dark" : "light"}`}
            autoClose={3000}
          />
        </div>
      )}
    </>
  );
}

export default App;
