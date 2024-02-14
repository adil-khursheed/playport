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
      console.log(JSON.stringify(prev));
      console.log(response?.data?.data.accessToken);
      return { ...prev, accessToken: response?.data?.data.accessToken };
    });

    return response?.data?.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
