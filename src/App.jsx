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
          <header className="sticky top-0 left-0 right-0">
            <Header currentUser={currentUser.data} />
          </header>
          <main className="flex small_device_main_height  sm:main__section__height">
            <Sidebar />
            <section className="border-r border-r-light-2 dark:border-r-dark-2 w-full">
              <Outlet />
            </section>
          </main>
          <div className="sticky bottom-0 left-0 right-0">
            <Bottombar />
          </div>
          <ToastContainer theme={`${theme === "dark" ? "dark" : "light"}`} />
        </div>
      )}
    </>
  );
}

export default App;
