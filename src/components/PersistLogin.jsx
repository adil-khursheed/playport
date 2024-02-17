import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { Loader } from "./index";

const PersistLogin = () => {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setLoading(false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${loading}`);
    console.log(`aT: ${auth?.accessToken}`);
  }, [loading]);

  return <>{loading ? <Loader /> : <Outlet />}</>;
};

export default PersistLogin;
