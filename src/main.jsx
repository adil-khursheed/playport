import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ThemeProvider from "./context/ThemeContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import {
  Login,
  Profile,
  Home,
  Register,
  LikedVideos,
  VideoDetails,
  SearchResult,
} from "./pages";
import { PersistLogin, AuthLayout } from "./components";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <PersistLogin />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout>
            <App />
          </AuthLayout>
        ),
        children: [
          {
            path: "/",
            element: (
              <AuthLayout>
                <Home />
              </AuthLayout>
            ),
          },
          {
            path: "/liked-videos",
            element: (
              <AuthLayout>
                <LikedVideos />
              </AuthLayout>
            ),
          },
          {
            path: "/profile/:username",
            element: (
              <AuthLayout>
                <Profile />
              </AuthLayout>
            ),
          },
          {
            path: "/videos/:videoId",
            element: (
              <AuthLayout>
                <VideoDetails />
              </AuthLayout>
            ),
          },
          {
            path: "/search-result",
            element: (
              <AuthLayout>
                <SearchResult />
              </AuthLayout>
            ),
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
