import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post(
      "/users/refresh-token",
      {},
      {
        withCredentials: true,
      }
    );

    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response?.data?.data.accessToken,
      };
    });

    return response?.data?.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
