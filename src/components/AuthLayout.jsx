import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthLayout = ({ children }) => {
  const { auth } = useAuth();
  const location = useLocation();
  return !auth?.accessToken ? (
    <Navigate to={"/login"} state={{ from: location }} replace />
  ) : (
    <>{children}</>
  );
};

export default AuthLayout;
